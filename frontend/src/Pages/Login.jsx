import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { MdOutlineError } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate()


    const handleLogin = async (e) => {
        e.preventDefault();

        if (!(username)) {
            setError("Please enter a valid email")
            return;
        }
        if (!password) {
            setError("Please enter password")
            return;
        }
        setError("");
        try {
            const response = await axios.post("http://localhost:8000/login", {
                username: username,
                password: password,
            });
            if (response.data && response.data.accessToken) {
                const { accessToken, user } = response.data;

                // Save user details in localStorage
                localStorage.setItem('token', accessToken);
                localStorage.setItem('username', user.username);
                localStorage.setItem('id', user.id);

                navigate('/home');



            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("error")
            }
        }

    };

    return (
        <div className='flex items-center justify-center w-full mt-40 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]'>

            <div className="w-100 rounded-3xl bg-white p-10 z-1" >
                <form onSubmit={handleLogin}>
                    <h4 className="text-4xl mb-4 font-semibold py-5 ">Login</h4>

                    <input
                        type="text"
                        placeholder="Username"
                        className="py-3 w-full text-xl p-3 border-1 rounded-2xl border-gray-400 mb-5"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}

                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="py-3  w-full text-xl p-3 border-1 rounded-2xl border-gray-400 mb-5"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                    />


                    {error && <p className='text-red-500 text-xl font-semibold pb-1 flex'>
                        <MdOutlineError
                            className='mt-1 mr-1'
                        />{error}
                    </p>}
                    <button type='submit' className='bg-green-700 text-white p-3 text-xl w-full rounded-2xl'>Login</button>

                    <p className='text-sm text-center mt-4'>Not registered yet?{''}
                        <Link to="/register" className='font-medium text-blue text-primary underline text-green-600'> Register </Link>

                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login
