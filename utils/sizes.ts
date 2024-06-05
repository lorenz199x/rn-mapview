import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const screenHeight = height;
export const screenWidth = width;

/** this is baseline from ip14 */
export const guidelineBaseWidth = 390;
export const guidelineBaseHeight = 844;

export const horizontalScale = (size: number) => (screenWidth / guidelineBaseWidth) * size;
export const verticalScale = (size: number) => (screenHeight / guidelineBaseHeight) * size;
export const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;
