'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { register, isLoading } = useAuth();
  const router = useRouter();

  const validateForm = () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    const success = await register(name, email, password);
    
    if (success) {
      router.push('/');
    } else {
      setError('An account with this email already exists');
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a574' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-1 rounded-full glass mb-6">
            <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-white text-2xl font-bold">
              🍸
            </div>
          </div>
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
            Join the Party
          </h1>
          <p className="text-foreground/70">
            Create your account to start exploring cocktails
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
              <div className="flex items-center">
                <div className="text-red-500 text-xl mr-3">⚠️</div>
                <p className="text-red-700 dark:text-red-400 font-medium">{error}</p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-foreground font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 glass rounded-xl text-foreground 
                          focus:outline-none focus:ring-2 focus:ring-amber-500 
                          transition-all duration-300 placeholder-foreground/50"
                placeholder="Enter your full name"
                disabled={isLoading}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-foreground font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 glass rounded-xl text-foreground 
                          focus:outline-none focus:ring-2 focus:ring-amber-500 
                          transition-all duration-300 placeholder-foreground/50"
                placeholder="Enter your email"
                disabled={isLoading}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-foreground font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 glass rounded-xl text-foreground 
                            focus:outline-none focus:ring-2 focus:ring-amber-500 
                            transition-all duration-300 placeholder-foreground/50"
                  placeholder="Create a password"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 
                            text-foreground/50 hover:text-foreground transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-foreground font-medium mb-2">
                Confirm Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 glass rounded-xl text-foreground 
                          focus:outline-none focus:ring-2 focus:ring-amber-500 
                          transition-all duration-300 placeholder-foreground/50"
                placeholder="Confirm your password"
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white 
                      font-medium py-3 px-6 rounded-xl hover:from-amber-600 hover:to-amber-700 
                      transition-all duration-300 shadow-lg hover:shadow-xl
                      disabled:opacity-50 disabled:cursor-not-allowed
                      transform hover:scale-105 active:scale-95"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                Creating Account...
              </div>
            ) : (
              'Create Account'
            )}
          </button>

          <div className="text-center pt-4">
            <p className="text-foreground/70">
              Already have an account?{' '}
              <Link 
                href="/login" 
                className="text-amber-600 hover:text-amber-700 font-medium 
                          hover:underline transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </form>

        {/* Password Requirements */}
        <div className="mt-6 glass rounded-xl p-4">
          <p className="text-sm text-foreground/60 mb-2">Password requirements:</p>
          <ul className="text-xs text-foreground/50 space-y-1">
            <li>• At least 6 characters long</li>
            <li>• Must match confirmation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}