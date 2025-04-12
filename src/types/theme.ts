import { colors, spacing, typography, borderRadius, shadows } from '../styles/theme';

export type ThemeType = 'light' | 'dark';
export type ThemeMode = 'light' | 'dark' | 'auto';

export type ThemeContextType = {
    theme: ThemeType;
    themeMode: ThemeMode;
    colors: typeof colors.light | typeof colors.dark;
    toggleTheme: (mode?: ThemeMode) => void;
    spacing: typeof spacing;
    typography: typeof typography;
    borderRadius: typeof borderRadius;
    shadows: typeof shadows.light | typeof shadows.dark;
};