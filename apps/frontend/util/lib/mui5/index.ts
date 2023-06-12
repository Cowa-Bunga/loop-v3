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
    contrastText: '#000',
    accent: PRIMARY_BLUE,
    background: '#FFF'
  },
  secondary: {
    main: '#F3F4F6',
    contrastText: '#000',
    accent: PRIMARY_BLUE,
    background: '#FFF'
  }
} as PaletteOptions

export const dark = {
  mode: 'dark',
  primary: {
    main: '#1e1e1e',
    contrastText: '#FFF',
    accent: PRIMARY_BLUE,
    background: PRIMARY_BLUE
  },
  secondary: {
    main: '#1e1e1e',
    contrastText: '#FFF',
    accent: PRIMARY_BLUE,
    background: PRIMARY_BLUE
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
