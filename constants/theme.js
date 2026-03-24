import { Platform } from 'react-native';

// ─── Palette ────────────────────────────────────────────────────────────────
// Slate Dark theme — clean, professional, blue accent
const primaryLight = '#3B82F6'; // blue-500
const primaryDark  = '#60A5FA'; // blue-400

export const Colors = {
  light: {
    text:             '#0F172A', // slate-900
    background:       '#FFFFFF',
    tint:             primaryLight,
    icon:             '#64748B', // slate-500
    tabIconDefault:   '#94A3B8', // slate-400
    tabIconSelected:  primaryLight,
    // App tokens
    surface:          '#F8FAFC', // slate-50
    border:           '#E2E8F0', // slate-200
    muted:            '#94A3B8', // slate-400
    primary:          primaryLight,
    success:          '#10B981', // emerald-500
    warning:          '#F59E0B', // amber-500
    danger:           '#EF4444', // red-500
    studying:         '#3B82F6', // blue-500
    studied:          '#10B981', // emerald-500
  },
  dark: {
    text:             '#F1F5F9', // slate-100
    background:       '#0F172A', // slate-900
    tint:             primaryDark,
    icon:             '#94A3B8', // slate-400
    tabIconDefault:   '#64748B', // slate-500
    tabIconSelected:  primaryDark,
    // App tokens
    surface:          '#1E293B', // slate-800
    border:           '#334155', // slate-700
    muted:            '#64748B', // slate-500
    primary:          primaryDark,
    success:          '#34D399', // emerald-400
    warning:          '#FBBF24', // amber-400
    danger:           '#F87171', // red-400
    studying:         '#60A5FA', // blue-400
    studied:          '#34D399', // emerald-400
  },
};

export const Fonts = Platform.select({
  ios: {
    sans:    'system-ui',
    serif:   'ui-serif',
    rounded: 'ui-rounded',
    mono:    'ui-monospace',
  },
  default: {
    sans:    'normal',
    serif:   'serif',
    rounded: 'normal',
    mono:    'monospace',
  },
  web: {
    sans:    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif:   "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono:    "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

// ─── Grade colors — semantic, same in light & dark ──────────────────────────
export const GradeColors = {
  A: '#10B981', // emerald
  B: '#3B82F6', // blue
  C: '#F59E0B', // amber
  D: '#F97316', // orange
  F: '#EF4444', // red
};

// ─── Auth gradient — Red diagonal ───────────────────────────────────────────
// Used with locations={[0, 0.35, 0.7, 1]}
export const COLORS = {
  gradientAuth: ['#800020', '#6e001a', '#640017', '#5a0015'],
};

// ─── Subject accent palette ──────────────────────────────────────────────────
export const SubjectPalette = [
  '#6366F1', // indigo
  '#EC4899', // pink
  '#F59E0B', // amber
  '#10B981', // emerald
  '#3B82F6', // blue
  '#8B5CF6', // violet
  '#EF4444', // red
  '#14B8A6', // teal
];
