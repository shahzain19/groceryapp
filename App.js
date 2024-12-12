import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { Ionicons } from '@expo/vector-icons'; // For icons

import Splash from './src/Screens/Splash';
import Signup from './src/Screens/Signup';
import Login from './src/Screens/Login';
import Homescreen from './src/Screens/homescreen';
import Details from './src/Screens/Details';
import Cart from './src/Screens/Cart';
import RewardsScreen from './src/Screens/RewardsScreen';
import OrderPlaced from './src/Screens/OrderPlaced';
import Order from './src/Screens/Orders';
import { mart } from './redux/Store';
import Orders from './src/Screens/Orders';
import { Colors } from './src/Utils/Colors';
import CompleteOrderScreen from './src/Screens/CompleteOrderScreen';
import CategoryProductsScreen from './src/Screens/homescreen';
import Category from './src/Screens/Category';
import CategoryProductScreen from './src/Components/CategoryProductScreen';
import OrderTrackingScreen from './src/Screens/OrderTrackingScreen';
import AllProductsScreen from './src/Screens/AllProductsScreen';

// Create Stack Navigator
const Stack = createNativeStackNavigator();

// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// Other screens for Bottom Tabs
const OrdersScreen = () => (
  <Orders />
);

const Reward = () => (
  <RewardsScreen />

);

// Create the Tab Navigator for the `homescreen`
const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Orders') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Rewards') {
            iconName = focused ? 'trophy' : 'trophy-outline';
          }
          else if (route.name === 'Cart') {
            iconName = focused ? 'basket' : 'basket-outline';
          }
          else if (route.name === 'AllProducts') {
            iconName = focused ? 'albums' : 'albums-outline';
          }

          // Larger icon size
          return <Ionicons name={iconName} size={28} color={color} />;
        },
        tabBarActiveTintColor: 'black', // Active icon color
        tabBarInactiveTintColor: 'gray', // Inactive icon color
        opacity: 0,
        tabBarStyle: {
          height: 90, // Increased height to prevent cutoff
          paddingBottom: 10, // Padding at the bottom
          paddingTop: 10, // Padding at the top

        },
        tabBarLabelStyle: {
          fontSize: 16, // Larger text size
          fontWeight: 'bold', // Bold text for better visibility
        },
        headerShown: false, // Hide header for the tabs
      })}
    >
      <Tab.Screen name="Home" component={Homescreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Rewards" component={Reward} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="AllProducts" component={AllProductsScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={mart}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false, // Hide headers for stack screens
          }}
        >
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Login" component={Login} />
          {/* Replace homescreen with HomeTabs */}
          <Stack.Screen name="homescreen" component={HomeTabs} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="OrderPlaced" component={OrderPlaced} />
          <Stack.Screen name="CategoryProductScreen" component={CategoryProductScreen} />
          <Stack.Screen name="OrderTrackingScreen" component={OrderTrackingScreen} />
          <Stack.Screen name="AllProductsScreen" component={AllProductsScreen} />
          </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
