import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Fonts } from '../constants/Fonts';

const Header = ({
  title = '',
  showBack = false,
  onBackPress,
  rightIcon,
  onRightPress,
  RightIconComponent = Ionicons,
  isMainScreen = false,
  isDestructive = false, // Set true for red action buttons 
}) => {
  const navigation = useNavigation();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const rightIconColor = isMainScreen
    ? '#FFFFFF'
    : isDestructive
    ? '#EF4444'
    : '#0F172A';
  return (
    <View style={styles.container}>
      {/* Left Section */}
      <View style={styles.leftSection}>
        {showBack ? (
          <TouchableOpacity
            style={styles.backcircleIconButton}
            activeOpacity={0.7}
            onPress={handleBack}
          >
            <Ionicons name="arrow-back" size={20} color="#0F172A" />
          </TouchableOpacity>
        ) : (
          <Text style={styles.mainTitle} numberOfLines={1}>
            {title}
          </Text>
        )}
      </View>

      {/* Center Section (Centered Title when showBack is true) */}
      {showBack && title ? (
        <View style={styles.centerSection}>
          <Text style={styles.subTitle} numberOfLines={1}>
            {title}
          </Text>
        </View>
      ) : null}

      {/* Right Section */}
      <View style={styles.rightSection}>
        {rightIcon ? (
          <TouchableOpacity
            style={[
              styles.circleIconButton,
              isMainScreen && styles.primaryCircleButton,
              isDestructive && styles.destructiveCircleButton, 
            ]}
            activeOpacity={0.8}
            onPress={onRightPress}
          >
            <RightIconComponent
              name={rightIcon}
              size={isMainScreen ? 22 : 18}
              color={rightIconColor}
            />
          </TouchableOpacity>
        ) : (
          /* Empty placeholder to ensure center title stays perfectly balanced */
          showBack && <View style={styles.placeholder} />
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '4%',
    backgroundColor: '#FFFFFF',
  },
  leftSection: {
    minWidth: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSection: {
    minWidth: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  mainTitle: {
    fontSize: 20,
    fontFamily:Fonts.Bold,
    color: '#111827',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  backcircleIconButton:{
     width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9', // Light gray background
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9', // Light gray background
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryCircleButton: {
    backgroundColor: '#2563EB', // Blue fill for add button
    elevation: 4,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  destructiveCircleButton: {
    backgroundColor: '#FEE2E2', // Light red background for delete button
  },
  placeholder: {
    width: 40,
  },
});