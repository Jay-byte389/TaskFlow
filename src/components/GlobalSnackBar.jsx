import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, Animated, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { hideSnackbar } from '../redux/slice/snackBarSlice';

const { width } = Dimensions.get('window');

const GlobalSnackbar = () => {
  const dispatch = useDispatch();
  const { visible, message, type } = useSelector((state) => state.snackbar);

  // 1. Start OFF-SCREEN to the RIGHT (+width)
  const translateX = useRef(new Animated.Value(width)).current;

  useEffect(() => {
    if (visible) {
      // 2. Slide IN from Right (+width) to Center because in 2d canvas layout represents the original or  resiting position of element on the screen so 0 is the center 
      Animated.timing(translateX, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }).start();

      // 3. Display timer: Auto-dismiss after 3 seconds
      const timer = setTimeout(() => {
        dismissSnackbar();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const dismissSnackbar = () => {
    // 4. Slide OUT from Center (0) to LEFT (-width)
    Animated.timing(translateX, {
      toValue: -width,
      duration: 350,
      useNativeDriver: true,
    }).start(() => {
      translateX.setValue(width); // 5. Reset off-screen back to RIGHT (+width)
      dispatch(hideSnackbar());
    });
  };

  if (!visible) return null;

  const backgroundColor = type === 'error' ? '#EF4444' : '#2ae609';

  return (
    <Animated.View style={[styles.snackbar, { backgroundColor, transform: [{ translateX }] }]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

export default GlobalSnackbar;

const styles = StyleSheet.create({
  snackbar: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    zIndex: 9999,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});