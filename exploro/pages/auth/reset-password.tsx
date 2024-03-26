
import React from 'react';
import Image from 'next/image';

const ForgetPassword: React.FC = () => {

    const [showPassword, setShowPassword] = React.useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(true);

    return (
        <div className="h-dvh flex items-center justify-center bg-primary-500 py-12 px-4 sm:px-6 lg:px-8 font-poppins">
            <div className="w-[600px] h-84 space-y-8 bg-white p-8 rounded-2xl">
                <div>
                    <h2 className="mt-4 text-center text-3xl font-bold text-primary-600">Forget Password</h2>
                </div>
                <form className="mt-8 space-y-6" >
                    <input type="hidden" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className='flex items-center relative'>
                            <label className="sr-only">Password</label>
                            <input
                                type={showPassword ? "Password" : "text"}
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md  sm:text-sm"
                                placeholder="Password"
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
