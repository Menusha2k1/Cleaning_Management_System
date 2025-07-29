import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate, Navigate } from 'react-router-dom';


const register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [compassword, setComPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate()


    const handleLogin = async (e) => {
        e.preventDefault();

        if (!(username)) {
            setError("Please enter a valid Username")
            return;
        }
        if (!password) {
            toast.error("Please enter password")
            return;
        }
        setError("");
        if (password != compassword) {
            setError("Password Not Match")
        } else {
            try {
                const response = await axios.post("http://localhost:8000/register", {
                    username: username,
                    password: password,
                });
                if (response.data && response.data.accessToken) {
                    localStorage.setItem('token', response.data.accessToken);
                    navigate('/');



                }
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    setError(error.response.data.message);
                } else {
                    setError("")
                }
            }
        }

    };

    return (
        <div className='flex items-center justify-center w-full mt-40 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]'>

            <div className="w-100 rounded-3xl bg-white p-10 z-1" >
                <form onSubmit={handleLogin}>
                    <h4 className="text-4xl mb-4 py-5 font-semibold ">Register</h4>

                    <input
                        type="text"
                        placeholder="Username"
                        className="py-3 w-full text-xl p-3 border-1 rounded-2xl border-gray-400 mb-5"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}

                    />
                    <input
                        type="password"
                        placeholder=" Password"
                        className="py-3 w-full text-xl p-3 border-1 rounded-2xl border-gray-400 mb-5"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="py-3 w-full text-xl p-3 border-1 rounded-2xl border-gray-400 mb-5"
                        value={compassword}
                        onChange={(e) => setComPassword(e.target.value)}

                    />



                    {error && <p className='text-red-500 text-xl font-semibold pb-1'>{error}</p>}
                    <button type='submit' className='bg-green-700 text-white p-3 text-xl w-full rounded-2xl'>Register</button>

                    <p className='text-sm text-center mt-4'>Have an account?{''}
                        <Link to="/" className='font-medium text-blue text-primary underline text-green-600'> Login </Link>

                    </p>
                </form>
            </div>
        </div>
    )
}

export default register
