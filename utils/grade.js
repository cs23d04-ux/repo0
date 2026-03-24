import { GradeColors } from '@/constants/theme';

/** Convert a raw score to a letter grade. */
export function scoreToLetter(score, maxScore) {
  const pct = (score / maxScore) * 100;
  if (pct >= 97) return 'A+';
  if (pct >= 93) return 'A';
  if (pct >= 90) return 'A-';
  if (pct >= 87) return 'B+';
  if (pct >= 83) return 'B';
  if (pct >= 80) return 'B-';
  if (pct >= 77) return 'C+';
  if (pct >= 73) return 'C';
  if (pct >= 70) return 'C-';
  if (pct >= 67) return 'D+';
  if (pct >= 60) return 'D';
  return 'F';
}

/** Get the semantic color for a letter grade. */
export function getLetterColor(letter) {
  if (letter.startsWith('A')) return GradeColors.A;
  if (letter.startsWith('B')) return GradeColors.B;
  if (letter.startsWith('C')) return GradeColors.C;
  if (letter.startsWith('D')) return GradeColors.D;
  return GradeColors.F;
}

/**
 * Compute an overall weighted score ratio (0–1) from a list of grades.
 * Uses each grade's weight field as the percentage contribution.
 */
export function computeOverallScore(grades) {
  if (grades.length === 0) return 0;
  const totalWeight = grades.reduce((sum, g) => sum + g.weight, 0);
  if (totalWeight === 0) return 0;
  const weighted = grades.reduce(
    (sum, g) => sum + (g.score / g.maxScore) * g.weight,
    0,
  );
  return weighted / totalWeight;
}

/** Human-readable label for a grade type. */
export function gradeTypeLabel(type) {
  const labels = {
    attendance: 'Ирц',
    assignment: 'Даалгавар',
    quiz: 'Тест',
    midterm: 'Явцын шалгалт',
    final: 'Улирлын шалгалт',
  };
  return labels[type];
}

/** Convert a GPA (0–4) to a letter grade. */
export function gpaToLetter(gpa) {
  if (gpa >= 4.0) return 'A+';
  if (gpa >= 3.7) return 'A';
  if (gpa >= 3.3) return 'A-';
  if (gpa >= 3.0) return 'B+';
  if (gpa >= 2.7) return 'B';
  if (gpa >= 2.3) return 'B-';
  if (gpa >= 2.0) return 'C+';
  if (gpa >= 1.7) return 'C';
  if (gpa >= 1.3) return 'C-';
  if (gpa >= 1.0) return 'D';
  return 'F';
}
