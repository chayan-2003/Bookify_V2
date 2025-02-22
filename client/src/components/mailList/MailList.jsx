import React from 'react';

const MailList = () => {
    return (
        <div className="w-screen absolute -left-2 mr-60  bg-gradient-to-r from-blue-700 via-purple-700 to-blue-900 py-8 rounded-lg shadow-lg">
            <h1 className="mailTitle text-center text-3xl font-bold text-white">Save Time, Save Money!</h1>
            <span className="mailDesc block text-center text-white mt-2">
                Sign up and we’ll send the best deals to you.
            </span>
            <div className="mailInputContainer flex justify-center items-center mt-4 px-4 sm:px-6 md:px-8">
                <input 
                    type="email" 
                    placeholder="Your email" 
                    className="p-3 rounded-l-md w-full sm:w-2/3 outline-none"
                />
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-r-md transition duration-300">
                    Subscribe
                </button>
            </div>
        </div>
    );
};

export default MailList;