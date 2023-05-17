import { createTheme } from '@mui/material/styles'
import { purple } from '@mui/material/colors'

/**
 @see: mui.org
 @see: https://m2.material.io/inline-tools/color/
 @see: https://zenoo.github.io/mui-theme-creator/#Avatar
 */

export const PRIMARY_BLUE = '#063863'
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: PRIMARY_BLUE,
      contrastText: '#FFF'
    },
    secondary: {
      main: purple[200]
    }
  },
  
  typography: {
    allVariants: {
      fontFamily: 'Verdana'
    }
  }
})

export default theme
