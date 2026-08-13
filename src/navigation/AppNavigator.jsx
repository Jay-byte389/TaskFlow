import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from "../screens/SplashScreen";
import OnBoardingScreen from '../screens/OnBoardingScreen';
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import VerificationScreen from "../screens/VerificationScreen";
import NewPasswordScreen from "../screens/NewPasswordScreen";
const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer >
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Splash" component={SplashScreen}/>
            <Stack.Screen name="OnBoarding" component={OnBoardingScreen}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen  name="Register" component={RegisterScreen}/>
            <Stack.Screen  name="Forgot" component={ForgotPasswordScreen}/>
            <Stack.Screen name="Verification" component={VerificationScreen} />
            <Stack.Screen  name="NewPassword" component={NewPasswordScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator