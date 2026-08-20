import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { colors } from '../constants/colors';
import ForgotIcon from '../assets/icons/Forgoticon';
import { Fonts } from '../constants/Fonts';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';

import { getAuth } from '@react-native-firebase/auth';
import { spacing } from '../constants/spacing';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendResetEmail = async () => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }
    setLoading(true);
    try {
      await getAuth().sendPasswordResetEmail(cleanEmail);
      setLoading(false);
      Alert.alert(
        'Reset Link Sent',
        `A password reset link has been sent to ${cleanEmail}. Please check your email inbox and open the link to set a new password.`,
        [
          {
            text: 'Back to Sign In',
            onPress: () => navigation.navigate('Login'),
          },
        ],
      );
    } catch (error) {
      setLoading(false);
      console.log('Error sending reset email:', error);
      // Handle common Firebase Auth errors
      if (error.code === 'auth/user-not-found') {
        Alert.alert('Error', 'No registered account found with this email.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'Please enter a valid email address.');
      } else {
        Alert.alert('Error', error?.message || 'Failed to send reset email.');
      }
    }
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
            <View style={styles.iconContainer}>
              <ForgotIcon width="100%" height="100%" />
            </View>

            <View style={styles.headingContainer}>
              <Text style={styles.headingTxt}>Reset Password</Text>
            </View>

            <View style={styles.subheading}>
              <Text style={styles.subheadingtxt}>
                Enter your email and we'll send a verification code to reset
                your password.
              </Text>
            </View>

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
                  title={
                    loading ? (
                      <ActivityIndicator
                        size="small"
                        color={colors.white}
                        backgroundColor={colors.primary}
                      />
                    ) : (
                      'Send Reset Link'
                    )
                  }
                  onPress={handleSendResetEmail}
                  textStyle={styles.fbtn}
                />
              </View>

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
    flex: spacing.a,
    backgroundColor: colors.white,
  },
  keyboardContainer: {
    flex: spacing.a,
  },
  scrollContainer: {
    flexGrow: spacing.a,
  },
  mainContainer: {
    paddingTop: spacing.vforty,
    alignItems: 'center',
    paddingHorizontal: spacing.fifteen,
  },
  iconContainer: {
    width: spacing.hOneHundred,
    aspectRatio: spacing.a,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingContainer: {
    marginTop: spacing.vfifteen,
  },
  headingTxt: {
    fontFamily: Fonts.Bold,
    fontSize: spacing.mtwentyTwo,
    color: colors.black,
    textAlign: 'center',
  },
  subheading: {
    paddingTop: spacing.vtwo,
    paddingBottom: spacing.vtwenty,
  },
  subheadingtxt: {
    textAlign: 'center',
    fontFamily: Fonts.Regular,
    fontSize: spacing.mfourteen,
    color: colors.MutedSlateGray,
    lineHeight: spacing.lhTwenty,
  },
  formContainer: {
    width: spacing.fullWidth,
    paddingTop: spacing.vten,
  },
  buttonContainer: {
    marginTop: spacing.veight,
  },
  backToSignBtn: {
    marginTop: spacing.four,
    alignItems: 'center',
  },
  backToSignTxt: {
    fontFamily: Fonts.SemiBold,
    fontSize: spacing.mfourteen,
    color: colors.Dargrey,
  },
  fbtn: {
    fontFamily: Fonts.Bold,
    fontSize: spacing.mfourteen,
  },
});