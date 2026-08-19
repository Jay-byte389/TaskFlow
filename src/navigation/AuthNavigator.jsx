import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import OnBoardingScreen from '../screens/OnBoardingScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import VerificationScreen from '../screens/VerificationScreen';
import { useSelector } from 'react-redux';
const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  const isLoggedOut = useSelector((state) => state.auth.isLoggedOut);
  return (
    <Stack.Navigator
      // If user logged out, boot directly into Login. Otherwise boot into Splash.
      initialRouteName={isLoggedOut ? 'Login' : 'Splash'}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Forgot" component={ForgotPasswordScreen} />
      <Stack.Screen name="Verification" component={VerificationScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
