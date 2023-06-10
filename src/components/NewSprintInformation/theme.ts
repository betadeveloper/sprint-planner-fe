import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    h1: {
      fontFamily: 'Poppins',
      fontWeight: 600,
      fontSize: '34px',
      lineHeight: '112px',
      letterSpacing: '-1.5px',
    },
    body1: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0.15px',
      color: 'rgba(0, 0, 0, 0.87)',
    },
  },
});

export default theme;
