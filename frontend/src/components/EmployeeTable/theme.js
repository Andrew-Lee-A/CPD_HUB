import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#0b1e47',
      focused: '#29D6B5',
    },

    secondary: {
      main: '#1D2133',
      secondary: '#212124',
    },
  },
  typography: {
    fontFamily: 'Source Code Pro, monospace',
  },
})

export default theme