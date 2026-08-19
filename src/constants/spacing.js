import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// 390 is your design baseline width (e.g., iPhone 13/14)
const scale = (size) => (SCREEN_WIDTH / 390) * size;

export const spacing = {
  fullWidth: "100%",
  eightyWidth: "80%",
  bottom: -40,
  LH: 32,
  ms: 5,
  a: 1,
  s: 30,
  // OnBoardingScreen specific
  aa: 0.5,
  pdH: 20,
  brd: 28,
  one: "1%",
  two: "2%",
  three: "3%",
  four: "4%",
  five: "5%",
  six: "6%",
  seven: "7%",
  eight: "8%",
  nine: "9%",
  // Note: 's' was defined twice in your original object, keeping your original '10%' string:
  // s: "10%",

  m: "20%",
  lg: "30%",
  halfWidth: '48%',

  xx: scale(7.36),

  splashIconSize: 150,
  splashMarginBottom: -40,
  subheadingTop: 0,
};