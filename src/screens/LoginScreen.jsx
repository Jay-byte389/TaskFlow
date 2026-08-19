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
import {
  getAuth,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import { signInWithGoogle } from '../services/googleSign';
import { getFirestore, doc, getDoc } from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../redux/slice/snackBarSlice';
import { ms,s,vs } from 'react-native-size-matters';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const gradientColors = [colors.primary, colors.secondary];

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please Enter the email and Password');
      return;
    }
    setLoading(true);
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

        dispatch(
          showSnackbar({
            message: 'Login SuccessFully...',
            type: 'success',
          }),
        );
        // navigation.replace('BottomTabs', {
        //   screen: 'Home',
        //   params: { userData },
        // });
      } else {
        setLoading(false);
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
    } catch (error) {}
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
                    <LoginIcon width={36} height={36} />
                  </LinearGradient>
                </View>

                <View style={styles.headingText}>
                  <Text style={styles.title}>Welcome Back</Text>
                  <Text style={styles.subtitle}adjustsFontSizeToFit>
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
                <CustomButton title="Sign In" onPress={handleLogin}  loading={loading}/>
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

                <TouchableOpacity
                  style={styles.socialButton}
                  activeOpacity={0.7}
                >
                  <BlackGlobe width={18} height={18} />
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
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: ms(15),
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  firstContainer: {
    width: ms(210),
  },
  iconContainer: {
    alignItems: 'center',
    paddingTop: 30,
  },
  iconWrapper: {
    width: 70,
    aspectRatio: spacing.a,
    marginBottom: 15,
    backgroundColor: 'transparent',
    borderRadius: 24,
    boxShadow: colors.btnShadow,
  },
  card: {
    width: spacing.fullWidth,
    paddingVertical:20,
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
    color: colors.VeryDarkSlateBlue,
  },
  subtitle: {
    fontFamily: Fonts.Regular,
    fontSize: ms(13),
    color: colors.Dargrey,
    textAlign: 'center',
  },
  formContainer: {
    width: spacing.fullWidth,
    marginTop: vs(10),
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
    fontSize: 13,
  },
  btnContainer: {
    paddingTop: vs(20),
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: vs(8),
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.LightGray,
  },
  dividerText: {
    paddingHorizontal: s(10),
    color: colors.Dargrey,
    fontFamily: Fonts.Regular,
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
    borderWidth: spacing.a,
    borderColor: colors.LightGray,
    borderRadius: 24,
    paddingVertical: vs(9),
    backgroundColor: colors.white,
  },
  socialText: {
    marginLeft: s(8),
    fontFamily: Fonts.Bold,
    fontSize: 14,
    color: colors.VeryDarkSlateBlue,
  },
  createContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: vs(15),
  },
  accountText: {
    fontFamily: Fonts.Regular,
    fontSize: 13,
    color: colors.Dargrey,
  },
  create: {
    paddingVertical: vs(5),
  },
  createTxt: {
    color: colors.primary,
    fontFamily: Fonts.Bold,
    fontSize: 13,
  },
});