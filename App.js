import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Main } from "./src/screens"

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#131625',
    accent: '#d1cff7',
  },
  dark: true,
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Main theme={theme}/>
    </PaperProvider>
  );
}

