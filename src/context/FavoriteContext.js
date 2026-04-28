import React, { createContext, useReducer } from 'react';

const initialState = [];

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const isExist = state.find((item) => item.key === action.payload.key);
      if (isExist) {
        return state.filter((item) => item.key !== action.payload.key);
      }
      return [...state, action.payload];
    default:
      return state;
  }
};

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);

  const toggleFavorite = (book) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: book });
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};