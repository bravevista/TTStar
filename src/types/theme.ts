import { colors, spacing, typography, borderRadius, shadows } from '../styles/theme';

export type ThemeType = 'light' | 'dark';

export type ThemeContextType = {
    theme: ThemeType;
    colors: typeof colors.light;
    toggleTheme: () => void;
    spacing: typeof spacing;
    typography: typeof typography;
    borderRadius: typeof borderRadius;
    shadows: typeof shadows.light;
};