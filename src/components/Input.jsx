import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../constants/colors';
import { Fonts } from '../constants/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';
import { vs } from 'react-native-size-matters';

export default function Input({
  value,
  icon,
  label,
  onChangeText,
  placeholder,
  placeholderTextColor,
  keyboardType,
  secureTextEntry,
  containerStyle,
  isPassword = false,
  numberofLines, // Handles legacy typo if passed
  numberOfLines,  // Standard React Native prop
  multiline,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isSecure = isPassword ? !showPassword : secureTextEntry;

  // Determine line count and multiline mode
  const lines = numberOfLines || numberofLines || 1;
  const isMultiline = multiline || lines > 1;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputWrapper, isMultiline && styles.multilineWrapper]}>
        
        {icon && (
          <View style={[styles.iconWrapper, isMultiline && styles.multilineIcon]}>
            <Ionicons
              name={icon} 
              size={18}
              color={colors.TailwindGray} 
            />
          </View>
        )}

        <TextInput
          key={isPassword ? (showPassword ? 'text' : 'password') : 'input'} 
          value={value}
          style={[styles.input, isMultiline && { height: vs(20 * lines), minHeight: vs(50) }]}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          keyboardType={keyboardType}
          secureTextEntry={isSecure}
          multiline={isMultiline}
          numberOfLines={lines}
          textAlignVertical={isMultiline ? 'top' : 'center'}
          {...props}
        />

        {isPassword && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeBtn}
          >
            <Ionicons
              name={showPassword ? 'eye-outline' : 'eye-off-outline'} 
              size={16}
              color={colors.SlateGrayText}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: spacing.fullWidth,
    marginBottom: spacing.four,
  },
  label: {
    fontFamily: Fonts.SemiBold,
    fontSize: typography.m,
    color: colors.MutedSlateGray,
    marginBottom: spacing.two,
    textTransform: 'uppercase',
    letterSpacing: spacing.aa,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.OffWhite,
    borderWidth: spacing.borderThin,
    borderColor: colors.LightGray,
    borderRadius: spacing.mtwentyTwo,
    paddingHorizontal: spacing.four,
    paddingVertical: vs(10),
  },
  multilineWrapper: {
    alignItems: 'flex-start', // Allows input to stretch vertically
  },
  iconWrapper: {
    marginRight: spacing.three,
    justifyContent: 'center',
    alignItems: 'center',
  },
  multilineIcon: {
    marginTop: vs(4),
  },
  eyeBtn: {
    paddingLeft: spacing.three,
    justify: 'center',
    alignItems: 'center',
  },
  input: {
    flex: spacing.a,
    fontSize: typography.lg,
    fontFamily: Fonts.Regular,
    color: colors.black,
    padding: 0,
  },
});