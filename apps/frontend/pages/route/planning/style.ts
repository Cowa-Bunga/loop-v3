export const ui = {
  bottomDrawer: {
    zIndex: 1
  },

  map: {
    height: `calc(100vh - 60px)`,
    overflow: 'hidden'
  },

  drawerPaper: {
    padding: 0,
    border: 0,
    zIndex: 0
  },

  bottomBox: {
    position: 'fixed',
    bottom: 0,
    left: 'calc(50vw - 20px)',
    right: 'calc(50vw - 20px)',
    height: '40px',
    width: '40px',
    zIndex: 1
  },

  bottomdBoxIcon: {
    width: '40px',
    height: '40px',
    color: 'white'
  },

  speedDial: {
    position: 'absolute',
    top: 120,
    right: 10,
    zIndex: 1
  },

  timeline: {
    color: 'skyblue',
    position: 'fixed',
    top: 60,
    bottom: 0,
    left: -40,
    zIndex: 4,
    pb: '60px',
    overflow: 'auto',
    boxShadow: 'inset 100px 40px 200px rgba(155,155,255,0.1)'
  },

  bottomNav: {
    position: 'fixed',
    bottom: 0,
    zIndex: 4
  },

  sizeSmall: { size: 'small' },

  colorWhite: { color: 'white' }
}
