import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth } from '@react-native-firebase/auth'; 
import Feather from 'react-native-vector-icons/Feather';

const ProfileScreen = () => {

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {            
              await getAuth().signOut();
            } catch (error) {
              console.log('Logout Error:', error);
              Alert.alert('Error', 'Failed to log out. Please try again.');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Profile</Text>

        <TouchableOpacity 
          style={styles.logoutButton} 
          activeOpacity={0.7} 
          onPress={handleLogout}
        >
          <Feather name="log-out" size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingTop: '5%',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: '8%',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE2E2',
    paddingVertical: '3.5%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 15,
    fontWeight: '700',
    marginLeft: '2.5%',
  },
});