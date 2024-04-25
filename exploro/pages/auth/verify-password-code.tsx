import { getTokenCookie } from '@/utils/cookieUtils';
import React, { useState } from 'react';
import axios from 'axios';
import Router from 'next/router';

const VerifyPasswordCodePage: React.FC = () => {
    const [verificationCode, setVerificationCode] = useState<string>('');


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const email = localStorage.getItem('email');
        try {
            const response = await axios.post(`http://localhost:3000/auth/verify-password-token`, { email: email, passwordToken: verificationCode });
            if (response) {
                const successAlert = document.createElement('div');
                successAlert.classList.add('bg-green-500', 'w-1/2', 'text-white', 'px-4', 'py-2', 'rounded-md', 'font-semibold', 'absolute', 'top-20', 'left-1/2', 'transform', '-translate-x-1/2', 'z-50');
                successAlert.textContent = 'Redirecting to reset password page!';
                document.body.appendChild(successAlert);

                setTimeout(() => {
                    successAlert.remove();
                    Router.push('/auth/reset-password');
                }, 2000);
                console.log(response);
            }
        } catch (error: any) {
            if (error) {
                const errorAlert = document.createElement('div');
                errorAlert.classList.add('bg-red-500', 'w-1/2', 'text-white', 'px-4', 'py-2', 'rounded-md', 'font-semibold', 'absolute', 'top-20', 'left-1/2', 'transform', '-translate-x-1/2', 'z-50');
                errorAlert.textContent = 'Please provide a valid email and the corresponding code sent to it.';
                document.body.appendChild(errorAlert);
                setTimeout(() => {
                    errorAlert.remove();
                }, 3000);
                console.error('Error occurred:', error);
            }
        }
    };

    return (
        <div className="h-dvh flex items-center justify-center bg-primary-500 py-12 px-4 sm:px-6 lg:px-8 font-poppins">
            <div className="w-[600px] h-72 space-y-6 bg-white p-6 rounded-2xl relative">
                <h2 className="mt-4 text-center text-3xl font-bold text-primary-600">Verify Password Code </h2>
                <form className="space-y-3" onSubmit={handleSubmit}>
                    <div className="flex flex-col items-start">
                    </div>

                    <div className="flex flex-col items-start">
                        <label className="sr-only">Password Verification Code</label>
                        <div className="text-xs mb-1 text-primary-500 ml-2">Enter the code sent to your email.</div>
                        <input
                            type="text"
                            required
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md sm:text-sm"
                            placeholder="Password Verification Code"
                        />
                        <button className="text-sm text-primary-500 hover:text-primary-700 self-start ml-2">Resend Code</button>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="relative mt-6 w-full flex justify-center py-2 px-4 text-lg font-medium rounded-md text-white bg-primary-500 hover:bg-primary-700"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div >
        </div >

    );
};

export default VerifyPasswordCodePage;
