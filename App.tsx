/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';

import { NavigationContainer } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';
import {store} from "./src/redux/store";
import { Provider } from 'react-redux';
import GlobalSnackbar from "./src/components/GlobalSnackBar";
function App() {
  const isDarkMode = useColorScheme() === 'dark';
   useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '575323103941-fpaas8e20tikvemm9l4ai7qrvars2bjt.apps.googleusercontent.com',
    });
  }, []);
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Provider store={store}>
        <AppNavigator />
        <GlobalSnackbar />
        </Provider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
