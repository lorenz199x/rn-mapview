import React, { forwardRef, PropsWithChildren, useImperativeHandle, useState } from 'react';
import {
  SafeAreaView,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { screenHeight } from '@/utils/sizes';
import { timing } from '@/utils/timing';

interface BottomSheetProps {
  /**
   * The height of the bottomsheet
   */
  screenSize?:
    | 0.1
    | 0.15
    | 0.2
    | 0.25
    | 0.3
    | 0.35
    | 0.4
    | 0.45
    | 0.5
    | 0.55
    | 0.6
    | 0.65
    | 0.7
    | 0.75
    | 0.8
    | 0.85
    | 0.9
    | 0.95
    | 1;

  /**
   * A custom container style.
   */
  customContainerStyle?: StyleProp<ViewStyle>;

  /**
   * A function that will trigger after closing of the bottomsheet.
   */
  onClose?: () => void;

  /**
   * A boolean that will disabled the backdrop back function.
   */
  disableOnClose?: boolean;

  /**
   * If this true, we can click the backdrop.
   */
  noBackDrop?: boolean;
}

export interface BottomSheetRef {
  openBottomSheet(): void;
  closeBottomSheet(): void;
}

/**
 * A custom bottomsheet made from reanimated.
 *
 * @type {Component}
 * @returns {React.FC}
 */
const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps & PropsWithChildren>(
  (
    {
      children,
      customContainerStyle,
      onClose,
      screenSize = 0.8,
      disableOnClose = false,
      noBackDrop = false,
    },
    ref
  ) => {
    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const height = screenHeight * screenSize;
    const offset = useSharedValue(height);

    const openBottomSheet = () => {
      setShowBottomSheet(true);
      offset.value = timing(0, 500);
    };

    const closeBottomSheet = () => {
      offset.value = timing(height, 500);
      onClose?.();
      setTimeout(() => {
        setShowBottomSheet(false);
      }, 500);
    };

    useImperativeHandle(ref, () => ({
      openBottomSheet,
      closeBottomSheet,
    }));

    const animatedStyles = useAnimatedStyle(() => ({
      height: height,
      transform: [{ translateY: offset.value }],
    }));

    if (!showBottomSheet) {
      return null;
    }

    if (noBackDrop) {
      return (
        <View style={styles.noBackdropContainer}>
          <Animated.View
            style={[animatedStyles, styles.animatedViewContainer, customContainerStyle]}
          >
            <TouchableOpacity activeOpacity={1} onPress={() => {}} style={styles.childrenContainer}>
              {children}
            </TouchableOpacity>
          </Animated.View>
        </View>
      );
    }

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={disableOnClose ? () => {} : closeBottomSheet}
        style={[StyleSheet.absoluteFillObject]}
      >
        <SafeAreaView style={styles.container}>
          <Animated.View
            style={[animatedStyles, styles.animatedViewContainer, customContainerStyle]}
          >
            <TouchableOpacity activeOpacity={1} onPress={() => {}} style={styles.childrenContainer}>
              {children}
            </TouchableOpacity>
          </Animated.View>
        </SafeAreaView>
      </TouchableOpacity>
    );
  }
);

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    flex: 1,
  },
  childrenContainer: {
    flex: 1,
  },
  noBackdropContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  animatedViewContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopEndRadius: 25,
  },
});
