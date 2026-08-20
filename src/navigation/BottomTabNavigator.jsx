import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import HomeScreen from '../screens/HomeScreen';
import ProjectsScreen from '../screens/ProjectsScreen';
import TaskScreen from '../screens/TaskScreen';
import TeamScreen from '../screens/TeamScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const insets =useSafeAreaInsets();
  const [isFocused,setisFocused]= useState(false);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2260FF',
        tabBarInactiveTintColor: '#A8B0BE', 
        tabBarStyle: {
          position:'absolute',
            height: Platform.OS=='android' ? 50+ insets.bottom :60,
             paddingBottom:10     
        },
      }
    }
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <Ionicons name="home-outline" size={25} color={"#9CA3AF"} />
          ),
        }}
      />

      <Tab.Screen
        name="Projects"
        component={ProjectsScreen}
        options={{
          tabBarIcon: () => (
            <Ionicons name="folder-open-outline" size={25} color={"#9CA3AF"} />
          ),
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={TaskScreen}
        options={{
          tabBarIcon: () => (
            <Feather name="check-square" size={24} color="#9CA3AF" />
          ),
        }}
      />
      <Tab.Screen
        name="Team"
        component={TeamScreen}
        options={{
          tabBarIcon: () => <Feather name="users" size={24} color="#9CA3AF" />,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => <Feather name="user" size={24} color="#9CA3AF" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
