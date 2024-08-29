'use client';

import React, { useState } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';

const PasswordResetPage = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const token = searchParams.get('token');
      const countryCode = pathname.split('/')[1]; // Extracts the countryCode from the pathname

      const response = await fetch(`/api/${countryCode}/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        setError('Failed to reset the password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-gray">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-4 text-pastel-pink">Reset Password</h2>
        {success ? (
          <p className="text-green-500">Your password has been reset successfully.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-pastel-pink mb-2" htmlFor="password">
                New Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border border-pastel-pink rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-pastel-pink mb-2" htmlFor="confirmPassword">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full p-2 border border-pastel-pink rounded"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-black text-pastel-pink border border-pastel-pink rounded hover:bg-pink-600"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PasswordResetPage;
