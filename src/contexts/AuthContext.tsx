'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface FavoriteCocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  favorites: FavoriteCocktail[];
  addToFavorites: (cocktail: FavoriteCocktail) => void;
  removeFromFavorites: (cocktailId: string) => void;
  isFavorite: (cocktailId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<FavoriteCocktail[]>([]);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        // Initialize with demo user if no users exist
        const existingUsers = localStorage.getItem('cocktail_users');
        if (!existingUsers) {
          const demoUser = {
            id: '1',
            name: 'Demo User',
            email: 'demo@cocktailparty.com',
            password: 'demo123'
          };
          localStorage.setItem('cocktail_users', JSON.stringify([demoUser]));
        }

        const storedUser = localStorage.getItem('cocktail_user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          
          // Load user's favorites
          const userFavorites = localStorage.getItem(`cocktail_favorites_${userData.id}`);
          if (userFavorites) {
            setFavorites(JSON.parse(userFavorites));
          }
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulate API call - In a real app, you'd call your backend API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check stored users (in real app, this would be server-side)
      const storedUsers = JSON.parse(localStorage.getItem('cocktail_users') || '[]');
      const foundUser = storedUsers.find((u: any) => 
        u.email === email && u.password === password
      );
      
      if (foundUser) {
        const userData: User = {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name
        };
        
        setUser(userData);
        localStorage.setItem('cocktail_user', JSON.stringify(userData));
        
        // Load user's favorites
        const userFavorites = localStorage.getItem(`cocktail_favorites_${userData.id}`);
        if (userFavorites) {
          setFavorites(JSON.parse(userFavorites));
        } else {
          setFavorites([]);
        }
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const storedUsers = JSON.parse(localStorage.getItem('cocktail_users') || '[]');
      const existingUser = storedUsers.find((u: any) => u.email === email);
      
      if (existingUser) {
        return false; // User already exists
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password // In real app, this would be hashed
      };
      
      const updatedUsers = [...storedUsers, newUser];
      localStorage.setItem('cocktail_users', JSON.stringify(updatedUsers));
      
      // Log them in automatically
      const userData: User = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      };
      
      setUser(userData);
      localStorage.setItem('cocktail_user', JSON.stringify(userData));
      
      // Initialize empty favorites for new user
      setFavorites([]);
      localStorage.setItem(`cocktail_favorites_${userData.id}`, JSON.stringify([]));
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
    localStorage.removeItem('cocktail_user');
  };

  const addToFavorites = (cocktail: FavoriteCocktail) => {
    if (!user) return;
    
    const updatedFavorites = [...favorites, cocktail];
    setFavorites(updatedFavorites);
    localStorage.setItem(`cocktail_favorites_${user.id}`, JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (cocktailId: string) => {
    if (!user) return;
    
    const updatedFavorites = favorites.filter(fav => fav.idDrink !== cocktailId);
    setFavorites(updatedFavorites);
    localStorage.setItem(`cocktail_favorites_${user.id}`, JSON.stringify(updatedFavorites));
  };

  const isFavorite = (cocktailId: string): boolean => {
    return favorites.some(fav => fav.idDrink === cocktailId);
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isLoading,
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};