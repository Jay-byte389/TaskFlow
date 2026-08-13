import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../constants/colors';
import { Fonts } from '../constants/Fonts';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
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
              size={15}
              color={'#0F172A'} 
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
              color="#94A3B8"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: '4%',
  },
  label: {
    fontFamily: Fonts.Bold,
    fontSize: 12,
    color: '#64748B',
    marginBottom: '2%',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: '4%',
    paddingVertical: '3.5%',
  },
  iconWrapper: {
    marginRight: '3%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeBtn: {
    paddingLeft: '3%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: Fonts.Regular,
    color: '#0F172A',
    padding: 0,
  },
});