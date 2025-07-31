import React from 'react'
import pic from '../assets/pic1.png'

const Home = () => {
    return (
        <div className=''>
            <div className=" bg-green-500 h-100 max-w-full justify-items-center" >

                <img
                    className='mt-15'
                    src={pic} alt=""
                    width={800}
                />


            </div>
            <div className=" bg-green-500 h-50 max-w-full rounded-b-full " > </div>

                <div class="triangle"></div>

            <div className='mt-20'>
                Home
            </div>

        </div>
    )
}

export default Home
