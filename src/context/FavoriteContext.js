import React, { createContext, useState } from 'react';

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (book) => {
    setFavorites((prev) => {
      const isExist = prev.find((item) => item.key === book.key);
      if (isExist) return prev.filter((item) => item.key !== book.key); 
      return [...prev, book]; 
    });
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};