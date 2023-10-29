import * as React from 'react';
import { useColorScheme } from "react-native"
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { RootStackNavigator } from './navigators/RootStackNavigator';
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import AsyncStorage from '@react-native-async-storage/async-storage';

import "./styles";

import './utility/authentication';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const persister = createAsyncStoragePersister({
  storage: AsyncStorage
})

function App() {
  const scheme = useColorScheme();
  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{persister}}>
      <NavigationContainer theme={scheme == "dark" ? DarkTheme : DefaultTheme}>
          <RootStackNavigator />
      </NavigationContainer>
    </PersistQueryClientProvider>
  );
}

export default App;
