
import { EmailApi } from '@/utils/api/email/email.api';
import { getTokenCookie } from '@/utils/cookieUtils';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';

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

        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="h-dvh flex items-center justify-center bg-primary-500 py-12 px-4 sm:px-6 lg:px-8 font-poppins">
            <div className="w-[600px] h-64 space-y-6 bg-white p-6 rounded-2xl">
                <div>
                    <h2 className="mt-4 text-center text-3xl font-bold text-primary-600">Verify Your Account</h2>
                </div>
                <form className="space-y-3" >
                    <div className='flex flex-col items-start'>
                        <label className="sr-only">Verification Code</label>
                        <div className='text-xs mb-1 text-primary-500 ml-2' >Check your email for a verification code. Enter the code below. </div>
                        <div className='rounded-md shadow-sm w-full'>
                            <input
                                type="text"
                                required
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md sm:text-sm"
                                placeholder="Verification Code"
                            />
                        </div>
                        <button className="text-sm text-primary-500 hover:text-primary-700 self-start ml-2">Resend Code</button>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className=" relative w-full flex justify-center py-2 px-4 text-lg font-medium rounded-md text-white bg-primary-500 hover:bg-primary-700 "
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
