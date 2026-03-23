import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { SubjectStatus } from '@/types';

interface StatusBadgeProps {
  status: SubjectStatus;
  size?: 'sm' | 'md';
}

/**
 * Pill badge showing whether a subject is currently being studied or already completed.
 * Used in SubjectCard, subject detail headers, and grade rows.
 */
export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const scheme = useColorScheme() ?? 'light';
  const color = status === 'studying' ? Colors[scheme].studying : Colors[scheme].studied;

  return (
    <View
      style={[
        styles.badge,
        size === 'sm' && styles.badgeSm,
        { backgroundColor: color + '22', borderColor: color + '66' },
      ]}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <ThemedText style={[styles.label, size === 'sm' && styles.labelSm, { color }]}>
        {status === 'studying' ? 'Studying' : 'Studied'}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  badgeSm: {
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },
  labelSm: {
    fontSize: 11,
    lineHeight: 16,
  },
});
