
import { EmailApi } from '@/utils/api/email/email.api';
import { getTokenCookie } from '@/utils/cookieUtils';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Router from 'next/router';

const VerifyEmailPage: React.FC = () => {
    const [verificationCode, setVerificationCode] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const token = getTokenCookie();
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            if (!token) {
                console.error('Token not found.');
                return;
            }
            const response = await axios.post(`http://localhost:3000/auth/verify-email/`, { token: token, verifyEmailToken: verificationCode }, config);

            console.log(response);
            if (response) {
                // Custom styled alert for success
                const successAlert = document.createElement('div');
                successAlert.classList.add('bg-green-500', 'w-1/2', 'text-white', 'px-4', 'py-2', 'rounded-md', 'font-semibold', 'absolute', 'top-20', 'left-1/2', 'transform', '-translate-x-1/2', 'z-50');
                successAlert.textContent = 'Email successfully verified! Redirecting to login page...';
                document.body.appendChild(successAlert);

                setTimeout(() => {
                    successAlert.remove();
                    Router.push('/auth/login');
                }, 4000);
            }
        } catch (error: any) {
            if (error) {
                // Custom styled alert for 401 error
                const errorAlert = document.createElement('div');
                errorAlert.classList.add('bg-red-500', 'w-1/2', 'text-white', 'px-4', 'py-2', 'rounded-md', 'font-semibold', 'absolute', 'top-20', 'left-1/2', 'transform', '-translate-x-1/2', 'z-50');
                errorAlert.textContent = 'Unauthorized access! Please check your verification code.';
                document.body.appendChild(errorAlert);
                setTimeout(() => {
                    errorAlert.remove();
                }, 3000);
            } else {
                console.error('Error occurred:', error);
            }
        }
    };

    const handleResendCode = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const token = getTokenCookie();
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            if (!token) {
                console.error('Token not found.');
                return;
            }
            console.log('Resending verification code...');
            const decoded = jwt.decode(token) as { id: string };
            const userId = decoded.id;
            console.log("userId " + userId);
            const response = await axios.post(`http://localhost:3000/auth/resend-verification-code/`, { userId: userId }, config);
            console.log(response);
        }
        catch (error: any) {
            if (error) {
                console.error('Error occurred:', error);
            }
        }
    }


    return (
        <div className="h-dvh flex items-center justify-center bg-primary-500 py-12 px-4 sm:px-6 lg:px-8 font-poppins">
            <div className="w-[600px] h-64 space-y-6 bg-white p-6 rounded-2xl relative">
                <h2 className="mt-4 text-center text-3xl font-bold text-primary-600">Verify Your Account</h2>
                <form className="space-y-3">
                    <div className="flex flex-col items-start">
                        <label className="sr-only">Verification Code</label>
                        <div className="text-xs mb-1 text-primary-500 ml-2">Check your email for a verification code. Enter the code below.</div>
                        <div className="rounded-md shadow-sm w-full">
                            <input
                                type="text"
                                required
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md sm:text-sm"
                                placeholder="Verification Code"
                            />
                        </div>
                        <button className="text-sm text-primary-500 hover:text-primary-700 self-start ml-2" onClick={handleResendCode}>Resend Code</button>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="relative w-full flex justify-center py-2 px-4 text-lg font-medium rounded-md text-white bg-primary-500 hover:bg-primary-700"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default VerifyEmailPage;
