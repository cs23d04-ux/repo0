import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    // App-specific tokens
    surface: '#F8F9FA',
    border: '#E9ECEF',
    muted: '#6C757D',
    primary: '#0a7ea4',
    success: '#2DB87D',
    warning: '#F59E0B',
    danger: '#EF4444',
    studying: '#3B82F6',
    studied: '#2DB87D',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    // App-specific tokens
    surface: '#1E2122',
    border: '#2D3436',
    muted: '#9BA1A6',
    primary: '#38BDF8',
    success: '#34D399',
    warning: '#FBBF24',
    danger: '#F87171',
    studying: '#60A5FA',
    studied: '#34D399',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

// Semantic grade colors — same in both light and dark
export const GradeColors = {
  A: '#2DB87D',
  B: '#3B82F6',
  C: '#F59E0B',
  D: '#F97316',
  F: '#EF4444',
};

// Auth screen gradient — 4 stops matching locations={[0, 0.35, 0.7, 1]}
export const COLORS = {
  gradientAuth: ['#1a1a2e', '#16213e', '#0f3460', '#0a7ea4'],
};

// Accent palette to auto-assign colors to subjects
export const SubjectPalette = [
  '#6366F1',
  '#EC4899',
  '#F59E0B',
  '#10B981',
  '#3B82F6',
  '#8B5CF6',
  '#EF4444',
  '#14B8A6',
];
