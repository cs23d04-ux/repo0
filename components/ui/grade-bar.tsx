import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import type { LetterGrade } from '@/types';
import { getLetterColor, scoreToLetter } from '@/utils/grade';

interface GradeBarProps {
  score: number;
  maxScore: number;
  /** Provide a pre-computed letter to avoid re-computing. */
  letter?: LetterGrade;
  showLabel?: boolean;
  animated?: boolean;
  height?: number;
}

/**
 * Horizontal progress bar showing a score as a filled track.
 * Displays a letter grade and numeric score alongside the bar.
 * Animates in on mount by default (uses react-native-reanimated).
 * Used in SubjectCard, subject detail, and grades overview.
 */
export function GradeBar({
  score,
  maxScore,
  letter,
  showLabel = true,
  animated = true,
  height = 8,
}: GradeBarProps) {
  const computedLetter = letter ?? scoreToLetter(score, maxScore);
  const fillColor = getLetterColor(computedLetter);
  const trackColor = useThemeColor({}, 'border');
  const percentage = Math.min(Math.max(score / maxScore, 0), 1);

  const progress = useSharedValue(animated ? 0 : percentage);

  useEffect(() => {
    if (animated) {
      progress.value = withTiming(percentage, {
        duration: 800,
        easing: Easing.out(Easing.cubic),
      });
    }
  }, [percentage, animated, progress]);

  const animatedFill = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%` as `${number}%`,
  }));

  return (
    <View style={styles.container}>
      <View style={[styles.track, { backgroundColor: trackColor, height, borderRadius: height / 2 }]}>
        <Animated.View
          style={[
            styles.fill,
            animatedFill,
            { backgroundColor: fillColor, height, borderRadius: height / 2 },
          ]}
        />
      </View>
      {showLabel && (
        <View style={styles.labels}>
          <ThemedText style={[styles.letter, { color: fillColor }]}>{computedLetter}</ThemedText>
          <ThemedText style={styles.score}>
            {score}/{maxScore}
          </ThemedText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  track: {
    overflow: 'hidden',
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  letter: {
    fontSize: 13,
    fontWeight: '700',
  },
  score: {
    fontSize: 12,
    opacity: 0.55,
  },
});
