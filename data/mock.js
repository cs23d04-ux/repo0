export const mockStudent = {
  id: '1',
  name: 'Alex Johnson',
  studentId: '2024001234',
  gpa: 3.7,
  year: 2,
  major: 'Computer Science',
};

export const mockSubjects = [
  {
    id: 's1',
    name: 'Data Structures & Algorithms',
    code: 'CS201',
    teacher: 'Prof. Kim',
    credits: 3,
    status: 'studying',
    color: '#6366F1',
    semester: '2024 Spring',
  },
  {
    id: 's2',
    name: 'Linear Algebra',
    code: 'MATH202',
    teacher: 'Prof. Park',
    credits: 3,
    status: 'studying',
    color: '#EC4899',
    semester: '2024 Spring',
  },
  {
    id: 's3',
    name: 'Object-Oriented Programming',
    code: 'CS202',
    teacher: 'Prof. Shin',
    credits: 3,
    status: 'studying',
    color: '#3B82F6',
    semester: '2024 Spring',
  },
  {
    id: 's4',
    name: 'Introduction to Programming',
    code: 'CS101',
    teacher: 'Prof. Lee',
    credits: 3,
    status: 'studied',
    color: '#10B981',
    semester: '2023 Fall',
  },
  {
    id: 's5',
    name: 'Calculus I',
    code: 'MATH101',
    teacher: 'Prof. Choi',
    credits: 4,
    status: 'studied',
    color: '#F59E0B',
    semester: '2023 Fall',
  },
  {
    id: 's6',
    name: 'Physics I',
    code: 'PHY101',
    teacher: 'Prof. Yoon',
    credits: 3,
    status: 'studied',
    color: '#8B5CF6',
    semester: '2023 Fall',
  },
];

export const mockGrades = [
  // CS201
  { id: 'g1', subjectId: 's1', type: 'assignment', name: 'Assignment 1', score: 92, maxScore: 100, weight: 15, date: '2024-03-05' },
  { id: 'g2', subjectId: 's1', type: 'quiz', name: 'Quiz 1', score: 18, maxScore: 20, weight: 10, date: '2024-03-12' },
  { id: 'g3', subjectId: 's1', type: 'midterm', name: 'Midterm Exam', score: 78, maxScore: 100, weight: 35, date: '2024-04-01' },
  // MATH202
  { id: 'g4', subjectId: 's2', type: 'assignment', name: 'Problem Set 1', score: 85, maxScore: 100, weight: 20, date: '2024-03-07' },
  { id: 'g5', subjectId: 's2', type: 'midterm', name: 'Midterm Exam', score: 88, maxScore: 100, weight: 40, date: '2024-04-03' },
  // CS202
  { id: 'g6', subjectId: 's3', type: 'assignment', name: 'Project 1', score: 96, maxScore: 100, weight: 25, date: '2024-03-20' },
  { id: 'g7', subjectId: 's3', type: 'quiz', name: 'Quiz 1', score: 9, maxScore: 10, weight: 10, date: '2024-03-10' },
  // CS101 (studied)
  { id: 'g8', subjectId: 's4', type: 'midterm', name: 'Midterm Exam', score: 90, maxScore: 100, weight: 30, date: '2023-10-20' },
  { id: 'g9', subjectId: 's4', type: 'final', name: 'Final Exam', score: 95, maxScore: 100, weight: 50, date: '2023-12-18' },
  // MATH101 (studied)
  { id: 'g10', subjectId: 's5', type: 'midterm', name: 'Midterm Exam', score: 68, maxScore: 100, weight: 30, date: '2023-10-18' },
  { id: 'g11', subjectId: 's5', type: 'final', name: 'Final Exam', score: 72, maxScore: 100, weight: 50, date: '2023-12-15' },
  // PHY101 (studied)
  { id: 'g12', subjectId: 's6', type: 'midterm', name: 'Midterm Exam', score: 82, maxScore: 100, weight: 30, date: '2023-10-22' },
  { id: 'g13', subjectId: 's6', type: 'final', name: 'Final Exam', score: 79, maxScore: 100, weight: 50, date: '2023-12-20' },
];

export const mockSchedule = [
  { id: 'sc1', subjectId: 's1', day: 'Mon', startTime: '09:00', endTime: '10:30', room: 'Room 301', type: 'lecture' },
  { id: 'sc2', subjectId: 's1', day: 'Wed', startTime: '09:00', endTime: '10:30', room: 'Room 301', type: 'lecture' },
  { id: 'sc3', subjectId: 's2', day: 'Tue', startTime: '11:00', endTime: '12:30', room: 'Room 202', type: 'lecture' },
  { id: 'sc4', subjectId: 's2', day: 'Thu', startTime: '11:00', endTime: '12:30', room: 'Room 202', type: 'lecture' },
  { id: 'sc5', subjectId: 's3', day: 'Mon', startTime: '14:00', endTime: '15:30', room: 'Lab 101', type: 'lab' },
  { id: 'sc6', subjectId: 's3', day: 'Fri', startTime: '10:00', endTime: '11:30', room: 'Room 405', type: 'lecture' },
  { id: 'sc7', subjectId: 's1', day: 'Fri', startTime: '14:00', endTime: '15:00', room: 'Lab 203', type: 'tutorial' },
  { id: 'sc8', subjectId: 's3', day: 'Tue', startTime: '14:00', endTime: '15:30', room: 'Room 405', type: 'lecture' },
];

/** Upcoming deadlines and exams — sorted by daysLeft ascending */
export const mockUpcoming = [
  { id: 'u1', subjectId: 's3', type: 'quiz',       name: 'Quiz 2',         dueDate: '2026-03-25', daysLeft: 1 },
  { id: 'u2', subjectId: 's2', type: 'assignment',  name: 'Problem Set 2',  dueDate: '2026-03-26', daysLeft: 2 },
  { id: 'u3', subjectId: 's1', type: 'assignment',  name: 'Assignment 2',   dueDate: '2026-03-27', daysLeft: 3 },
  { id: 'u4', subjectId: 's1', type: 'midterm',     name: 'Midterm Exam',   dueDate: '2026-03-31', daysLeft: 7 },
  { id: 'u5', subjectId: 's2', type: 'midterm',     name: 'Midterm Exam',   dueDate: '2026-04-02', daysLeft: 9 },
];
