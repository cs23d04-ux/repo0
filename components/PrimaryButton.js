import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function PrimaryButton({ label, onPress, loading = false, style }) {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      style={[styles.button, loading && styles.buttonDisabled, animStyle, style]}
      onPress={onPress}
      onPressIn={() => { scale.value = withSpring(0.97, { damping: 20, stiffness: 300 }); }}
      onPressOut={() => { scale.value = withSpring(1, { damping: 20, stiffness: 300 }); }}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator color="#fff" size="small" />
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 14,
    backgroundColor: '#800020',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#800020',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.3,
  },
});
