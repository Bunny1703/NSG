import { createTheme } from '@mui/material/styles';

// Theme colors: Black + Electric Blue + Steel Gray
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00BFFF', // Electric Blue
      light: '#33CCFF',
      dark: '#0099CC',
      contrastText: '#fff',
    },
    secondary: {
      main: '#71797E', // Steel Gray
      light: '#8C9399',
      dark: '#5A6065',
      contrastText: '#fff',
    },
    background: {
      default: '#121212', // Black
      paper: '#1E1E1E',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontWeight: 500,
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          fontWeight: 500,
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#33CCFF',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#121212',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#121212',
          borderRight: '1px solid #333',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E1E1E',
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;