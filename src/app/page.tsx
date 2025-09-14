'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import IngredientDropdown from "@/components/IngredientDropdown";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strInstructions?: string;
}

export default function Home() {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<string>('');
  
  const { user, logout, addToFavorites, removeFromFavorites, isFavorite } = useAuth();

  const fetchCocktailsByIngredient = useCallback(async (ingredient: string) => {
    setLoading(true);
    setCocktails([]);
    
    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cocktails');
      }
      
      const data = await response.json();
      setCocktails(data.drinks || []);
    } catch (error) {
      console.error('Error fetching cocktails:', error);
      setCocktails([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleIngredientSelect = useCallback((ingredient: string) => {
    setSelectedIngredient(ingredient);
    if (ingredient) {
      fetchCocktailsByIngredient(ingredient);
    }
  }, [fetchCocktailsByIngredient]);

  const handleToggleFavorite = useCallback((cocktail: Cocktail) => {
    if (isFavorite(cocktail.idDrink)) {
      removeFromFavorites(cocktail.idDrink);
    } else {
      const favoriteCocktail = {
        idDrink: cocktail.idDrink,
        strDrink: cocktail.strDrink,
        strDrinkThumb: cocktail.strDrinkThumb
      };
      addToFavorites(favoriteCocktail);
    }
  }, [isFavorite, addToFavorites, removeFromFavorites]);

  const cocktailGrid = useMemo(() => {
    return cocktails.map((cocktail) => (
      <div key={cocktail.idDrink} className="group glass rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
        <div className="relative overflow-hidden">
          <Image
            src={cocktail.strDrinkThumb}
            alt={cocktail.strDrink}
            width={400}
            height={224}
            className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Favorite Button */}
          <button
            onClick={() => handleToggleFavorite(cocktail)}
            className={`absolute top-3 right-3 w-10 h-10 glass rounded-full 
                      flex items-center justify-center transition-all duration-300
                      transform hover:scale-110 ${
                        isFavorite(cocktail.idDrink) 
                          ? 'text-red-500 hover:text-red-600' 
                          : 'text-white/70 hover:text-red-500'
                      }`}
            title={isFavorite(cocktail.idDrink) ? "Remove from favorites" : "Add to favorites"}
          >
            <svg className="w-5 h-5" fill={isFavorite(cocktail.idDrink) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-serif font-semibold text-foreground mb-4 group-hover:text-amber-600 transition-colors">
            {cocktail.strDrink}
          </h3>
          <div className="flex items-center justify-between">
            <button
              onClick={() => window.open(`https://www.thecocktaildb.com/drink/${cocktail.idDrink}`, '_blank')}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View Recipe
              <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Favorite Status */}
            {isFavorite(cocktail.idDrink) && (
              <span className="text-red-500 text-sm font-medium flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                Favorited
              </span>
            )}
          </div>
        </div>
      </div>
    ));
  }, [cocktails, isFavorite, handleToggleFavorite]);

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
          {/* User Header */}
          <div className="max-w-6xl mx-auto mb-8">
            <div className="flex justify-between items-center glass rounded-2xl p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold mr-3">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-foreground font-medium">Welcome back, {user?.name}!</p>
                  <p className="text-foreground/60 text-sm">{user?.email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Link 
                  href="/favorites"
                  className="flex items-center px-3 py-2 text-amber-600 hover:text-amber-700 
                            hover:bg-amber-50 dark:hover:bg-amber-900/20 
                            rounded-lg transition-colors font-medium"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  Favorites
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-amber-600 hover:text-amber-700 
                            hover:bg-amber-50 dark:hover:bg-amber-900/20 
                            rounded-lg transition-colors font-medium"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          <main className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <header className="text-center mb-16 pt-8">
            <div className="inline-block p-1 rounded-full glass mb-6">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-white text-2xl font-bold">
                🍸
              </div>
            </div>
            <h1 className="text-5xl sm:text-6xl font-serif font-bold bg-gradient-to-r from-amber-700 via-amber-600 to-amber-500 bg-clip-text text-transparent mb-6">
              Cocktail Party
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              Discover the perfect cocktail for every occasion. Explore our curated collection of classic and modern recipes.
            </p>
            <div className="mt-8 h-px w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"></div>
          </header>
          
          {/* Search Section */}
          <section className="mb-12">
            <div className="max-w-lg mx-auto">
              <h2 className="text-2xl font-serif font-semibold text-center mb-8 text-foreground">
                Find Cocktails by Ingredient
              </h2>
              <IngredientDropdown onIngredientSelect={handleIngredientSelect} />
            </div>
          </section>

          {/* Cocktails Results Section */}
          {selectedIngredient && (
            <section className="mb-12">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-serif font-semibold text-foreground mb-2">
                  Cocktails with {selectedIngredient}
                </h2>
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"></div>
              </div>
              
              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="glass rounded-full p-6">
                    <div className="animate-spin rounded-full h-8 w-8 border-3 border-amber-500 border-t-transparent"></div>
                  </div>
                  <span className="ml-4 text-foreground/70 font-medium">Finding cocktails...</span>
                </div>
              ) : cocktails.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {cocktailGrid}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="glass rounded-2xl p-8 max-w-md mx-auto">
                    <div className="text-4xl mb-4">🔍</div>
                    <p className="text-foreground/70 font-medium">
                      No cocktails found with {selectedIngredient}.
                    </p>
                    <p className="text-sm text-foreground/50 mt-2">
                      Try selecting a different ingredient.
                    </p>
                  </div>
                </div>
              )}
            </section>
          )}
        </main>
      </div>
    </div>
    </ProtectedRoute>
  );
}
