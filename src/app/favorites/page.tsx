'use client';

import React from 'react';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';

export default function FavoritesPage() {
  const { user, favorites, removeFromFavorites } = useAuth();

  const handleRemoveFromFavorites = (cocktailId: string) => {
    removeFromFavorites(cocktailId);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen gradient-bg">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a574' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="relative z-10 p-6 sm:p-8">
          {/* Header with Back Button */}
          <div className="max-w-6xl mx-auto mb-8">
            <div className="flex items-center justify-between glass rounded-2xl p-4">
              <Link 
                href="/"
                className="flex items-center text-amber-600 hover:text-amber-700 
                          font-medium transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Home
              </Link>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold mr-3">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-foreground font-medium">{user?.name}</p>
                  <p className="text-foreground/60 text-sm">{favorites.length} favorites</p>
                </div>
              </div>
            </div>
          </div>

          <main className="max-w-6xl mx-auto">
            {/* Page Header */}
            <header className="text-center mb-12">
              <div className="inline-block p-1 rounded-full glass mb-6">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-white text-2xl font-bold">
                  ❤️
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-serif font-bold bg-gradient-to-r from-amber-700 via-amber-600 to-amber-500 bg-clip-text text-transparent mb-4">
                Your Favorites
              </h1>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Your personal collection of saved cocktail recipes
              </p>
              <div className="mt-6 h-px w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"></div>
            </header>

            {/* Favorites Content */}
            {favorites.length > 0 ? (
              <section className="mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {favorites.map((cocktail) => (
                    <div key={cocktail.idDrink} className="group glass rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                      <div className="relative overflow-hidden">
                        <img
                          src={cocktail.strDrinkThumb}
                          alt={cocktail.strDrink}
                          className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Remove from Favorites Button */}
                        <button
                          onClick={() => handleRemoveFromFavorites(cocktail.idDrink)}
                          className="absolute top-3 right-3 w-10 h-10 glass rounded-full 
                                    flex items-center justify-center text-red-500 
                                    hover:bg-red-500 hover:text-white transition-all duration-300
                                    transform hover:scale-110"
                          title="Remove from favorites"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-serif font-semibold text-foreground mb-4 group-hover:text-amber-600 transition-colors">
                          {cocktail.strDrink}
                        </h3>
                        <button
                          onClick={() => window.open(`https://www.thecocktaildb.com/drink/${cocktail.idDrink}`, '_blank')}
                          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          View Recipe
                          <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : (
              <div className="text-center py-20">
                <div className="glass rounded-2xl p-12 max-w-lg mx-auto">
                  <div className="text-6xl mb-6">💔</div>
                  <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
                    No Favorites Yet
                  </h2>
                  <p className="text-foreground/70 mb-6">
                    Start exploring cocktails and add your favorites by clicking the heart icon on any recipe.
                  </p>
                  <Link
                    href="/"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Discover Cocktails
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}