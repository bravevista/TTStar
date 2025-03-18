import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ColorSchemeName, useColorScheme as useDeviceColorScheme } from 'react-native';

//Definimos los colores para los temas:
export const colors = {
    light: {
      primary: '#6B4CE6',         // Violeta labanda principal
      secondary: '#4C6EF5',       // Azul para acentos
      background: '#FFFFFF',      // Fondo blanco
      card: '#F2F2FA',            // Tarjetas y elementos de UI
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
      primary: '#6650E4',         // Violeta labanda principal más claro
      secondary: '#748FFC',       // Azul más claro para acentos
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