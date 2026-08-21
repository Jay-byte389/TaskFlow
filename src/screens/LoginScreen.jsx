import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
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

import { signInWithGoogle } from '../services/googleSign';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../redux/slice/snackBarSlice';
import { createLogin } from '../services/userServices';
const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const gradientColors = [colors.primary, colors.secondary];
  const handleLogin = async () => {
  if (!email.trim() || !password.trim()) {
    dispatch(
      showSnackbar({
        message: 'Please enter email and password.',
        type: 'error',
      }),
    );
    return;
  }

  setLoading(true);
  try {
    const userData = await createLogin(email, password);

    dispatch(
      showSnackbar({
        message: 'Login Successfully...',
        type: 'success',
      }),
    );
    await new Promise((resolve) => setTimeout(resolve, 300));

  } catch (error) {
    dispatch(
      showSnackbar({
        message: error.message || 'Something Went Wrong',
        type: 'error',
      }),
    );
  } finally {
    setLoading(false);
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
      dispatch(
        showSnackbar({
          message: 'Logged in Successfully....',
          type: 'success',
        }),
      );
    } catch (error) {
      dispatch(
        showSnackbar({
          messgae: 'Something Went Wrong',
          type: 'error',
        }),
      );
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
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
                    <LoginIcon
                      width={spacing.hthirtySix}
                      height={spacing.hthirtySix}
                    />
                  </LinearGradient>
                </View>

                <View style={styles.headingText}>
                  <Text style={styles.title}>Welcome Back</Text>
                  <Text style={styles.subtitle} adjustsFontSizeToFit>
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
                <CustomButton
                  title="Sign In"
                  onPress={handleLogin}
                  loading={loading}
                />
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
                  <RedGlobe
                    width={spacing.hEighteen}
                    height={spacing.hEighteen}
                  />
                  <Text style={styles.socialText}>Google</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.socialButton}
                  activeOpacity={0.7}
                >
                  <BlackGlobe
                    width={spacing.hEighteen}
                    height={spacing.hEighteen}
                  />
                  <Text style={styles.socialText}>GitHub</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.createContainer}>
                <Text style={styles.accountText}>Don't have an account?</Text>
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  main: {
    flex: spacing.a,
    backgroundColor: colors.white,
  },
  keyboardView: {
    flex: spacing.a,
  },
  scrollContent: {
    flexGrow: spacing.a,
    paddingHorizontal: spacing.fifteen,
  },
  mainContainer: {
    width: spacing.fullWidth,
    alignItems: 'center',
  },
  firstContainer: {
    width: spacing.hTwoTen,
  },
  iconContainer: {
    alignItems: 'center',
    paddingTop: spacing.vthirty,
  },
  iconWrapper: {
    width: spacing.hSeventy,
    aspectRatio: spacing.a,
    marginBottom: spacing.vfifteen,
    backgroundColor: 'transparent',
    borderRadius: spacing.mtwentyFour,
    boxShadow: colors.btnShadow,
  },
  card: {
    width: spacing.fullWidth,
    paddingVertical: spacing.vtwenty,
    borderRadius: spacing.mtwentyFour,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  headingText: {
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.Bold,
    fontSize: spacing.mtwentyFive,
    textAlign: 'center',
    color: colors.VeryDarkSlateBlue,
  },
  subtitle: {
    fontFamily: Fonts.Regular,
    fontSize: spacing.mthirteen,
    color: colors.Dargrey,
    textAlign: 'center',
  },
  formContainer: {
    width: spacing.fullWidth,
    marginTop: spacing.vten,
  },
  forgetContainer: {
    justifyContent: 'center',
  },
  forget: {
    alignSelf: 'flex-end',
  },
  frgtTxt: {
    color: colors.primary,
    fontFamily: Fonts.Medium,
    fontSize: spacing.mthirteen,
  },
  btnContainer: {
    paddingTop: spacing.vtwenty,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.veight,
  },
  dividerLine: {
    flex: spacing.a,
    height: spacing.borderThin,
    backgroundColor: colors.LightGray,
  },
  dividerText: {
    paddingHorizontal: spacing.hten,
    color: colors.Dargrey,
    fontFamily: Fonts.Regular,
    fontSize: spacing.mthirteen,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: spacing.fullWidth,
    gap: spacing.htwelve,
  },
  socialButton: {
    flex: spacing.a,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: spacing.borderThin,
    borderColor: colors.LightGray,
    borderRadius: spacing.mtwentyFour,
    paddingVertical: spacing.vnine,
    paddingHorizontal: spacing.heights,
    backgroundColor: colors.white,
  },
  socialText: {
    marginLeft: spacing.hfour,
    fontFamily: Fonts.Bold,
    fontSize: spacing.mthirteen,
    color: colors.VeryDarkSlateBlue,
  },
  createContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.vfifteen,
  },
  accountText: {
    fontFamily: Fonts.Regular,
    fontSize: spacing.mthirteen,
    color: colors.Dargrey,
  },
  create: {
    paddingVertical: spacing.vfive,
  },
  createTxt: {
    color: colors.primary,
    fontFamily: Fonts.Bold,
    fontSize: spacing.mthirteen,
  },
});
