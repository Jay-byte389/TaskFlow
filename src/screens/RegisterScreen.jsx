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

import { getFirestore, doc, setDoc } from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { spacing } from '../constants/spacing';
import { showSnackbar } from '../redux/slice/snackBarSlice';
import { useDispatch } from 'react-redux';

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
  const dispatch = useDispatch();
  const handleSignin = () => {
    navigation.navigate('Login');
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
      dispatch(
        showSnackbar({
          message: 'Please Enter All The Fields',
          type: 'error',
        }),
      );
      return;
    }

    if (password !== confirmPassword) {
      dispatch(
        showSnackbar({
          message: "'Passwords do not match.'",
          type: 'error',
        }),
      );

      return;
    }

    if (!agredTerms) {
      dispatch(
        showSnackbar({
          message: 'You must agree to the Terms and Privacy Policy.',
          type: 'error',
        }),
      );
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

      dispatch(
        showSnackbar({
          message: 'Account Created Successfully....',
          type: 'success',
        }),
      );

      navigation.navigate('Login');
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
      dispatch(
        showSnackbar({
          message: 'Registration Failed',
          type: 'error',
        }),
      );
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
                  <Ionicons
                    name="checkmark"
                    size={spacing.mtwelve}
                    color={colors.white}
                  />
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
    paddingBottom: spacing.registerPaddingBottom,
  },
  formContainer: {
    paddingHorizontal: spacing.hsixteen,
    paddingTop: spacing.veight,
    rowGap: spacing.registerGap,
  },
  namecontainer: {
    flexDirection: 'row',
    width: spacing.fullWidth,
    gap: spacing.veight,
  },
  halfWidth: {
    flex: spacing.a,
  },
  lowerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.OffWhite,
    paddingVertical: spacing.vten,
    paddingHorizontal: spacing.htwelve,
    borderRadius: spacing.mtwenty,
    marginVertical: spacing.vfour,
  },
  checkBox: {
    width: spacing.htwenty,
    height: spacing.htwenty,
    borderRadius: spacing.checkBoxRadius,
    borderWidth: spacing.borderThin,
    borderColor: colors.LightSlateGray,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.hten,
  },
  sheckBoxTicked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  termsText: {
    fontSize: spacing.meleven,
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
    marginTop: spacing.veight,
  },
  alreadytxt: {
    fontFamily: Fonts.Regular,
    fontSize: spacing.mthirteen,
  },
  signinbtn: {
    marginHorizontal: spacing.hfour,
  },
  signtxt: {
    color: colors.primary,
    fontFamily: Fonts.Regular,
    fontSize: spacing.mthirteen,
  },
});
