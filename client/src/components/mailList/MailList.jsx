import React from 'react';

const MailList = () => {
    return (
        <div className="w-full bg-gradient-to-r from-blue-700 via-purple-700 to-blue-900 py-8 px-4 sm:px-6 md:px-10 rounded-lg shadow-lg">
            <h1 className="text-center text-2xl sm:text-3xl font-bold text-white">Save Time, Save Money!</h1>
            <span className="block text-center text-white mt-2 text-sm sm:text-base">
                Sign up and we’ll send the best deals to you.
            </span>
            <div className="flex flex-col sm:flex-row justify-center items-center mt-4 gap-2 sm:gap-0 max-w-3xl mx-auto">
                <input 
                    type="email" 
                    placeholder="Your email" 
                    className="p-3 rounded-md sm:rounded-l-md sm:rounded-r-none w-full sm:w-2/3 outline-none"
                />
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-md sm:rounded-l-none sm:rounded-r-md transition duration-300 w-full sm:w-auto">
                    Subscribe
                </button>
            </div>
        </div>
    );
};

export default MailList;
