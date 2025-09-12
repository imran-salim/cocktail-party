'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-1 rounded-full glass mb-6">
            <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-white text-2xl font-bold">
              🍸
            </div>
          </div>
          <div className="glass rounded-full p-6 mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-3 border-amber-500 border-t-transparent mx-auto"></div>
          </div>
          <p className="text-foreground/70 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Show nothing while redirecting to login
  if (!user) {
    return null;
  }

  // Render protected content
  return <>{children}</>;
}