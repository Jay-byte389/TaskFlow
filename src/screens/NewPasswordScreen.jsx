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
import { Fonts } from '../constants/Fonts';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import functions from '@react-native-firebase/functions';

const ResetPasswordScreen = ({ route, navigation }) => {
  const email = route?.params?.email || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Dynamic Password Validation Checks
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumberOrSymbol = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);



  const handleResetPassword =()=>{

  }


  return (
    <SafeAreaView style={styles.main}>
      <Header title="New Password" />

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
            {/* Green Shield Icon */}
            <View style={styles.iconContainer}>
              <View style={styles.iconCircle}>
                <Ionicons name="shield-checkmark-outline" size={36} color="#10B981" />
              </View>
            </View>

            {/* Title */}
            <Text style={styles.headingTxt}>Create New Password</Text>

            {/* Subtitle */}
            <Text style={styles.subheadingTxt}>
              Must be different from previously used passwords.
            </Text>

            {/* Inputs Container */}
            <View style={styles.formContainer}>
              <Input
                label="NEW PASSWORD"
                value={password}
                onChangeText={setPassword}
                placeholder="********"
                icon="lock-closed-outline"
                isPassword={true}
                placeholderTextColor={colors.Dargrey }
              />

              <Input
                label="CONFIRM PASSWORD"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="********"
                icon="lock-closed-outline"
                isPassword={true}
                placeholderTextColor={colors.Dargrey }
              />

              <View style={styles.requirementsCard}>
                <View style={styles.requirementRow}>
                  <Ionicons
                    name={hasMinLength ? 'checkmark-circle-outline' : 'ellipse-outline'}
                    size={18}
                    color={hasMinLength ? '#10B981' : '#94A3B'}
                  />
                  <Text
                    style={[
                      styles.requirementText,
                      hasMinLength && styles.requirementTextActive,
                    ]}
                  >
                    At least 8 characters
                  </Text>
                </View>

                <View style={styles.requirementRow}>
                  <Ionicons
                    name={hasUppercase ? 'checkmark-circle-outline' : 'ellipse-outline'}
                    size={18}
                    color={hasUppercase ? '#10B981' : '#94A3B8'}
                  />
                  <Text
                    style={[
                      styles.requirementText,
                      hasUppercase && styles.requirementTextActive,
                    ]}
                  >
                    One uppercase letter
                  </Text>
                </View>

                <View style={styles.requirementRow}>
                  <Ionicons
                    name={hasNumberOrSymbol ? 'checkmark-circle-outline' : 'ellipse-outline'}
                    size={18}
                    color={hasNumberOrSymbol ? '#10B981' : '#94A3B8'}
                  />
                  <Text
                    style={[
                      styles.requirementText,
                      hasNumberOrSymbol && styles.requirementTextActive,
                    ]}
                  >
                    One number or symbol
                  </Text>
                </View>
              </View>

              {/* Reset Password Button */}
              <View style={styles.buttonContainer}>
                <CustomButton
                  title={loading ? 'Resetting...' : 'Reset Password'}
                  onPress={handleResetPassword}
                  disabled={loading}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;

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
    paddingTop: '6%',
    alignItems: 'center',
    paddingHorizontal: '6%',
  },
  iconContainer: {
    marginBottom: '5%',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E6F4EA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingTxt: {
    fontFamily: Fonts.Bold ,
    fontSize: 22,
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: '1.5%',
  },
  subheadingTxt: {
    fontFamily: Fonts.Regular ,
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: '6%',
  },
  formContainer: {
    width: '100%',
  },
  requirementsCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: '5%',
    marginTop: '2%',
    marginBottom: '8%',
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '1.5%',
  },
  requirementText: {
    fontFamily: Fonts.Regular ,
    fontSize: 13,
    color: '#94A3B8',
    marginLeft: '3%',
  },
  requirementTextActive: {
    color: '#10B981',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: '5%',
  },
});