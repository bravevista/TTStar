import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ColorSchemeName, useColorScheme as useDeviceColorScheme } from 'react-native';

//Definimos los colores para los temas:
export const colors = {
    light: {
      primary: '#4C6EF5',         // Azul principal
      secondary: '#7048E8',       // Púrpura para acentos
      background: '#FFFFFF',      // Fondo blanco
      card: '#F8F9FA',            // Tarjetas y elementos de UI
      text: '#212529',            // Texto principal
      textSecondary: '#6C757D',   // Texto secundario
      border: '#DEE2E6',          // Bordes
      notification: '#FA5252',    // Notificaciones
      success: '#40C057',         // Mensajes de éxito
      warning: '#FD7E14',         // Advertencias
      error: '#FA5252',           // Errores
      inactive: '#ADB5BD',        // Elementos inactivos
      highlight: '#E7F5FF',       // Resaltado suave
      ripple: 'rgba(0, 0, 0, 0.1)', // Efecto ripple
    },
    dark: {
      primary: '#748FFC',         // Azul principal más claro
      secondary: '#9775FA',       // Púrpura para acentos más claro
      background: '#121212',      // Fondo oscuro
      card: '#1E1E1E',            // Tarjetas y elementos de UI
      text: '#F8F9FA',            // Texto principal
      textSecondary: '#ADB5BD',   // Texto secundario
      border: '#343A40',          // Bordes
      notification: '#FF6B6B',    // Notificaciones
      success: '#51CF66',         // Mensajes de éxito
      warning: '#FFD43B',         // Advertencias
      error: '#FF6B6B',           // Errores
      inactive: '#495057',        // Elementos inactivos
      highlight: '#1A365D',       // Resaltado suave
      ripple: 'rgba(255, 255, 255, 0.1)', // Efecto ripple
    }
};