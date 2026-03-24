import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScheduleBlock } from '@/components/schedule-block';
import { SubjectCard } from '@/components/subject-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { SectionHeader } from '@/components/ui/section-header';
import { UpcomingCard } from '@/components/ui/upcoming-card';
import { mockGrades, mockSchedule, mockStudent, mockSubjects, mockUpcoming } from '@/data/mock';
import { useThemeColor } from '@/hooks/use-theme-color';
import { computeOverallScore } from '@/utils/grade';

const ACCENT = '#800020';
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Өглөөний мэнд';
  if (h < 17) return 'Өдрийн мэнд';
  if (h < 21) return 'Оройн мэнд';
  return 'Шөнийн мэнд';
}

export default function HomeScreen() {
  const border  = useThemeColor({}, 'border');
  const muted   = useThemeColor({}, 'muted');
  const surface = useThemeColor({}, 'surface');

  const today = DAYS[new Date().getDay()];
  const subjectMap = Object.fromEntries(mockSubjects.map(s => [s.id, s]));

  const todaySchedule = mockSchedule
    .filter(e => e.day === today)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const studyingSubjects = mockSubjects.filter(s => s.status === 'studying');
  const totalCredits = studyingSubjects.reduce((sum, s) => sum + s.credits, 0);
  const urgentUpcoming = mockUpcoming.slice(0, 3);
  const initial = mockStudent.name.charAt(0).toUpperCase();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>

        <View style={styles.topBar}>
          <View>
            <ThemedText style={[styles.greeting, { color: muted }]}>{getGreeting()} 👋</ThemedText>
            <ThemedText style={styles.name}>{mockStudent.name}</ThemedText>
          </View>
          <View style={styles.topActions}>
            <TouchableOpacity style={[styles.iconBtn, { borderColor: border }]} onPress={() => {}}>
              <MaterialIcons name="notifications-none" size={22} color={muted} />
              <View style={styles.notifDot} />
            </TouchableOpacity>
            <View style={styles.avatar}>
              <ThemedText style={styles.avatarText}>{initial}</ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.sections}>
          <View style={styles.section}>
            <SectionHeader title="Өнөөдрийн хичээл" subtitle={today} />
            {todaySchedule.length > 0 ? (
              <View style={styles.list}>
                {todaySchedule.map(entry => (
                  <ScheduleBlock key={entry.id} entry={entry} subject={subjectMap[entry.subjectId]} />
                ))}
              </View>
            ) : (
              <ThemedView style={[styles.emptyDay, { backgroundColor: surface, borderColor: border }]}>
                <ThemedText style={[styles.emptyText, { color: muted }]}>Өнөөдөр хичээлгүй 🎉</ThemedText>
              </ThemedView>
            )}
          </View>
          <View style={styles.section}>
            <SectionHeader
              title="Ойрын хугацаа"
              subtitle="Даалгавар & шалгалт"
              actionLabel="Бүгд"
              onAction={() => {}}
            />
            <View style={styles.list}>
              {urgentUpcoming.map(item => (
                <UpcomingCard key={item.id} upcoming={item} subject={subjectMap[item.subjectId]} />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <SectionHeader
              title="Судалж буй хичээлүүд"
              subtitle="Энэ улирал"
              actionLabel="Бүгд"
              onAction={() => {}}
            />
            <View style={styles.list}>
              {studyingSubjects.map(subject => {
                const grades = mockGrades.filter(g => g.subjectId === subject.id);
                const overall = computeOverallScore(grades);
                return (
                  <SubjectCard
                    key={subject.id}
                    subject={subject}
                    overallScore={grades.length > 0 ? overall : undefined}
                  />
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:    { flex: 1 },
  scroll:  { flex: 1 },
  content: { paddingBottom: 112 },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  greeting:   { fontSize: 13, fontWeight: '400' },
  name:       { fontSize: 22, fontWeight: '800', lineHeight: 28, marginTop: 1 },
  topActions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconBtn: {
    width: 38, height: 38, borderRadius: 19,
    borderWidth: 1, alignItems: 'center', justifyContent: 'center',
  },
  notifDot: {
    position: 'absolute', top: 7, right: 7,
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: '#EF4444', borderWidth: 1.5, borderColor: '#fff',
  },
  avatar: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: ACCENT, alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontSize: 16, fontWeight: '700' },

  infoCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  accentBar:       { width: 5, backgroundColor: ACCENT },
  infoBody:        { flex: 1, paddingHorizontal: 14, paddingVertical: 14, gap: 12 },
  infoRow:         { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  infoLeft:        { gap: 2 },
  majorText:       { fontSize: 15, fontWeight: '700' },
  idText:          { fontSize: 12 },
  courseBadge:     { backgroundColor: ACCENT + '18', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  courseBadgeText: { fontSize: 12, fontWeight: '600', color: ACCENT },
  dividerH:        { height: 1 },
  statsRow:        { flexDirection: 'row', alignItems: 'center' },
  stat:            { flex: 1, alignItems: 'center', gap: 2 },
  statVal:         { fontSize: 20, fontWeight: '800' },
  statLabel:       { fontSize: 10, fontWeight: '500' },
  dividerV:        { width: 1, height: 32, marginHorizontal: 4 },

  sections:  { paddingHorizontal: 20, paddingTop: 24, gap: 24 },
  section:   { gap: 12 },
  list:      { gap: 8 },
  emptyDay:  { borderRadius: 12, borderWidth: 1, paddingVertical: 20, alignItems: 'center' },
  emptyText: { fontSize: 14 },
});
