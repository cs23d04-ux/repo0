import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { GradeBar } from '@/components/ui/grade-bar';
import { StatusBadge } from '@/components/ui/status-badge';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { scoreToLetter } from '@/utils/grade';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function SubjectCard({ subject, overallScore, onPress }) {
  const router = useRouter();
  const borderColor = useThemeColor({}, 'border');
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  function handlePressIn() {
    scale.value = withSpring(0.975, { damping: 20, stiffness: 300 });
  }

  function handlePressOut() {
    scale.value = withSpring(1, { damping: 20, stiffness: 300 });
  }

  const letter = overallScore !== undefined
    ? scoreToLetter(Math.round(overallScore * 100), 100)
    : undefined;

  function handlePress() {
    if (onPress) onPress();
    else router.push(`/subject/${subject.id}`);
  }

  return (
    <AnimatedPressable
      style={animStyle}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <ThemedView style={[styles.card, { borderColor }]}>
        <View style={[styles.accentStrip, { backgroundColor: subject.color }]} />
        <View style={styles.body}>
          <View style={styles.header}>
            <View style={styles.titleBlock}>
              <ThemedText style={styles.name} numberOfLines={2}>
                {subject.name}
              </ThemedText>
              <ThemedText style={styles.meta}>
                {subject.code} · {subject.credits} кредит
              </ThemedText>
            </View>
            <StatusBadge status={subject.status} size="sm" />
          </View>
          <ThemedText style={styles.teacher}>{subject.teacher}</ThemedText>
          {overallScore !== undefined && letter !== undefined && (
            <View style={styles.gradeRow}>
              <GradeBar
                score={Math.round(overallScore * 100)}
                maxScore={100}
                letter={letter}
                height={6}
              />
            </View>
          )}
        </View>
      </ThemedView>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
  },
  accentStrip: {
    width: 4,
  },
  body: {
    flex: 1,
    padding: 14,
    gap: 6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  titleBlock: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
  },
  meta: {
    fontSize: 12,
    opacity: 0.55,
  },
  teacher: {
    fontSize: 13,
    opacity: 0.65,
  },
  gradeRow: {
    marginTop: 4,
  },
});
