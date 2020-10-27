import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { createTheme } from '../src/theme/carto-theme'

const theme = createTheme();

export const decorators = [
  (Story) => {
    console.log(theme.themeName)
    return (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    )
  },
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}