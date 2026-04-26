import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import SearchScreen from '../screens/SearchScreen';
import AboutScreen from '../screens/AboutScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = route.name === 'Home' ? 'home' : 
                         route.name === 'Favorit' ? 'heart' : 
                         route.name === 'Search' ? 'search' : 'person';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2e86de',
        tabBarInactiveTintColor: '#a4b0be',
        tabBarStyle: { borderTopWidth: 0, elevation: 10, shadowOpacity: 0.1 },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Katalog Buku' }} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Favorit" component={FavoriteScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />
      
      <Stack.Screen 
        name="Detail" 
        component={DetailScreen} 
        options={{ title: 'Detail Buku', headerShadowVisible: false }} 
      />
    </Stack.Navigator>
  );
}