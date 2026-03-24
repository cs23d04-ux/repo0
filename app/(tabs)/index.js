import { ScrollView, StyleSheet, View } from 'react-native';
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

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  if (h < 21) return 'Good evening';
  return 'Good night';
}

export default function HomeScreen() {
  const border = useThemeColor({}, 'border');
  const muted = useThemeColor({}, 'muted');
  const primary = useThemeColor({}, 'primary');
  const surface = useThemeColor({}, 'surface');

  const today = DAYS[new Date().getDay()];
  const subjectMap = Object.fromEntries(mockSubjects.map(s => [s.id, s]));

  const todaySchedule = mockSchedule
    .filter(e => e.day === today)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const studyingSubjects = mockSubjects.filter(s => s.status === 'studying');
  const totalCredits = studyingSubjects.reduce((sum, s) => sum + s.credits, 0);

  const urgentUpcoming = mockUpcoming.slice(0, 3);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>

        {/* ── Greeting ── */}
        <View style={styles.header}>
          <ThemedText style={[styles.greetText, { color: muted }]}>{getGreeting()} 👋</ThemedText>
          <ThemedText style={styles.nameText}>{mockStudent.name}</ThemedText>
          <ThemedText style={[styles.metaText, { color: muted }]}>
            {mockStudent.studentId} · Year {mockStudent.year} · {mockStudent.major}
          </ThemedText>
        </View>

        {/* ── Stats ── */}
        <View style={styles.statsRow}>
          <ThemedView style={[styles.statCard, { borderColor: border }]}>
            <ThemedText style={[styles.statLabel, { color: muted }]}>GPA</ThemedText>
            <ThemedText style={[styles.statValue, { color: primary }]}>
              {mockStudent.gpa.toFixed(1)}
            </ThemedText>
            <ThemedText style={[styles.statSub, { color: muted }]}>/ 4.0</ThemedText>
          </ThemedView>

          <ThemedView style={[styles.statCard, { borderColor: border }]}>
            <ThemedText style={[styles.statLabel, { color: muted }]}>Credits</ThemedText>
            <ThemedText style={[styles.statValue, { color: primary }]}>{totalCredits}</ThemedText>
            <ThemedText style={[styles.statSub, { color: muted }]}>
              {studyingSubjects.length} subjects
            </ThemedText>
          </ThemedView>

          <ThemedView style={[styles.statCard, { borderColor: border }]}>
            <ThemedText style={[styles.statLabel, { color: muted }]}>Year</ThemedText>
            <ThemedText style={[styles.statValue, { color: primary }]}>{mockStudent.year}</ThemedText>
            <ThemedText style={[styles.statSub, { color: muted }]}>of 4</ThemedText>
          </ThemedView>
        </View>

        {/* ── Upcoming deadlines ── */}
        <View style={styles.section}>
          <SectionHeader
            title="Upcoming"
            subtitle="Deadlines & exams"
            actionLabel="See all"
            onAction={() => {}}
          />
          <View style={styles.list}>
            {urgentUpcoming.map(item => (
              <UpcomingCard
                key={item.id}
                upcoming={item}
                subject={subjectMap[item.subjectId]}
              />
            ))}
          </View>
        </View>

        {/* ── Today's schedule ── */}
        <View style={styles.section}>
          <SectionHeader title="Today" subtitle={today} />
          {todaySchedule.length > 0 ? (
            <View style={styles.list}>
              {todaySchedule.map(entry => (
                <ScheduleBlock
                  key={entry.id}
                  entry={entry}
                  subject={subjectMap[entry.subjectId]}
                />
              ))}
            </View>
          ) : (
            <ThemedView style={[styles.emptyDay, { backgroundColor: surface, borderColor: border }]}>
              <ThemedText style={[styles.emptyDayText, { color: muted }]}>
                No classes today 🎉
              </ThemedText>
            </ThemedView>
          )}
        </View>

        {/* ── Currently studying ── */}
        <View style={styles.section}>
          <SectionHeader
            title="Studying"
            subtitle="This semester"
            actionLabel="See all"
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

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { flex: 1 },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 24,
  },

  // Greeting
  header: {
    paddingTop: 16,
    gap: 3,
  },
  greetText: {
    fontSize: 15,
  },
  nameText: {
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
  },
  metaText: {
    fontSize: 13,
    marginTop: 2,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
    gap: 1,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 28,
  },
  statSub: {
    fontSize: 11,
  },

  // Sections
  section: { gap: 12 },
  list: { gap: 8 },

  // Empty day
  emptyDay: {
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 18,
    alignItems: 'center',
  },
  emptyDayText: { fontSize: 14 },
});
