import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { FavoriteProvider } from './src/context/FavoriteContext';
import MainNavigator from './src/navigation/MainNavigator';

export default function App() {
  return (
    <FavoriteProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </FavoriteProvider>
  );
}