import { useContext } from 'react';
import { ThemeContext } from '../state/contexts/ThemeContext';
import { ThemeContextType } from '../types/theme';

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
    }
    return context;
};