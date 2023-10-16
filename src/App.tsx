import * as React from 'react';
import { useColorScheme } from "react-native"
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { RootStackNavigator } from './navigators/RootStackNavigator';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./styles";

import './utility/authentication';

export const queryClient = new QueryClient();

function App() {
  const scheme = useColorScheme();
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer theme={scheme == "dark" ? DarkTheme : DefaultTheme}>
          <RootStackNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
