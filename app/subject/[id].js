import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScoreCard } from '@/components/ui/score-card';
import { StatusBadge } from '@/components/ui/status-badge';
import { GradeBar } from '@/components/ui/grade-bar';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { mockGrades, mockSchedule, mockSubjects } from '@/data/mock';
import { useThemeColor } from '@/hooks/use-theme-color';
import { computeOverallScore, gradeTypeLabel, scoreToLetter } from '@/utils/grade';

const DAYS_MN = { Mon: 'Даваа', Tue: 'Мягмар', Wed: 'Лхагва', Thu: 'Пүрэв', Fri: 'Баасан', Sat: 'Бямба', Sun: 'Ням' };
const TYPE_MN  = { lecture: 'Лекц', lab: 'Лаборатори', tutorial: 'Дасгал', seminar: 'Семинар' };

export default function SubjectDetailScreen() {
  const { id } = useLocalSearchParams();
  const router  = useRouter();
  const border  = useThemeColor({}, 'border');
  const muted   = useThemeColor({}, 'muted');
  const surface = useThemeColor({}, 'surface');

  const subject  = mockSubjects.find(s => s.id === id);
  const grades   = mockGrades.filter(g => g.subjectId === id);
  const schedule = mockSchedule.filter(e => e.subjectId === id)
    .sort((a, b) => {
      const order = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
      return order.indexOf(a.day) - order.indexOf(b.day);
    });

  if (!subject) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ThemedText>Хичээл олдсонгүй</ThemedText>
      </SafeAreaView>
    );
  }

  const overall = grades.length > 0 ? computeOverallScore(grades) : null;
  const letter  = overall !== null ? scoreToLetter(Math.round(overall * 100), 100) : null;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>

        {/* ── Header ── */}
        <View style={[styles.header, { borderBottomColor: border }]}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <MaterialIcons name="arrow-back-ios" size={20} color={subject.color} />
          </TouchableOpacity>
          <View style={[styles.colorDot, { backgroundColor: subject.color }]} />
          <View style={styles.headerText}>
            <ThemedText style={styles.headerCode}>{subject.code}</ThemedText>
            <ThemedText style={styles.headerName} numberOfLines={2}>{subject.name}</ThemedText>
          </View>
          <StatusBadge status={subject.status} size="sm" />
        </View>

        {/* ── Info row ── */}
        <View style={[styles.infoRow, { backgroundColor: surface, borderColor: border }]}>
          <View style={styles.infoItem}>
            <MaterialIcons name="person" size={16} color={muted} />
            <ThemedText style={[styles.infoText, { color: muted }]}>{subject.teacher}</ThemedText>
          </View>
          <View style={[styles.infoDivider, { backgroundColor: border }]} />
          <View style={styles.infoItem}>
            <MaterialIcons name="school" size={16} color={muted} />
            <ThemedText style={[styles.infoText, { color: muted }]}>{subject.credits} кредит</ThemedText>
          </View>
          <View style={[styles.infoDivider, { backgroundColor: border }]} />
          <View style={styles.infoItem}>
            <MaterialIcons name="calendar-today" size={16} color={muted} />
            <ThemedText style={[styles.infoText, { color: muted }]}>{subject.semester}</ThemedText>
          </View>
        </View>

        {/* ── Overall grade ── */}
        {overall !== null && (
          <ThemedView style={[styles.card, { borderColor: border }]}>
            <ThemedText style={styles.sectionTitle}>Нийт дүн</ThemedText>
            <GradeBar
              score={Math.round(overall * 100)}
              maxScore={100}
              letter={letter}
              height={10}
              animated
            />
          </ThemedView>
        )}

        {/* ── Grades ── */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Дүнгийн жагсаалт</ThemedText>
          {grades.length === 0 ? (
            <ThemedView style={[styles.emptyBox, { backgroundColor: surface, borderColor: border }]}>
              <ThemedText style={[styles.emptyText, { color: muted }]}>Дүн байхгүй байна</ThemedText>
            </ThemedView>
          ) : (
            <View style={styles.list}>
              {grades.map(g => <ScoreCard key={g.id} grade={g} />)}
            </View>
          )}
        </View>

        {/* ── Schedule ── */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Хичээлийн цагийн хуваарь</ThemedText>
          {schedule.length === 0 ? (
            <ThemedView style={[styles.emptyBox, { backgroundColor: surface, borderColor: border }]}>
              <ThemedText style={[styles.emptyText, { color: muted }]}>Хуваарь байхгүй байна</ThemedText>
            </ThemedView>
          ) : (
            <View style={styles.list}>
              {schedule.map(entry => (
                <ThemedView key={entry.id} style={[styles.scheduleCard, { borderColor: border, backgroundColor: surface }]}>
                  <View style={[styles.scheduleBar, { backgroundColor: subject.color }]} />
                  <View style={styles.scheduleBody}>
                    <ThemedText style={styles.scheduleDay}>{DAYS_MN[entry.day]}</ThemedText>
                    <ThemedText style={[styles.scheduleTime, { color: muted }]}>
                      {entry.startTime} – {entry.endTime}
                    </ThemedText>
                  </View>
                  <View style={[styles.typePill, { backgroundColor: subject.color + '20' }]}>
                    <ThemedText style={[styles.typeText, { color: subject.color }]}>
                      {TYPE_MN[entry.type]}
                    </ThemedText>
                  </View>
                  <ThemedText style={[styles.scheduleRoom, { color: muted }]}>{entry.room}</ThemedText>
                </ThemedView>
              ))}
            </View>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:    { flex: 1 },
  content: { paddingBottom: 112 },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 10,
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    alignItems: 'center', justifyContent: 'center',
  },
  colorDot: {
    width: 12, height: 12, borderRadius: 6,
  },
  headerText: { flex: 1, gap: 2 },
  headerCode: { fontSize: 12, opacity: 0.55, fontWeight: '500' },
  headerName: { fontSize: 17, fontWeight: '800', lineHeight: 22 },

  // Info row
  infoRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  infoItem: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 5, justifyContent: 'center' },
  infoText: { fontSize: 12, fontWeight: '500' },
  infoDivider: { width: 1, height: 24 },

  // Card
  card: {
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },

  // Section
  section: { marginHorizontal: 16, marginTop: 24, gap: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700' },
  list: { gap: 8 },

  emptyBox: {
    borderRadius: 12, borderWidth: 1,
    paddingVertical: 18, alignItems: 'center',
  },
  emptyText: { fontSize: 14 },

  // Schedule card
  scheduleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    gap: 12,
    paddingRight: 14,
  },
  scheduleBar:  { width: 4, alignSelf: 'stretch' },
  scheduleBody: { flex: 1, paddingVertical: 12, gap: 2 },
  scheduleDay:  { fontSize: 14, fontWeight: '700' },
  scheduleTime: { fontSize: 12 },
  typePill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  typeText: { fontSize: 11, fontWeight: '600' },
  scheduleRoom: { fontSize: 12, minWidth: 60, textAlign: 'right' },
});
