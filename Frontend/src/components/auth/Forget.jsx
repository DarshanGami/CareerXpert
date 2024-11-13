import React, { useState } from 'react';
import Input from '../shared/Input';

const Forget = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate sending a reset password email (you can replace it with your actual API call)
        setTimeout(() => {
            setLoading(false);
            setMessage('A password reset link has been sent to your email!');
        }, 2000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full mx-4 max-w-md bg-white p-8 rounded-lg border border-gray-400">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Forgot Password</h2>

                {/* Form */}
                <form   onSubmit={handleSubmit}>
                    <div className="mb-4">
                    <Input name="Email" type="email" className="w-3/4 mx-auto" />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full bg-gradient-to-r  from-blue-500 via-blue-600 to-blue-700  text-white font-medium rounded-full px-5 py-2.5 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>

                {/* Message */}
                {message && (
                    <div className="mt-4 text-center text-green-600">
                        <p>{message}</p>
                    </div>
                )}

                <div className="mt-4 text-center">
                    <span>
                        Remembered your password? <a href="/login" className="text-blue-600">Login here</a>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Forget;
