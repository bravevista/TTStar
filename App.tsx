import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';

import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { queryClient } from './src/config/ReactQuery';
import './src/api/interceptors';
import { PaperProvider } from 'react-native-paper';

enableScreens();

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView>
            <PaperProvider>
              <AppNavigator />
            </PaperProvider>
          </GestureHandlerRootView>
        </QueryClientProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
