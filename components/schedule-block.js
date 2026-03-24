import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

const CLASS_TYPE_LABEL = {
  lecture:  'Лекц',
  lab:      'Лаборатори',
  tutorial: 'Дасгал',
  seminar:  'Семинар',
};

const CLASS_TYPE_ICON = {
  lecture:  'menu-book',
  lab:      'science',
  tutorial: 'edit-note',
  seminar:  'groups',
};

export function ScheduleBlock({ entry, subject }) {
  const borderColor = useThemeColor({}, 'border');
  const muted       = useThemeColor({}, 'muted');
  const surface     = useThemeColor({}, 'surface');

  const icon  = CLASS_TYPE_ICON[entry.type] ?? 'class';
  const label = CLASS_TYPE_LABEL[entry.type];

  return (
    <ThemedView style={[styles.card, { borderColor, backgroundColor: surface }]}>
      {/* Left icon */}
      <View style={[styles.iconWrap, { backgroundColor: subject.color + '18' }]}>
        <MaterialIcons name={icon} size={20} color={subject.color} />
      </View>

      {/* Content */}
      <View style={styles.body}>
        <ThemedText style={[styles.typeLabel, { color: muted }]}>{label}</ThemedText>
        <ThemedText style={styles.subjectName} numberOfLines={1}>{subject.name}</ThemedText>
        <ThemedText style={[styles.meta, { color: muted }]}>
          {entry.startTime} – {entry.endTime} · {entry.room}
        </ThemedText>
      </View>

      {/* Color dot */}
      <View style={[styles.dot, { backgroundColor: subject.color }]} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    gap: 2,
  },
  typeLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  subjectName: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
  },
  meta: {
    fontSize: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    alignSelf: 'center',
  },
});
