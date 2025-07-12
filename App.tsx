import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';

import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { queryClient } from './src/config/ReactQuery';
import './src/api/interceptors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView>
            <AppNavigator />
          </GestureHandlerRootView>
        </QueryClientProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
