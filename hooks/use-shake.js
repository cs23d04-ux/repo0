import { useRef } from 'react';
import { Animated } from 'react-native';

/**
 * Returns a shake animation value and trigger function.
 * Used with React Native's Animated.View translateX for form error feedback.
 *
 * Usage:
 *   const { shakeAnim, shake } = useShake();
 *   <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
 *     ...
 *   </Animated.View>
 *   // Call shake() when validation fails
 */
export default function useShake() {
  const shakeAnim = useRef(new Animated.Value(0)).current;

  function shake() {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 12,  duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -12, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 8,   duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8,  duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 4,   duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0,   duration: 50, useNativeDriver: true }),
    ]).start();
  }

  return { shakeAnim, shake };
}
