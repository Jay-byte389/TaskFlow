import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { colors } from '../constants/colors';
import Input from '../components/Input';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';
import { Fonts } from '../constants/Fonts';
import '@react-native-firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
} from '@react-native-firebase/auth';

import {
  getFirestore,
  doc,
  setDoc,
} from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { spacing } from '../constants/spacing';
import { s, vs, ms } from 'react-native-size-matters';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agredTerms, setAgrredTerms] = useState(false);

  const handleSignin = () => {
    navigation.navigate("Login");
  };

  const handleCreate = async () => {
    const authInstance = getAuth();
    const db = getFirestore();

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !company.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      Alert.alert('Please enter All Fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    if (!agredTerms) {
      Alert.alert('Error', 'You must agree to the Terms and Privacy Policy.');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        authInstance,
        email.trim(),
        password,
      );

      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        createdAt: new Date(),
        updatedAt: new Date(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        company: company.trim(),
        agreedToTerms: agredTerms,
      });

      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setPassword('');
      setConfirmPassword('');
      setAgrredTerms(false);

      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate("Login");
    } catch (error) {
      console.log('Error Saving user: ', error);

      let errorMessage = 'An error occurred during registration.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'That email address is already registered!';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address format!';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters.';
      }
      Alert.alert('Registration Failed', errorMessage);
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <Header title="Create Account" />
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formContainer}>
            <View style={styles.namecontainer}>
              <Input
                value={firstName}
                icon="person-outline"
                label="FIRST NAME"
                onChangeText={setFirstName}
                placeholder="Alex"
                placeholderTextColor={colors.Dargrey}
                containerStyle={styles.halfWidth}
              />
              <Input
                value={lastName}
                icon="person-outline"
                label="LAST NAME"
                onChangeText={setLastName}
                placeholder="Chen"
                placeholderTextColor={colors.Dargrey}
                containerStyle={styles.halfWidth}
              />
            </View>

            <Input
              value={email}
              icon="mail-outline"
              label="EMAIL"
              onChangeText={setEmail}
              placeholder="you@company.com"
              placeholderTextColor={colors.Dargrey}
              keyboardType="email-address"
            />

            <Input
              value={phone}
              icon="call-outline"
              label="PHONE"
              onChangeText={setPhone}
              placeholder="+1 555 000 0000"
              placeholderTextColor={colors.Dargrey}
              keyboardType="phone-pad"
            />

            <Input
              value={company}
              icon="business-outline"
              label="COMPANY"
              onChangeText={setCompany}
              placeholder="Acme Corp"
              placeholderTextColor={colors.Dargrey}
            />

            <Input
              value={password}
              icon="lock-closed-outline"
              label="PASSWORD"
              placeholder="••••••••"
              placeholderTextColor={colors.Dargrey}
              isPassword={true}
              onChangeText={setPassword}
            />

            <Input
              value={confirmPassword}
              icon="lock-closed-outline"
              label="CONFIRM PASSWORD"
              placeholder="••••••••"
              placeholderTextColor={colors.Dargrey}
              isPassword={true}
              onChangeText={setConfirmPassword}
            />

            <View style={styles.lowerContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setAgrredTerms(!agredTerms)}
                style={[styles.checkBox, agredTerms && styles.sheckBoxTicked]}
              >
                {agredTerms && (
                  <Ionicons name="checkmark" size={ms(12)} color={colors.white} />
                )}
              </TouchableOpacity>
              <Text style={styles.termsText}>
                I agree to the{' '}
                <Text style={styles.linkText}>Terms Of Service </Text>and{' '}
                <Text style={styles.linkText}>Privacy Policy</Text>
              </Text>
            </View>

            <CustomButton title="Create Account" onPress={handleCreate} />

            <View style={styles.signIntextContainer}>
              <Text style={styles.alreadytxt}>Already have an account?</Text>
              <TouchableOpacity style={styles.signinbtn} onPress={handleSignin}>
                <Text style={styles.signtxt}>SignIn</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

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
    paddingBottom: vs(spacing.registerPaddingBottom), // Adds space at bottom so button isn't cut off on small screens
  },
  formContainer: {
    paddingHorizontal: s(16),
    paddingTop: vs(8),
    rowGap: vs(spacing.registerGap), // Tightens vertical spacing between inputs
  },
  namecontainer: {
    flexDirection: 'row',
    width: spacing.fullWidth,
    gap: s(8), // Replaces width: '48%' with dynamic gap
  },
  halfWidth: {
    flex: spacing.a, // Lets both inputs share width 50/50 dynamically
  },
  lowerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.OffWhite,
    paddingVertical: vs(10),
    paddingHorizontal: s(12),
    borderRadius: ms(20),
    marginVertical: vs(4),
  },
  checkBox: {
    width: s(20),
    height: s(20),
    borderRadius: ms(spacing.checkBoxRadius),
    borderWidth: spacing.a,
    borderColor: colors.LightSlateGray,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: s(10),
  },
  sheckBoxTicked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  termsText: {
    fontSize: ms(11),
    color: colors.MutedSlateGray,
    flex: spacing.a,
  },
  linkText: {
    color: colors.primary,
    fontWeight: '600',
  },
  signIntextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: vs(8),
  },
  alreadytxt: {
    fontFamily: Fonts.Regular,
    fontSize: ms(13),
  },
  signinbtn: {
    marginHorizontal: s(4),
  },
  signtxt: {
    color: colors.primary,
    fontFamily: Fonts.Regular,
    fontSize: ms(13),
  },
});