import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Fonts } from '../constants/Fonts';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../constants/colors';

const Header = ({ title }) => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <View >
      <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <FontAwesomeIcon icon={faArrowLeft} size={16} color="#000000" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightSpacer} />
      </View>
      <View style={styles.dividerContainer}>
      <View style={styles.dividerLine}/>
      </View>
    </View>
    
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '4%',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: ("10%"),
    paddingVertical:("5%"),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.Bold,
    fontSize: 18,
    color: '#0F172A',
    textAlign: 'center',
  },
  rightSpacer: {
    width: 40,
  },
  dividerContainer:{
    paddingTop:("2%"),
  },
  dividerLine: {
    height: 1,
    backgroundColor: '#E2E8F0',
  },
});
