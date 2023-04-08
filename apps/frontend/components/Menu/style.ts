import HomeIcon from '@mui/icons-material/Home'
const ui = {
  container: {
    width: '300px',
    height: '100vh',
    pt: '80px',
    backgroundColor: 'primary.main',
    backgroundImage:
      'url("https://www.loop.co.za/wp-content/uploads/2021/12/BGright.svg")',
    backgroundSize: 'cover',
    backgroundPosition: '0 0',
    color: 'white'
  },

  menuList: {
    width: '100%',
    height: '100%'
  },

  version: {
    fontSize: '8px',
    textAlign: 'center',
    margin: '40px 0 10px 0'
  },

  menuItem: {
    height: '50px'
  },

  homeIcon: {
    mr: 1,
    color: 'white'
  },

  homeIconDropdown: {
    mr: 1,
    color: 'white',
    ml: -3
  },

  homeIconInner: {
    ml: -2
  },

  menuBottom: {
    position: 'fixed',
    bottom: 0,
    width: 300
  },

  icon: {
    mx: 1
  },

  accordion: {
    background: 'transparent !important',
    color: 'white',
    width: '100%',
    m: 0,
    border: 0,
    boxShadow: 0,
    p: '0 0 0 8px',
    '& *': {
      m: 0,
      border: 0,
      boxShadow: 0,
      p: 0
    }
  }
}

export default ui
