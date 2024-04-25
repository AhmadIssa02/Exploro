
import axios from 'axios';
import Router from 'next/router';
import React from 'react';

const ForgetPassword: React.FC = () => {
    const [email, setEmail] = React.useState<string>('');
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            localStorage.setItem('email', email);
            const variable = localStorage.getItem('email');
            console.log("variable:", variable)
            const response = await axios.post(`http://localhost:3000/auth/forgot-password`, { email: email });

            if (response) {

                const successAlert = document.createElement('div');
                successAlert.classList.add('bg-green-500', 'w-1/2', 'text-white', 'px-4', 'py-2', 'rounded-md', 'font-semibold', 'absolute', 'top-20', 'left-1/2', 'transform', '-translate-x-1/2', 'z-50');
                successAlert.textContent = 'Password reset link sent to your email! ';
                document.body.appendChild(successAlert);

                setTimeout(() => {
                    successAlert.remove();
                    Router.push('/auth/verify-password-code');
                }, 2000);
                console.log(response);
            }
        } catch (error: any) {
            if (error) {
                const errorAlert = document.createElement('div');
                errorAlert.classList.add('bg-red-500', 'w-1/2', 'text-white', 'px-4', 'py-2', 'rounded-md', 'font-semibold', 'absolute', 'top-20', 'left-1/2', 'transform', '-translate-x-1/2', 'z-50');
                errorAlert.textContent = 'Please provide a valid email.';
                document.body.appendChild(errorAlert);
                setTimeout(() => {
                    errorAlert.remove();
                }, 3000);
                console.error('Error occurred:', error);
            }
        }
    }

    return (
        <div className="h-dvh flex items-center justify-center bg-primary-500 py-12 px-4 sm:px-6 lg:px-8 font-poppins">
            <div className="w-[600px] h-64 space-y-8 bg-white p-8 rounded-2xl">
                <div>
                    <h2 className="mt-4 text-center text-3xl font-bold text-primary-600">Forget Password</h2>
                </div>
                <form className="mt-8 space-y-6" >
                    <input type="hidden" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label className="sr-only">Email</label>
                            <input
                                type="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md sm:text-sm"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
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

export default ForgetPassword;
