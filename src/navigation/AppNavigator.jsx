import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthNavigator from '../navigation/AuthNavigator';
import BottomTabNavigator from '../navigation/BottomTabNavigator';
import { getAuth } from '@react-native-firebase/auth';
import { ActivityIndicator, View } from 'react-native';
import ProjectDetails from "../screens/ProjectDetails"; 
import CreateProjectScreen from "../screens/CreateProjectScreen";
import EditProjectScreen from "../screens/EditProjectScreen";
const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  const [intializing, setIntialing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
      const subscriber=getAuth().onAuthStateChanged((temp)=>{
        setUser(temp);
      })
      if(intializing){
        setIntialing(false);
      }
      return subscriber;
  
  }, [intializing]);

  if (intializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2260FF" />
      </View>
    );
  }

  return (


    <Stack.Navigator screenOptions={{ headerShown: false }}>
      
      {user ?(
      <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
      ):(
       <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
      <Stack.Screen name="ProjectDetails" component={ProjectDetails} />
      <Stack.Screen name="CreateProject" component={CreateProjectScreen}/>
      <Stack.Screen  name="EditProject" component={EditProjectScreen}/>
      </Stack.Navigator>
  );
};

export default AppNavigator;
