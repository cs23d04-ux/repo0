export type SubjectStatus = 'studying' | 'studied';

export type GradeType = 'attendance' | 'assignment' | 'quiz' | 'midterm' | 'final';

export type LetterGrade =
  | 'A+'
  | 'A'
  | 'A-'
  | 'B+'
  | 'B'
  | 'B-'
  | 'C+'
  | 'C'
  | 'C-'
  | 'D+'
  | 'D'
  | 'F';

export type DayOfWeek = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

export type ClassType = 'lecture' | 'lab' | 'tutorial' | 'seminar';

export interface Student {
  id: string;
  name: string;
  studentId: string;
  avatar?: string;
  gpa: number;
  year: number;
  major: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  teacher: string;
  credits: number;
  status: SubjectStatus;
  /** Accent hex color for this subject card/block */
  color: string;
  semester: string;
}

export interface Grade {
  id: string;
  subjectId: string;
  type: GradeType;
  name: string;
  score: number;
  maxScore: number;
  /** Weight as a percentage (0–100) in the overall grade */
  weight: number;
  date: string; // ISO date string
}

export interface ScheduleEntry {
  id: string;
  subjectId: string;
  day: DayOfWeek;
  startTime: string; // "HH:MM"
  endTime: string; // "HH:MM"
  room: string;
  type: ClassType;
}

/** Subject enriched with computed grade info, for display in grades screens */
export interface SubjectWithGrade extends Subject {
  overallScore: number; // 0–1 ratio
  letter: LetterGrade;
}
