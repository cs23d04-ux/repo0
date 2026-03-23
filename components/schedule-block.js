import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

const CLASS_TYPE_LABEL = {
  lecture: 'Lecture',
  lab: 'Lab',
  tutorial: 'Tutorial',
  seminar: 'Seminar',
};

export function ScheduleBlock({ entry, subject }) {
  const borderColor = useThemeColor({}, 'border');

  return (
    <ThemedView style={[styles.block, { borderColor }]}>
      <View style={[styles.colorBar, { backgroundColor: subject.color }]} />
      <View style={styles.content}>
        <View style={styles.top}>
          <ThemedText style={styles.name} numberOfLines={1}>
            {subject.name}
          </ThemedText>
          <View style={[styles.typeBadge, { backgroundColor: subject.color + '22' }]}>
            <ThemedText style={[styles.typeLabel, { color: subject.color }]}>
              {CLASS_TYPE_LABEL[entry.type]}
            </ThemedText>
          </View>
        </View>
        <View style={styles.meta}>
          <ThemedText style={styles.metaText}>
            {entry.startTime} – {entry.endTime}
          </ThemedText>
          <ThemedText style={styles.separator}>·</ThemedText>
          <ThemedText style={styles.metaText}>{entry.room}</ThemedText>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  colorBar: {
    width: 4,
  },
  content: {
    flex: 1,
    padding: 12,
    gap: 4,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  name: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  typeLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  meta: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    opacity: 0.6,
  },
  separator: {
    fontSize: 12,
    opacity: 0.35,
  },
});
