import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { colors } from '../constants/colors';
import { Fonts } from '../constants/Fonts';

export default function CustomButton({
  title,
  onPress,
  icon,
  loading = false,
  disabled = false,
  style,
  textStyle,
  disabledtxt,button
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,button,
        disabled && styles.disabledButton,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" size="small" />
      ) : (
        <View style={styles.contentContainer}>
          <Text style={[styles.text, textStyle,disabledtxt]}>{title}</Text>
          {icon && (
            <View style={styles.iconWrapper}>
              <FontAwesomeIcon icon={icon} size={16} color="#FFFFFF" />
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: '4%',
    borderRadius: 16,
    backgroundColor: colors?.primary ,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2%',

    boxShadow: '0px 8px 16px 0px rgba(59, 130, 246, 0.35)',
    
  },
  disabledButton: {
    backgroundColor: '#E2E8F0',
    boxShadow: 'none',
    
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: Fonts?.Bold || 'System',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  iconWrapper: {
    marginLeft: '3%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});