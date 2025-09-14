'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';

interface Ingredient {
  strIngredient1: string;
}

interface IngredientDropdownProps {
  onIngredientSelect?: (ingredient: string) => void;
}

export default function IngredientDropdown({ onIngredientSelect }: IngredientDropdownProps) {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIngredient, setSelectedIngredient] = useState<string>('');

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
        
        if (!response.ok) {
          throw new Error('Failed to fetch ingredients');
        }
        
        const data = await response.json();
        setIngredients(data.drinks || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  const sortedIngredients = useMemo(() => {
    return [...ingredients].sort((a, b) => 
      a.strIngredient1.localeCompare(b.strIngredient1)
    );
  }, [ingredients]);

  const handleIngredientChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const ingredient = event.target.value;
    setSelectedIngredient(ingredient);
    if (onIngredientSelect) {
      onIngredientSelect(ingredient);
    }
  }, [onIngredientSelect]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="glass rounded-full p-4">
          <div className="animate-spin rounded-full h-6 w-6 border-3 border-amber-500 border-t-transparent"></div>
        </div>
        <span className="ml-3 text-foreground/70 font-medium">Loading ingredients...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass rounded-xl p-6 border-red-200 dark:border-red-800">
        <div className="flex items-center">
          <div className="text-red-500 text-xl mr-3">⚠️</div>
          <div>
            <h3 className="text-red-700 dark:text-red-400 font-semibold">Error loading ingredients</h3>
            <p className="text-red-600 dark:text-red-500 text-sm mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <label htmlFor="ingredient-select" className="block text-foreground font-serif text-lg font-semibold mb-4 text-center">
        Choose Your Ingredient
      </label>
      <div className="relative">
        <select
          id="ingredient-select"
          value={selectedIngredient}
          onChange={handleIngredientChange}
          className="w-full px-6 py-4 glass rounded-xl text-foreground font-medium
                     focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent
                     transition-all duration-300 appearance-none cursor-pointer
                     hover:shadow-lg hover:scale-105 text-center"
        >
          <option value="">✨ Select an ingredient...</option>
          {sortedIngredients.map((ingredient, index) => (
            <option key={index} value={ingredient.strIngredient1}>
              {ingredient.strIngredient1}
            </option>
          ))}
        </select>
        
        {/* Custom dropdown arrow */}
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {selectedIngredient && (
        <div className="mt-4 p-4 glass rounded-xl border border-amber-200 dark:border-amber-800">
          <p className="text-center text-foreground/80">
            <span className="font-medium text-amber-700 dark:text-amber-400">Selected:</span>
            <span className="ml-2 font-semibold text-foreground">{selectedIngredient}</span>
            <span className="ml-2">🥃</span>
          </p>
        </div>
      )}
    </div>
  );
}