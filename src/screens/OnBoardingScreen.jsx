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
                  <OnboardingIcon1 width={50} height={50} />
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
                  <OnboardingIcon2 width={50} height={50} />
                </View>
              ),
              title: 'Collaborate With Your\n Team',
              subtitle: 'Assign tasks, share files, and keep everyone aligned.',
            },
            {
              backgroundColor: colors.white,
              image: (
                <View style={styles.thirdiconCard}>
                  <OnboardingIcon3 width={50} height={50} />
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
              <FontAwesomeIcon icon={faLongArrowRight} color={colors.white} size={16} />
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
    paddingHorizontal: '5%',
    justifyContent: 'flex-start',
    paddingTop: '60%',
  },
  imageContainer: {
    paddingBottom: '3%',
  },

  // Icon Cards with pure % width and aspect ratio
  iconCard: {
    width: '36%',
    aspectRatio: 1,
    backgroundColor: colors.IndigoIconBg,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  secondiconCard: {
    width: '36%',
    aspectRatio: 1,
    backgroundColor: colors.PurpleIconBg,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: colors.PurpleIcon,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  thirdiconCard: {
    width: '36%',
    aspectRatio: 1,
    backgroundColor: colors.LowGreenBg,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: colors.LowGreenText,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },

  skipbtn: {
    position: 'absolute',
    top: '4%',
    right: '5%',
    zIndex: 10,
    padding: '2%',
  },
  skipTxt: {
    color: colors.Dargrey,
    fontSize: 15,
    fontFamily: Fonts.Medium || 'System',
  },

  // Responsive Button Wrapper
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '5%',
  },
  continueButton: {
    width: '88%',
    paddingVertical: '3.8%',
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  txtcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueText: {
    color: colors.white,
    fontFamily: Fonts.Bold || 'System',
    fontSize: 16,
  },
  arrowWrapper: {
    marginLeft: '2.5%',
    justifyContent: 'center',
  },

  title: {
    fontFamily: Fonts.Bold || 'System',
    fontSize: 24,
    color: colors.VeryDarkSlateBlue,
    textAlign: 'center',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 14,
    color: colors.MutedSlateGray,
    textAlign: 'center',
    paddingHorizontal: '3%',
    lineHeight: 20,
    marginTop: '1%',
  },

  dot: {
    height: 6,
    borderRadius: 3,
    marginHorizontal: '1%',
    marginBottom: '4%',
  },
  activeDot: {
    width: 24,
    backgroundColor: colors.primary,
  },
  inactiveDot: {
    width: 6,
    backgroundColor: colors.LightGray,
  },
});