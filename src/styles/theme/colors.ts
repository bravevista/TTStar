// Interfaz para los colores de un tema específico (light o dark)
export interface ThemeColors {
  primary: string;         // Color principal
  secondary: string;       // Color secundario
  background: string;      // Color de fondo principal
  background2: string;     // Color de fondo secundario
  card: string;            // Color para tarjetas y elementos de UI
  text: string;            // Color de texto principal
  textSecondary: string;   // Color de texto secundario
  border: string;          // Color de bordes
  notification: string;    // Color para notificaciones
  success: string;         // Color para mensajes de éxito
  warning: string;         // Color para advertencias
  error: string;           // Color para errores
  inactive: string;        // Color para elementos inactivos
  highlight: string;       // Color para resaltado suave
  ripple: string;          // Efecto ripple
};

export interface Colors {
  light: ThemeColors; // Colores del tema claro
  dark: ThemeColors;  // Colores del tema oscuro
};

//Definimos los colores para los temas:
export const colors: Colors = {
  light: {
    primary: '#6B4CE6',         // Violeta labanda principal
    secondary: '#4C6EF5',       // Azul para acentos
    background: '#FFFFFF',      // Fondo blanco
    background2: '#F3F3F3',
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
    background: '#080808',      // Fondo oscuro
    background2: '#101010',     //
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
