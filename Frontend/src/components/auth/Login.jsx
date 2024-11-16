import React, { useEffect, useState } from "react";
import Input from '../shared/Input';
import { Link, useNavigate } from 'react-router-dom';
// import { clearAllUserErrors, login } from '../store/userSlice';
import axios from 'axios';
import { toast } from 'react-hot-toast';
// import { useDispatch, useSelector } from 'react-redux';


function Login() {
    const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

//   const { loading, isAuthenticated, error } = useSelector(
//     (state) => state.user
//   );
 
//   const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5001/api/v1/user/login', { email, password, role });
        toast.success(response.data.message);
        navigate('/'); // Redirect to home page upon successful login

        localStorage.setItem("TOKEN", response.data.token);
        localStorage.setItem("EMAIL", email);
        localStorage.setItem("ROLE", role)
    
        console.log(email)
        console.log(response.data.token)
        console.log(role)
    } catch (error) {
        toast.error(error.response.data.message || 'Login failed');
    }
  };


//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearAllUserErrors());
//     }
//     if (isAuthenticated) {
//       navigateTo("/update-profile");
//     }
//   }, [dispatch, error, loading, isAuthenticated]);

    return (
        <div>
            <div className='flex items-center justify-center max-w-7xl mx-auto mt-10'>
                <form onSubmit={submitHandler} action="" className=' w-full mx-6 size_2:w-1/3 border border-gray-400 shadow-xl rounded-md p-4 my-10'>
                    {/* CareerXperts title */}
                    <div className='text-center mb-12'>
                        <h1 className='text-3xl font-bold'>
                            <span className='text-black'>Career</span>
                            <span className='text-blue-600'>Xperts</span>
                        </h1>
                    </div>

                    <h1 className='font-bold text-xl mb-5 text-blue-600 text-center'>Login to your Account</h1>

                    <div className='my-4'>
                        <Input lablename="Email"
                            type="email"
                            value={email}
                            name="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className='my-4'>
                        <Input lablename="Password"
                            type="password"
                            value={password}
                            name="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className='my-4 mx-1'>
                        <span><Link to="/forgotpassword" className='text-blue-600'>Forgot Password?</Link></span>
                    </div>

                    {/* Radio buttons for account type selection */}
                    <div className="mb-4">
                        <h2 className="text-gray-700 font-bold mb-2 text-center">Select Account Type</h2>
                        <div className="flex flex-row justify-center space-x-4">
                            <label className="flex items-center cursor-pointer text-sm text-gray-700 font-bold">
                                <input
                                    type="radio"
                                    name="role"
                                    value="Job Seeker"
                                    checked={role === 'Job Seeker'}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="mr-2 cursor-pointer"
                                />
                                Job Seeker
                            </label>
                            <label className="flex items-center cursor-pointer text-sm text-gray-700 font-bold">
                                <input
                                     type="radio"
                                     name="role"
                                     value="Recruiter"
                                     checked={role === 'Recruiter'}
                                     onChange={(e) => setRole(e.target.value)}
                                     className="mr-2 cursor-pointer"
                                />
                                Recruiter
                            </label>
                        </div>
                    </div>

                    <div className='my-4'>
                        <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700  hover:bg-gradient-to-br font-medium rounded-full text-sm px-5 py-2.5 text-center mb-4 w-full">
                            Sign in
                        </button>
                    </div>

                    <div className="text-center">
                        <span>Don't have an account? <Link to="/signup" className='text-blue-600'>Create one</Link></span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;