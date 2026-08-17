import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import React, { useRef, useState } from 'react';
import VerificationIcon from '../assets/icons/VerificationIcon';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '../constants/colors';
import { Fonts } from '../constants/Fonts';
import { getFirestore } from '@react-native-firebase/firestore';
export default function VerificationScreen() {
  const route = useRoute();
const { uid, email, signInMethods, userProfile } = route.params || {};
console.log('Firebase Auth Sign-In Methods:', signInMethods);
  console.log('Firestore User Profile:', userProfile);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const navigation = useNavigation();
  const inputRefs = useRef([]);

  const handleChangeText = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-advance to the next input box
    if (text.length > 0 && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerification = async () => {
    const enteredCode = otp.join('').trim();

    if (enteredCode.length < 6) {
      Alert.alert('Error', 'please Enter All digits');
      return;
    }

    try {
      const otpDoc = await getFirestore().collection('otp').doc(uid).get();

      if (!otpDoc.exists) {
        Alert.alert('Verification Failed', 'No Otp Found');
        return;
      }

      // 5. Extract stored document data safely
      const data = otpDoc.data();
      const storedOtp = String(data?.otp || '').trim(); // Force string conversion for accurate comparison
      const expiresAt = Number(data?.expiresAt || 0);
      const currenTime = Date.now();
      if (otp === otpDoc) {
        navigation.navigate('NewPassword');
      }

      if (currenTime > expiresAt) {
        await getFirestore().collection('otp').doc(uid).delete();
        Alert.alert('Success!', 'OTP verified successfully.');
      }
      if (enteredCode !== storedOtp) {
        Alert.alert(
          'Invalid OTP',
          'The code you entered is incorrect. Please double-check and try again.',
        );
        return; // 👈 CRUCIAL: Stop execution if they don't match
      }

      await getFirestore().collection('otp').doc(uid).delete();

      Alert.alert('Success!', 'OTP verified successfully.', [
        {
          text: 'Continue',
          onPress: () => navigation.navigate('NewPassword', { uid, email }),
        },
      ]);
    } catch (error) {
      console.log('Error verifying OTP:', error);
      Alert.alert('Error', error?.message || 'Failed to verify OTP.');
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
            {/* Lock Icon */}
            <View style={styles.iconContainer}>
              <VerificationIcon width="100%" height="100%" />
            </View>

            {/* Heading */}
            <View style={styles.headingContainer}>
              <Text style={styles.headingTxt}>Enter OTP Code</Text>
            </View>

            {/* Subheading */}
            <View style={styles.subheading}>
              <Text style={styles.subheadingtxt}>
                We sent a 6-digit code to
              </Text>
            </View>

            {/* Form Fields & Buttons */}
            <View style={styles.formContainer}>
              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={ref => (inputRefs.current[index] = ref)}
                    style={[styles.otpBox, digit !== '' && styles.otpBoxFilled]}
                    value={digit}
                    onChangeText={text => handleChangeText(text, index)}
                    onKeyPress={e => handleKeyPress(e, index)}
                    keyboardType="number-pad"
                    maxLength={1}
                    selectTextOnFocus
                  />
                ))}
              </View>

              <View style={styles.buttonContainer}>
                <CustomButton
                  title="Verify OTP"
                  onPress={handleVerification}
                  textStyle={styles.fbtn}
                />
              </View>
              <View style={styles.resendcontainer}>
                <Text style={styles.backToSignTxt}>Didn't receive code ?</Text>

                <TouchableOpacity
                  style={styles.backToSignBtn}
                  activeOpacity={0.7}
                >
                  <Text style={styles.resendtxt}>Resend in</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '3%',
  },
  otpBox: {
    width: '14.5%',
    aspectRatio: 1,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: Fonts.Bold || 'System',
    color: '#2563EB',
    backgroundColor: '#FFFFFF',
  },
  otpBoxFilled: {
    borderColor: '#2563EB',
  },
  buttonContainer: {
    marginTop: '6%',
  },
  backToSignBtn: {
    alignItems: 'center',
  },
  backToSignTxt: {
    fontFamily: Fonts.Regular,
    fontSize: 12,
    color: '#6B7280',
  },
  fbtn: {
    fontFamily: Fonts.Bold,
    fontSize: 14,
  },
  resendcontainer: {
    paddingTop: '8%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendtxt: {
    color: '#2563EB',
    fontFamily: Fonts.SemiBold,
    fontSize: 14,
  },
});
