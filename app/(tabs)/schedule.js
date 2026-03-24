import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { mockSchedule, mockSubjects } from '@/data/mock';
import { useThemeColor } from '@/hooks/use-theme-color';

const DAYS_EN  = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAYS_MN  = ['Ням', 'Дав', 'Мяг', 'Лха', 'Пүр', 'Баа', 'Бям'];
const MONTHS_MN = [
  '1-р сар','2-р сар','3-р сар','4-р сар','5-р сар','6-р сар',
  '7-р сар','8-р сар','9-р сар','10-р сар','11-р сар','12-р сар',
];

const TYPE_LABEL = {
  lecture:  'Лекц',
  lab:      'Лаборатори',
  tutorial: 'Дасгал',
  seminar:  'Семинар',
};

const TYPE_ICON = {
  lecture:  'menu-book',
  lab:      'science',
  tutorial: 'edit-note',
  seminar:  'groups',
};

function getMondayWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  const offset = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + offset);
  return Array.from({ length: 7 }, (_, i) => {
    const w = new Date(d);
    w.setDate(d.getDate() + i);
    return w;
  });
}

export default function ScheduleScreen() {
  const today = new Date();
  const [selected, setSelected] = useState(today);

  const border  = useThemeColor({}, 'border');
  const muted   = useThemeColor({}, 'muted');
  const surface = useThemeColor({}, 'surface');

  const weekDays   = getMondayWeek(selected);
  const selectedEN = DAYS_EN[selected.getDay()];
  const subjectMap = Object.fromEntries(mockSubjects.map(s => [s.id, s]));

  const daySchedule = mockSchedule
    .filter(e => e.day === selectedEN)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const monthYear = `${MONTHS_MN[today.getMonth()]} ${today.getFullYear()}`;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>

      {/* ── Month header ── */}
      <View style={styles.monthRow}>
        <ThemedText style={styles.monthText}>{monthYear}</ThemedText>
      </View>

      {/* ── Week day selector ── */}
      <View style={[styles.weekRow, { borderBottomColor: border }]}>
        {weekDays.map((date, i) => {
          const isSelected = date.toDateString() === selected.toDateString();
          const isToday    = date.toDateString() === today.toDateString();
          const dayMn      = DAYS_MN[date.getDay()];

          return (
            <TouchableOpacity
              key={i}
              style={styles.dayBtn}
              onPress={() => setSelected(new Date(date))}>
              <ThemedText style={[styles.dayName, isSelected && styles.dayNameSel, { color: isSelected ? '#800020' : muted }]}>
                {dayMn}
              </ThemedText>
              <View style={[styles.dayCircle, isSelected && styles.dayCircleSel]}>
                <ThemedText style={[styles.dayNum, isSelected && styles.dayNumSel]}>
                  {date.getDate()}
                </ThemedText>
              </View>
              {isToday && !isSelected && (
                <View style={styles.todayDot} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ── Schedule list ── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}>

        {daySchedule.length === 0 ? (
          <View style={styles.empty}>
            <MaterialIcons name="event-available" size={48} color={muted} style={{ opacity: 0.4 }} />
            <ThemedText style={[styles.emptyTitle, { color: muted }]}>Хичээлгүй өдөр</ThemedText>
            <ThemedText style={[styles.emptySub, { color: muted }]}>Энэ өдөр ангид орохгүй 🎉</ThemedText>
          </View>
        ) : (
          daySchedule.map(entry => {
            const subject = subjectMap[entry.subjectId];
            return (
              <View key={entry.id} style={styles.entryRow}>
                {/* Time */}
                <ThemedText style={[styles.timeLabel, { color: muted }]}>
                  {entry.startTime}
                </ThemedText>

                {/* Card */}
                <ThemedView style={[styles.card, { borderColor: border, backgroundColor: surface }]}>
                  <View style={[styles.colorBar, { backgroundColor: subject.color }]} />
                  <View style={styles.cardBody}>
                    <ThemedText style={styles.cardTitle} numberOfLines={1}>
                      {subject.name}
                    </ThemedText>
                    <ThemedText style={[styles.cardSub, { color: muted }]}>
                      {TYPE_LABEL[entry.type]}
                    </ThemedText>
                    <View style={styles.cardMeta}>
                      <MaterialIcons name="access-time" size={13} color={muted} />
                      <ThemedText style={[styles.cardMetaText, { color: muted }]}>
                        {entry.startTime} – {entry.endTime}
                      </ThemedText>
                      <ThemedText style={[styles.cardMetaDot, { color: muted }]}>·</ThemedText>
                      <MaterialIcons name="room" size={13} color={muted} />
                      <ThemedText style={[styles.cardMetaText, { color: muted }]}>
                        {entry.room}
                      </ThemedText>
                    </View>
                  </View>
                </ThemedView>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:   { flex: 1 },

  // Month header
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 10,
    gap: 4,
  },
  monthText: {
    fontSize: 20,
    fontWeight: '800',
  },

  // Week selector
  weekRow: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  dayBtn: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  dayName: {
    fontSize: 11,
    fontWeight: '600',
  },
  dayNameSel: {
    fontWeight: '700',
  },
  dayCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircleSel: {
    backgroundColor: '#800020',
  },
  dayNum: {
    fontSize: 15,
    fontWeight: '600',
  },
  dayNumSel: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  todayDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#800020',
  },

  // List
  scroll: { flex: 1 },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 112,
    gap: 16,
  },

  // Entry row
  entryRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  timeLabel: {
    fontSize: 13,
    fontWeight: '600',
    width: 44,
    paddingTop: 14,
  },

  // Card
  card: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  colorBar: {
    width: 5,
  },
  cardBody: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  cardSub: {
    fontSize: 13,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  cardMetaText: {
    fontSize: 12,
  },
  cardMetaDot: {
    fontSize: 12,
    opacity: 0.4,
  },

  // Empty
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 8,
  },
  emptySub: {
    fontSize: 14,
  },
});
