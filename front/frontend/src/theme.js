import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1a237e',
      light: '#534bae',
      dark: '#000051',
    },
    background: {
      default: '#1a1f3c',
      paper: '#242c54',
    },
    text: {
      primary: '#ffffff',
      secondary: '#e3f2fd',
    },
    action: {
      active: '#90caf9',
      hover: '#42a5f5',
    }
  },
  typography: {
    h1: {
      color: '#ffffff',
    },
    h2: {
      color: '#ffffff',
    },
    h3: {
      color: '#ffffff',
    },
    h4: {
      color: '#ffffff',
    },
    h5: {
      color: '#ffffff',
    },
    h6: {
      color: '#ffffff',
    },
    subtitle1: {
      color: '#e3f2fd',
    },
    subtitle2: {
      color: '#e3f2fd',
    },
    body1: {
      color: '#e3f2fd',
    },
    body2: {
      color: '#e3f2fd',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#242c54',
          '&:hover': {
            backgroundColor: '#2c3461',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(45deg, #1a237e 30%, #2c3461 90%)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#2c3461',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#e3f2fd',
        },
      },
    },
  },
});

export default theme;
