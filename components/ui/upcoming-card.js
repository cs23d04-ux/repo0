import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { gradeTypeLabel } from '@/utils/grade';

/**
 * Returns a color based on how urgent the deadline is.
 * 1 day  → red, 2-3 days → orange, 4-7 days → amber, 8+ days → blue
 */
function urgencyColor(daysLeft) {
  if (daysLeft <= 1) return '#EF4444';
  if (daysLeft <= 3) return '#F97316';
  if (daysLeft <= 7) return '#F59E0B';
  return '#3B82F6';
}

function daysLabel(daysLeft) {
  if (daysLeft === 0) return 'Today';
  if (daysLeft === 1) return 'Tomorrow';
  return `${daysLeft}d left`;
}

/**
 * Compact card for an upcoming deadline or exam.
 * Used exclusively on the Home screen's Upcoming section.
 * The left strip uses the subject accent color; the right badge
 * uses urgency color so students immediately see what needs attention.
 */
export function UpcomingCard({ upcoming, subject }) {
  const borderColor = useThemeColor({}, 'border');
  const color = urgencyColor(upcoming.daysLeft);

  return (
    <ThemedView style={[styles.card, { borderColor }]}>
      <View style={[styles.strip, { backgroundColor: subject.color }]} />
      <View style={styles.body}>
        <ThemedText style={styles.name} numberOfLines={1}>
          {upcoming.name}
        </ThemedText>
        <ThemedText style={styles.meta}>
          {subject.code} · {gradeTypeLabel(upcoming.type)}
        </ThemedText>
      </View>
      <View style={[styles.badge, { backgroundColor: color + '22', borderColor: color + '55' }]}>
        <ThemedText style={[styles.badgeText, { color }]}>{daysLabel(upcoming.daysLeft)}</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  strip: {
    width: 4,
    alignSelf: 'stretch',
  },
  body: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 11,
    gap: 2,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
  },
  meta: {
    fontSize: 12,
    opacity: 0.55,
  },
  badge: {
    marginRight: 12,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
