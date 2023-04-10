const ui = {
  container: {
    textAlign: 'center',
    width: '360px',
    minHeight: '100vh',
    pt: '80px',
    backgroundColor: 'primary.main',
    backgroundImage:
      'url("https://www.loop.co.za/wp-content/uploads/2021/12/BGright.svg")',
    backgroundSize: 'cover',
    backgroundPosition: '0 0',
    '& *': {
      color: 'white'
    }
  },

  stack: {
    mt: 4,
    width: '100%',
    p: 2,
    '& *': {
      color: 'black',
      fontWeight: 'bold'
    }
  }
}

export default ui
