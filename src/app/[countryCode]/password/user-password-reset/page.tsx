'use client';

import React, { useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Head from 'next/head';
import Footer from "@modules/layout/templates/footer";

const UserPasswordResetPage = () => {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const encodedToken = searchParams.get('token');
    if (!encodedToken) {
      setError('Invalid or missing token.');
      return;
    }

    // Decode the Base64 encoded token
    const token = Buffer.from(decodeURIComponent(encodedToken), 'base64').toString('ascii');
    if (!token) {
      setError('Invalid or missing token.');
      return;
    }

    if (!email) {
      setError('Email is required.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BASE_URL;
      if (!backendUrl) {
        throw new Error('Backend URL is not defined');
      }

      const response = await fetch(`${backendUrl}/admin/users/reset-password`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, token }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setError(`Error: ${response.status} ${errorText}`);
        return;
      }

      setSuccess(true);
      setError('');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [email, password, confirmPassword, searchParams]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-gray">
      <Head>
        <title>Reset Admin Password - DeLisa&apos;s Boujee Botanicals</title>
        <meta
          name="description"
          content="Reset the password for your DeLisa's Boujee Botanicals Admin account. Enter your email and new password to regain access."
        />
      </Head>

      <header className="bg-darker-slate-gray text-pastel-pink py-4 px-6 shadow-md">
        <div className="flex justify-between items-center">
          <a href="/admin/login" className="bg-black text-pastel-pink px-4 py-2 rounded hover:bg-pink-600">
            Back
          </a>
          <h1 className="text-2xl font-bold text-center flex-grow">
            DeLisa&apos;s Boujee Botanical Admin
          </h1>
          <div className="w-16"></div>
        </div>
      </header>

      <div className="flex items-center justify-center flex-grow">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-3xl font-bold mb-4 text-pastel-pink">Reset Admin Password</h2>
          {success ? (
            <p className="text-pastel-pink" aria-live="polite">
              Your password has been reset successfully. You can now <a href="/admin/login" className="text-pastel-pink underline hover:text-primary-green">log in</a>.
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-pastel-pink mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 border border-pastel-pink rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
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
              {error && (
                <p className="text-red-500 mb-4" aria-live="assertive">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-black text-pastel-pink border border-pastel-pink rounded hover:bg-pink-600"
                disabled={loading}
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserPasswordResetPage;
