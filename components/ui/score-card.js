import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { getLetterColor, gradeTypeLabel, scoreToLetter } from '@/utils/grade';

export function ScoreCard({ grade }) {
  const letter = scoreToLetter(grade.score, grade.maxScore);
  const letterColor = getLetterColor(letter);
  const borderColor = useThemeColor({}, 'border');
  const pct = Math.round((grade.score / grade.maxScore) * 100);

  return (
    <ThemedView style={[styles.card, { borderColor }]}>
      <View style={styles.left}>
        <ThemedText style={styles.name} numberOfLines={1}>
          {grade.name}
        </ThemedText>
        <ThemedText style={styles.meta}>
          {gradeTypeLabel(grade.type)} · Жин {grade.weight}%
        </ThemedText>
      </View>
      <View style={styles.right}>
        <ThemedText style={[styles.letter, { color: letterColor }]}>{letter}</ThemedText>
        <ThemedText style={styles.pct}>{pct}%</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  left: {
    flex: 1,
    gap: 2,
    paddingRight: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
  },
  meta: {
    fontSize: 12,
    opacity: 0.55,
  },
  right: {
    alignItems: 'flex-end',
    gap: 1,
  },
  letter: {
    fontSize: 18,
    fontWeight: '700',
  },
  pct: {
    fontSize: 11,
    opacity: 0.55,
  },
});
