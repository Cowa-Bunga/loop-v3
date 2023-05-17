export const ui = {
  tools: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    top: '60px',
    right: '30px',
    opacity: 0.8
  },

  subtoolsContainer: {
    pt: 1,
    position: 'relative'
  },

  subtools: {
    display: 'flex',
    flexDirection: 'row-reverse',
    position: 'absolute',
    top: 10,
    right: 50,
    borderRadius: '5px'
  },

  speedDial: {
    position: 'absolute',
    right: 40
  },

  button: {
    fontSize: '1em',
    fontWeight: 400,
    border: '1px solid transparent',
    borderRadius: '0.25em',
    margin: '0.05em',
    padding: '0.1em 0.2em',
    '&:hover': {
      background: 'rgb(128, 137, 133)'
    }
  }
}
