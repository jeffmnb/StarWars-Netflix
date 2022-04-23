import React from 'react';

import {
  SourceSansPro_700Bold,
  SourceSansPro_400Regular,
  SourceSansPro_600SemiBold,
  SourceSansPro_900Black,
  useFonts
} from '@expo-google-fonts/source-sans-pro';

import AppLoading from 'expo-app-loading';
import { Routes } from './src/routes';

export default function App() {

  const [fontsValided] = useFonts({
    SourceSansPro_700Bold,
    SourceSansPro_400Regular,
    SourceSansPro_600SemiBold,
    SourceSansPro_900Black
  });

  if (!fontsValided) {
    return <AppLoading />
  }

  return (
    <Routes />
  );
}