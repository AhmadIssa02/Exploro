
import React from 'react';
import Image from 'next/image';
import axios from 'axios';
import Router from 'next/router';

const ForgetPassword: React.FC = () => {

    const [showPassword, setShowPassword] = React.useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(true);

    const [password, setPassword] = React.useState<string>('');
    const [confirmPassword, setConfirmPassword] = React.useState<string>('');


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const email = localStorage.getItem('email');
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.])[A-Za-z\d!@#$%^&*.]{8,}$/;

        // Check if password meets complexity requirements
        if (!passwordRegex.test(password)) {
            alert('Password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character.');
            return;
        }
        if (password !== confirmPassword) {
            alert('Password and Confirm Password do not match');
            return;
        }
        try {
            const response = await axios.post(`http://localhost:3000/auth/reset-password`, { email: email, password: password });
            if (response) {
                const successAlert = document.createElement('div');
                successAlert.classList.add('bg-green-500', 'w-1/2', 'text-white', 'px-4', 'py-2', 'rounded-md', 'font-semibold', 'absolute', 'top-20', 'left-1/2', 'transform', '-translate-x-1/2', 'z-50');
                successAlert.textContent = 'Password successfully reset! Redirecting to login page...';
                document.body.appendChild(successAlert);

                setTimeout(() => {
                    successAlert.remove();
                    Router.push('/auth/login');
                }, 2000);
                console.log(response);
            }
        } catch (error: any) {
            if (error) {
                const errorAlert = document.createElement('div');
                errorAlert.classList.add('bg-red-500', 'w-1/2', 'text-white', 'px-4', 'py-2', 'rounded-md', 'font-semibold', 'absolute', 'top-20', 'left-1/2', 'transform', '-translate-x-1/2', 'z-50');
                errorAlert.textContent = 'Please provide a valid email and password.';
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
            <div className="w-[600px] h-84 space-y-8 bg-white p-8 rounded-2xl">
                <div>
                    <h2 className="mt-4 text-center text-3xl font-bold text-primary-600">Forget Password</h2>
                </div>
                <form className="mt-8 space-y-3" >
                    <div className="rounded-md shadow-sm ">
                        <div className='flex items-center relative'>
                            <label className="sr-only">Password</label>
                            <input
                                type={showPassword ? "Password" : "text"}
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md  sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="h-1/2 opacity-50 text-white poppins-semibold text-[10px] hover:underline absolute right-2 z-10 "
                            >
                                {showPassword ? (<Image src="/images/hide.png" alt="eye icon" width={20} height={20} />) : (<Image src="/images/show.png" alt="eye icon" width={20} height={20} />)}
                            </button>
                        </div>
                    </div>
                    <div className="rounded-md  shadow-sm -space-y-px">
                        <div>
                            <div className='flex items-center relative'>

                                <label className="sr-only">Password</label>
                                <input
                                    type={showConfirmPassword ? "Password" : "text"}
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md sm:text-sm"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="h-1/2 opacity-50 text-white poppins-semibold text-[10px] hover:underline absolute right-2 z-10 "
                                >
                                    {showConfirmPassword ? (<Image src="/images/hide.png" alt="eye icon" width={20} height={20} />) : (<Image src="/images/show.png" alt="eye icon" width={20} height={20} />)}
                                </button>
                            </div>
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
