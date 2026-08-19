import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../constants/colors';
import { Fonts } from '../constants/Fonts';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import { spacing } from '../constants/spacing';
import { vs } from 'react-native-size-matters';
export default function Input({
  value,
  icon, // Pass icon name string (e.g. "user", "envelope")
  label,
  onChangeText,
  placeholder,
  placeholderTextColor,
  keyboardType,
  secureTextEntry,
  containerStyle,
  isPassword = false,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isSecure = isPassword ? !showPassword : secureTextEntry;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputWrapper}>
        
        {icon && (
          <View style={styles.iconWrapper}>
            <Ionicons
              name={icon} 
              size={18}
              color={colors.TailwindGray} 
              solid 
            />
          </View>
        )}

        <TextInput
          key={isPassword ? (showPassword ? 'text' : 'password') : 'input'} 
          value={value}
          style={styles.input}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          keyboardType={keyboardType}
          secureTextEntry={isSecure}
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
    fontFamily: Fonts.Bold,
    fontSize: 12,
    color: colors.MutedSlateGray,
    marginBottom: spacing.two,
    textTransform: 'uppercase',
    letterSpacing: spacing.aa,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:colors.OffWhite,
    borderWidth: spacing.a,
    borderColor: colors.LightGray,
    borderRadius: 22,
    paddingHorizontal: spacing.four,
    paddingVertical: vs(10),
  },
  iconWrapper: {
    marginRight: spacing.three,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeBtn: {
    paddingLeft: spacing.three,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: spacing.a,
    fontSize: 14,
    fontFamily: Fonts.Regular,
    color:colors.black,
    padding: 0,
  },
});