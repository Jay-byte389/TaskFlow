import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Onboarding from 'react-native-onboarding-swiper';
import OnboardingIcon1 from '../assets/icons/Onboarding1.svg';
import OnboardingIcon2 from '../assets/icons/Onboarding2.svg';
import OnboardingIcon3 from '../assets/icons/Onboarding3.svg';
import { Fonts } from '../constants/Fonts';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../constants/colors';
import { spacing } from '../constants/spacing';

const CustomDot = ({ selected }) => (
  <View style={[styles.dot, selected ? styles.activeDot : styles.inactiveDot]} />
);

const OnBoardingScreen = () => {
  const onboardingRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();
  const isLastPage = currentIndex === 2;

  const handleNext = () => {
    if (isLastPage) {
      navigation.replace('Login');
    } else {
      onboardingRef.current?.goNext();
    }
  };

  const handleSkip = () => {
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header Skip Button */}
      <TouchableOpacity style={styles.skipbtn} activeOpacity={0.7} onPress={handleSkip}>
        <Text style={styles.skipTxt}>Skip</Text>
      </TouchableOpacity>

      {/* Swiper View */}
      <View style={styles.swiperContainer}>
        <Onboarding
          ref={onboardingRef}
          showSkip={false}
          showNext={false}
          showDone={false}
          pageIndexCallback={(index) => setCurrentIndex(index)}
          DotComponent={CustomDot}
          bottomBarHighlight={false}
          bottomBarColor="transparent"
          containerStyles={styles.onboardingContainer}
          imageContainerStyles={styles.imageContainer}
          titleStyles={styles.title}
          subTitleStyles={styles.subtitle}
          pages={[
            {
              backgroundColor: colors.white,
              image: (
                <View style={styles.iconCard}>
                  <OnboardingIcon1 width={spacing.hFifty} height={spacing.hFifty} />
                </View>
              ),
              title: 'Manage Projects\nEffortlessly',
              subtitle:
                'Organize work into projects with smart prioritization and real-time progress tracking.',
            },
            {
              backgroundColor: colors.white,
              image: (
                <View style={styles.secondiconCard}>
                  <OnboardingIcon2 width={spacing.hFifty} height={spacing.hFifty} />
                </View>
              ),
              title: 'Collaborate With Your\n Team',
              subtitle: 'Assign tasks, share files, and keep everyone aligned.',
            },
            {
              backgroundColor: colors.white,
              image: (
                <View style={styles.thirdiconCard}>
                  <OnboardingIcon3 width={spacing.hFifty} height={spacing.hFifty} />
                </View>
              ),
              title: 'Track Progess & Analytics',
              subtitle: 'Get Powerful insights with charts and reports to\nkeep every project on schedule ',
            },
          ]}
        />
      </View>

      {/* Separate Bottom Button Container */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.continueButton}
          activeOpacity={0.8}
          onPress={handleNext}
        >
          <View style={styles.txtcontainer}>
            <Text style={styles.continueText}>
              {isLastPage ? 'Get Started' : 'Continue'}
            </Text>
            <View style={styles.arrowWrapper}>
              <FontAwesomeIcon icon={faLongArrowRight} color={colors.white} size={spacing.msixteen} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: spacing.a,
    backgroundColor: colors.white,
  },
  swiperContainer: {
    flex: spacing.a,
  },
  onboardingContainer: {
    paddingHorizontal: spacing.vten,
    justifyContent: 'flex-start',
    paddingTop: spacing.Onboarding,
  },
  imageContainer: {
    paddingBottom: spacing.vfive,
  },

  // Icon Cards with scaled sizes and border radius
  iconCard: {
    width: spacing.hEighty,
    aspectRatio: spacing.a,
    backgroundColor: colors.IndigoIconBg,
    borderRadius: spacing.mTwentyEight,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: spacing.vfour },
    shadowOpacity: 0.08,
    shadowRadius: spacing.heights,
  },
  secondiconCard: {
    width: spacing.hEighty,
    aspectRatio: spacing.a,
    backgroundColor: colors.PurpleIconBg,
    borderRadius: spacing.mTwentyEight,
    justify: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: colors.PurpleIcon,
    shadowOffset: { width: 0, height: spacing.vfour },
    shadowOpacity: 0.08,
    shadowRadius: spacing.heights,
  },
  thirdiconCard: {
    width: spacing.hEighty,
    aspectRatio: spacing.a,
    backgroundColor: colors.LowGreenBg,
    borderRadius: spacing.mTwentyEight,
    justify: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: colors.LowGreenText,
    shadowOffset: { width: 0, height: spacing.vfour },
    shadowOpacity: 0.08,
    shadowRadius: spacing.heights,
  },

  skipbtn: {
    position: 'absolute',
    top: spacing.vtwenty,
    right: spacing.htwenty,
    zIndex: 10,
    padding: spacing.heights,
  },
  skipTxt: {
    color: colors.Dargrey,
    fontSize: spacing.mfifteen,
    fontFamily: Fonts.Medium,
  },

  // Responsive Button Wrapper
  buttonWrapper: {
    width: spacing.fullWidth,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: spacing.vfifteen,
  },
  continueButton: {
    width: '88%',
    paddingVertical: spacing.vEleven,
    borderRadius: spacing.msixteen,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: spacing.vfour },
    shadowOpacity: 0.3,
    shadowRadius: spacing.heights,
  },
  txtcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueText: {
    color: colors.white,
    fontFamily: Fonts.Bold,
    fontSize: spacing.msixteen,
  },
  arrowWrapper: {
    marginLeft: spacing.hfive,
    justifyContent: 'center',
  },

  title: {
    fontFamily: Fonts.Bold,
    fontSize: spacing.mtwentyFour,
    color: colors.VeryDarkSlateBlue,
    textAlign: 'center',
    lineHeight: spacing.LH,
  },
  subtitle: {
    fontSize: spacing.mfourteen,
    color: colors.MutedSlateGray,
    textAlign: 'center',
    paddingHorizontal: spacing.hfive,
    lineHeight: spacing.lhTwenty,
    marginTop: spacing.vtwo,
  },

  dot: {
    height: spacing.vsix,
    borderRadius: spacing.vthree,
  },
  activeDot: {
    width: spacing.hTwentyFive,
    backgroundColor: colors.primary,
  },
  inactiveDot: {
    width: spacing.heights,
    backgroundColor: colors.LightGray,
  },
});