import { createTheme } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: '#2C7EF8',
      light: '#5B9CF9',
      dark: '#1A5BB5',
    },
    secondary: {
      main: '#FF6B6B',
      light: '#FF9999',
      dark: '#CC4444',
    },
    background: {
      default: mode === 'light' ? '#F5F7F9' : '#0A1929',
      paper: mode === 'light' ? '#FFFFFF' : '#1A2027',
      gradient: mode === 'light' 
        ? 'linear-gradient(135deg, #2C7EF8 0%, #5B9CF9 100%)'
        : 'linear-gradient(135deg, #1A5BB5 0%, #2C7EF8 100%)',
      dark: mode === 'light' ? '#1C1D1F' : '#000000',
      card: mode === 'light' ? '#FFFFFF' : '#1E2A32',
    },
    text: {
      primary: mode === 'light' ? '#1C1D1F' : '#FFFFFF',
      secondary: mode === 'light' ? '#6A6F73' : '#B0B8BC',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          padding: '10px 20px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
});

// Create a theme instance
const theme = (mode) => createTheme(getDesignTokens(mode));

export default theme; 