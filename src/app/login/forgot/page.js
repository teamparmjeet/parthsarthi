'use client';

import React, { useState } from 'react';
import axios from 'axios';

export default function Forgot() {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const res = await axios.post('/api/auth/forgot-password', { email });
            setMessage('A password reset link has been sent to your email.');
        } catch (error) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='bg-slate-100 flex justify-center items-center py-10'>
            <div className='bg-white p-8 min-w-max rounded-lg shadow-lg'>
                <h2 className='text-2xl font-bold text-center mb-6'>Forgot Password</h2>
                {error && <div className='text-red-500 text-center mb-4'>{error}</div>}
                {message && <div className='text-green-500 text-center mb-4'>{message}</div>}
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div className='w-full'>
                        <label htmlFor='email' className='block text-lg font-medium text-gray-700 mb-2'>Email</label>
                        <input
                            type='email'
                            id='email'
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg'
                            placeholder='Enter your email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <button
                        type='submit'
                        className={`w-full py-2 px-4 bg-[#2d2849] text-white rounded-lg ${loading ? 'cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>
            </div>
        </div>
    );
}
