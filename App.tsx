import { ThemeProvider, createTheme } from '@rneui/themed';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/components/AppNavigator';

const theme = createTheme({
  lightColors: {
    primary: 'purple',
  },
});

const App = () => {

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <AppNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

export default App

const styles = StyleSheet.create({})