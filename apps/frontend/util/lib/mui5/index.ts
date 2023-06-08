import { createTheme, PaletteOptions } from '@mui/material/styles'

/**
 @see: mui.org
 @see: https://m2.material.io/inline-tools/color/
 @see: https://zenoo.github.io/mui-theme-creator/#Avatar
 */
export const PRIMARY_BLUE = '#063863'

export const light = {
  mode: 'light',
  primary: {
    main: PRIMARY_BLUE,
    contrastText: '#FFF',
    accent: PRIMARY_BLUE
  },
  secondary: {
    main: '#F3F4F6',
    contrastText: '#FFF',
    accent: PRIMARY_BLUE
  }
} as PaletteOptions

export const dark = {
  mode: 'dark',
  primary: {
    main: '#1e1e1e',
    contrastText: '#FFF',
    accent: PRIMARY_BLUE
  },
  secondary: {
    main: '#1e1e1e',
    contrastText: '#FFF',
    accent: PRIMARY_BLUE
  }
} as PaletteOptions

export const theme = createTheme({
  palette: light,

  typography: {
    allVariants: {
      fontFamily: 'Verdana'
    }
  }
})

export default theme
