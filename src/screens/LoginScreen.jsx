import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing } from '../constants/spacing';
import LoginIcon from '../assets/icons/LoginIcon1';
import { Fonts } from '../constants/Fonts';
import { colors } from '../constants/colors';
import LinearGradient from 'react-native-linear-gradient';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import RedGlobe from '../assets/icons/RedGlobe';
import BlackGlobe from '../assets/icons/BlackGlobe';
import { useNavigation } from '@react-navigation/native';
import {
  getAuth,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import { signInWithGoogle } from '../services/googleSign';
import { getFirestore, doc, getDoc } from '@react-native-firebase/firestore';
const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const gradientColors = [
    colors.primary || '#3B82F6',
    colors.secondary || '#8B5CF6',
  ];

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please Enter the email and Password');
      return;
    }
    try {
      const authInstance = getAuth();
      const db = getFirestore();
      const userCredential = await signInWithEmailAndPassword(
        authInstance,
        email.trim().toLowerCase(),
        password,
      );
      const user = userCredential.user;
      const userSnapshot = await getDoc(doc(db, 'users', user.uid));

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        console.log('Logged in user:', userData);

        Alert.alert(
          'Login Successful',
          `Welcome ${userData.firstName} ${userData.lastName}`,
        );
        // navigation.replace("BottomTabs");
      } else {
        Alert.alert('Error', 'User profile was not found.');
      }
    } catch (error) {
      console.log('Login error:', error);

      let errorMessage = 'Unable to login.';

      if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = 'This account has been disabled.';
      }

      Alert.alert('Login Failed', errorMessage);
    }
  };

  const handleForgot = () => {
    navigation.navigate('Forgot');
  };

  const handleCreate = () => {
    navigation.navigate('Register');
  };

  const handleGooglePress = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
    }
  };
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.mainContainer}>
        <View style={styles.firstContainer}>
          <View style={styles.iconContainer}>
            <View style={styles.iconWrapper}>
              <LinearGradient
                colors={gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.card}
              >
                <LoginIcon width={36} height={36} />
              </LinearGradient>
            </View>

            <View style={styles.headingText}>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>
                Sign In to Your TaskFlow account
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.formContainer}>
          <Input
            id="email-input"
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="xyz@gmail.com"
            icon="mail-outline"
            placeholderTextColor={colors.black}
            keyboardType="email-address"
          />
          <Input
            id="password-input"
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="********"
            placeholderTextColor={colors.black}
            icon="lock-closed-outline"
            isPassword={true}
          />

          <View style={styles.forgetContainer}>
            <TouchableOpacity
              style={styles.forget}
              activeOpacity={0.7}
              onPress={handleForgot}
            >
              <Text style={styles.frgtTxt}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.btnContainer}>
            <CustomButton title="Sign In" onPress={handleLogin} />
          </View>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Buttons */}
          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={styles.socialButton}
              activeOpacity={0.7}
              onPress={handleGooglePress}
            >
              <RedGlobe width={18} height={18} />
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
              <BlackGlobe width={18} height={18} />
              <Text style={styles.socialText}>GitHub</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.createContainer}>
            <Text>Don't have an account?</Text>
            <TouchableOpacity
              style={styles.create}
              activeOpacity={0.7}
              onPress={handleCreate}
            >
              <Text style={styles.createTxt}> Create account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  main: {
    flex: spacing.flex,
    paddingHorizontal: '4%',
    backgroundColor: colors.white || '#FFFFFF',
  },
  mainContainer: {
    flex: spacing.flex,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  firstContainer: {
    width: '100%',
  },
  iconContainer: {
    alignItems: 'center',
    paddingTop: '10%',
  },
  iconWrapper: {
    width: '20%',
    aspectRatio: 1,
    marginBottom: '4%',
    backgroundColor: 'transparent',
    borderRadius: 24,
    boxShadow: '0px 5px 8px 0px rgba(59, 130, 246, 0.7)',
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  headingText: {
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.Bold,
    fontSize: 25,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: Fonts.Regular,
    fontSize: 13,
    paddingTop: '1%',
    color: colors.Dargrey || '#64748B',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: '5%',
    marginTop: '4%',
  },
  forgetContainer: {
    justifyContent: 'center',
  },
  forget: {
    alignSelf: 'flex-end',
  },
  frgtTxt: {
    color: '#2563EB',
    fontFamily: Fonts.Medium || 'System',
    fontSize: 13,
  },
  btnContainer: {
    paddingTop: '5%',
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '3%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    paddingHorizontal: '4%',
    color: colors.Dargrey || '#94A3B8',
    fontFamily: Fonts.Regular || 'System',
    fontSize: 13,
  },

  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 24,
    paddingVertical: '3%',
    backgroundColor: '#FFFFFF',
  },
  socialText: {
    marginLeft: '6%',
    fontFamily: Fonts.Bold || 'System',
    fontSize: 14,
    color: '#0F172A',
  },
  createContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '6%',
  },
  accountText: {
    fontFamily: Fonts.Regular || 'System',
    fontSize: 13,
    color: colors.Dargrey || '#64748B',
  },
  create: {
    paddingVertical: '1%',
  },
  createTxt: {
    color: colors.primary || '#2563EB',
    fontFamily: Fonts.Bold || 'System',
    fontSize: 13,
  },
});
