import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
}

/**
 * Reusable section title row with an optional right-aligned action button.
 * Used at the top of every major content section across all screens.
 */
export function SectionHeader({ title, subtitle, actionLabel, onAction }: SectionHeaderProps) {
  const primaryColor = useThemeColor({}, 'primary');

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <ThemedText style={styles.title}>{title}</ThemedText>
        {subtitle != null && (
          <ThemedText style={styles.subtitle}>{subtitle}</ThemedText>
        )}
      </View>
      {actionLabel != null && onAction != null && (
        <TouchableOpacity onPress={onAction} hitSlop={8}>
          <ThemedText style={[styles.action, { color: primaryColor }]}>{actionLabel}</ThemedText>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  left: {
    flex: 1,
    gap: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 13,
    opacity: 0.55,
  },
  action: {
    fontSize: 14,
    fontWeight: '600',
  },
});
