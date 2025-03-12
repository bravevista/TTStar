import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../../styles/theme';
import { ThemeType, ThemeContextType } from '../../types/theme';

// Creamos el contexto para el tema
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Props para nuestro proveedor de tema
type ThemeProviderProps = {
    children: ReactNode;
    initialTheme?: ThemeType,
};

// Creamos el proovedor de tema
export const ThemeProvider = ({ children, initialTheme }: ThemeProviderProps) => {
    // Obtenemos el esquema de colores del dispositivo
    const deviceColorScheme = useDeviceColorScheme() as ThemeType || 'light';

    // Usamos el tema inicial proporcionado o el del dispositivo
    const [theme, setTheme] = useState<ThemeType>(initialTheme || deviceColorScheme);

    // Actualizamos el tema cuando cambia el esquema de colores del dispositivo
    // (solo si no hay un tema definido)
    useEffect(() => {
        if (!initialTheme) {
            setTheme(deviceColorScheme);
        };
    }, [deviceColorScheme, initialTheme]);

    // Función para alternar el tema
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    // Valor para el contexto
    const value = {
        theme,
        colors: colors[theme],
        toggleTheme,
        spacing,
        typography,
        borderRadius,
        shadows: shadows[theme]
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};