'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white p-6 rounded shadow"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center text-[#424242]">Login</h2>

        {error && (
          <div className="mb-4 text-red-600 text-sm bg-red-100 p-2 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6 relative">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-[38px] text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-[#424242] text-white py-2 px-4 rounded transition"
        >
          Login
        </button>

        <div className="mt-4 text-center">
          <span className="text-sm">Belum punya akun?</span>{' '}
          <a
            href="/register"
            className="text-[#424242] font-medium hover:underline inline-flex items-center"
          >
            Register
          </a>
        </div>
      </form>
    </div>
  );
}
