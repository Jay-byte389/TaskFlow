import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import React, { useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import { Fonts } from '../constants/Fonts';
import {spacing} from "../constants/spacing";
import SplashIcon from '../assets/icons/spalshiconsvg.svg';
import { useNavigation } from '@react-navigation/native';
const image = require('../assets/images/Container.png');

export default function SplashScreen() {
  const navigation=useNavigation();
  useEffect(() => {
      const timer= setTimeout(() => {
          navigation.navigate("OnBoarding");
      },3000 );
      return ()=>clearTimeout(timer);
  }, [navigation])
  



  return (
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <SafeAreaView style={styles.imageContainer}>
        <ImageBackground
          source={image}
          style={styles.bgImageStyle}
          resizeMode="cover"
        >
          <View style={styles.contentCenterWrapper}>
            <View style={styles.imagescontainer}>
              {/* Make the icon fill the red container or match dimensions */}
              <SplashIcon width={150} height={150} />
            </View>
            <View style={styles.txtContainer}>
              <Text style={styles.headingText}>TaskFlow</Text>
              <Text style={styles.subheadingtxt}>Manage. Build. Deliver</Text>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: spacing.flex,
  },
  imageContainer: {
    flex: spacing.flex,
    width: '100%',
  },
  bgImageStyle: {
    flex: spacing.flex,
    width: spacing.fullWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentCenterWrapper: {
    alignItems: 'center',
    width: spacing.eightyWidth,
  },
  imagescontainer: {  
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.bottom,
  },
  txtContainer: { 
    alignItems: 'center',
  },
  headingText: {
    fontFamily: Fonts.ExtraBold,
    fontSize: typography.heading,
    color: colors.white,
    lineHeight: spacing.LH,
    textAlign: 'center',
  },
  subheadingtxt: {
    paddingTop: spacing.s,
    color: colors.subHeading,
    textAlign: 'center',
    fontFamily: Fonts.Medium,
    fontSize: typography.subheading,
  },
});