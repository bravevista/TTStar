import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';

import { colors, spacing, typography, borderRadius, shadows } from '../../styles/theme';
import { ThemeType, ThemeContextType, ThemeMode } from '../../types/theme';

// Creamos el contexto para el tema
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Props para nuestro proveedor de tema
type ThemeProviderProps = {
    children: ReactNode;
    initialThemeMode?: ThemeMode,
};

// Creamos el proovedor de tema
export const ThemeProvider = ({ children, initialThemeMode = 'light' }: ThemeProviderProps) => {
    const deviceColorScheme = useDeviceColorScheme() as ThemeType;
    const [themeMode, setThemeMode] = useState<ThemeMode>(initialThemeMode);
    const [theme, setTheme] = useState<ThemeType>(initialThemeMode === 'auto' ? deviceColorScheme : initialThemeMode);

    // Actualizamos el tema cuando cambia el esquema de colores del dispositivo
    useEffect(() => {
        if (themeMode === 'auto') {
            setTheme(deviceColorScheme);
        } else {
            setTheme(themeMode);
        };
    }, [themeMode, deviceColorScheme]);

    // Función para alternar el tema
    const toggleTheme = (mode?: ThemeMode) => {
        if (mode) {
            setThemeMode(mode);
        } else {
            setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
        };
    };

    // Valor para el contexto
    const value = {
        theme,
        themeMode,
        colors: colors[theme],
        toggleTheme,
        spacing,
        typography,
        borderRadius,
        shadows: shadows[theme]
    };

    //EL MODO AUTOMATICO TMPOCO FUNCIONA, parece que si solo que quizas por el emulador no fuciona en realidad???

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};