import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    primary: { main: '#267354', dark: '#1d5c42' },
    background: { default: '#f8f9fb', paper: '#ffffff' },
    text: { primary: '#252b33', secondary: '#737985' },
    divider: '#e9ebef',
  },
  typography: {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: 13,
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: 0 },
  },
  shape: { borderRadius: 6 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { minHeight: 36, paddingInline: 14 } },
    },
    MuiTextField: { defaultProps: { size: 'small' } },
    MuiCssBaseline: { styleOverrides: { body: { letterSpacing: 0 } } },
  },
})
