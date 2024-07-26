import { createTheme } from '@mui/material';
import facepaint from 'facepaint';

export const customTheme = createTheme({
  typography: {
    fontFamily: 'Montserrat',
    allVariants: {
      color: '#2C2C2C',
    },
  },
  palette: {
    primary: {
      main: '#0E35FF',
    },
    secondary: {
      main: '#3FEA03',
      dark: '#FF0404',
      light: '#A5A5A5',
    },
    text: {
      primary: '#949494',
    },
  },
  
});

const breakpoints = [600, 900, 1200, 1536];
export const mediaQueries = facepaint(
  breakpoints.map((bp) => `@media (min-width: ${bp}px)`),
);
