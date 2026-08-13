import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { colors } from '../constants/colors';
import ForgotIcon from '../assets/icons/Forgoticon';
import { Fonts } from '../constants/Fonts';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import auth from '@react-native-firebase/auth';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleSendCode = async () => {
    // if (!email.trim()) {
    //   Alert.alert('Error', 'Please enter your email address.');
    //   return;
    // }
    navigation.navigate("Verification")

    // try {
    //   await auth().sendPasswordResetEmail(email.trim());
    //   Alert.alert(
    //     'Success',
    //     'Password reset link sent! Check your inbox to reset your password.',
    //     [{ text: 'OK', onPress: () => navigation.navigate("Verification") }]
    //   );
    // } catch (error) {
    //   console.log('Reset Password Error:', error);
    //   let errorMessage = 'Failed to send reset email. Please try again.';

    //   if (error.code === 'auth/user-not-found') {
    //     errorMessage = 'No user found with this email address.';
    //   } else if (error.code === 'auth/invalid-email') {
    //     errorMessage = 'Please enter a valid email address.';
    //   }

    //   Alert.alert('Reset Failed', errorMessage);
    // }
  };

  return (
    <SafeAreaView style={styles.main}>
      <Header title="Forgot Password" />
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.mainContainer}>
            {/* Lock Icon */}
            <View style={styles.iconContainer}>
              <ForgotIcon width="100%" height="100%" />
            </View>

            {/* Heading */}
            <View style={styles.headingContainer}>
              <Text style={styles.headingTxt}>Reset Password</Text>
            </View>

            {/* Subheading */}
            <View style={styles.subheading}>
              <Text style={styles.subheadingtxt}>
                Enter your email and we'll send a verification code to reset your password.
              </Text>
            </View>

            {/* Form Fields & Buttons */}
            <View style={styles.formContainer}>
              <Input
                label="EMAIL ADDRESS"
                value={email}
                onChangeText={setEmail}
                placeholder="you@company.com"
                icon="mail-outline"
                placeholderTextColor={colors.Dargrey}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <View style={styles.buttonContainer}>
                <CustomButton
                  title="Send Reset Code"
                  onPress={handleSendCode} textStyle={styles.fbtn}
                />
              </View>

              {/* Back to Sign In Link */}
              <TouchableOpacity
                style={styles.backToSignBtn}
                activeOpacity={0.7}
                onPress={() => navigation?.goBack()}
              >
                <Text style={styles.backToSignTxt}>Back to Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  mainContainer: {
    paddingTop: '8%',
    alignItems: 'center',
    paddingHorizontal: '6%',
  },
  iconContainer: {
    width: '30%',
    aspectRatio: 1,
    justify: 'center',
    alignItems: 'center',
  },
  headingContainer: {
    marginTop: '6%',
  },
  headingTxt: {
    fontFamily: Fonts.Bold,
    fontSize: 22,
    color: '#111827',
    textAlign: 'center',
  },
  subheading: {
    paddingTop: '2%',
    marginBottom: '6%',
  },
  subheadingtxt: {
    textAlign: 'center',
    fontFamily: Fonts.Regular,
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  formContainer: {
    width: '100%',
    paddingTop: '2%',
  },
  buttonContainer: {
    marginTop: '6%',
  },
  backToSignBtn: {
    marginTop: '4%',
    alignItems: 'center',
  },
  backToSignTxt: {
    fontFamily: Fonts.SemiBold,
    fontSize: 14,
    color: '#6B7280',
  },fbtn:{
    fontFamily:Fonts.Bold,
    fontSize:14, 
  }
});