const ui = {
  container: {
    textAlign: 'center',
    width: '360px',
    height: '100vh',
    pt: '80px',
    px: 2,
    backgroundColor: 'primary.main',
    backgroundImage:
      'url("https://www.loop.co.za/wp-content/uploads/2021/12/BGright.svg")',
    backgroundSize: 'cover',
    backgroundPosition: '0 0',
    '& *': {
      color: 'white !important'
    }
  },

  select: {
    height: '40px',
    my: 1
  },

  search: {
    height: '50px',
    my: 1
  },

  searchBox: { my: 1 }
}

export default ui
