const sidebarColor = '#F3F4F6'

export const ui = {
  bottomDrawer: {
    zIndex: 0
    // '& *': { padding: 0, border: 0, zIndex: 0 }
  },

  leftDrawer: {
    backgroundColor: sidebarColor
  },
  rightDrawer: {
    backgroundColor: sidebarColor
  },

  map: {
    height: 'calc(100vh-60px)',
    overflow: 'hidden'
  },

  openBox: {
    position: 'fixed',
    height: '100vh',
    width: '30px',
    backgroundColor: sidebarColor,
    top: 0,
    bottom: 0,
    left: 0,
    pt: 'calc(50vh - 30px)',
    color: '#9DA3AE !important',
    zIndex: 1201,
    shadow: 4
  },

  openBoxR: {
    position: 'fixed',
    height: '100vh',
    width: '30px',
    backgroundColor: sidebarColor,
    top: 0,
    bottom: 0,
    right: 0,
    pt: 'calc(50vh - 30px)',
    color: '#9DA3AE !important',
    zIndex: 1201,
    shadow: 4
  },

  closedBox: {
    pt: 2,
    height: '50px'
  },

  closedBoxIcon: {
    position: 'absolute',
    right: 0,
    color: '#9DA3AE',
    width: '50px'
  },

  closedBoxIconR: {
    position: 'absolute',
    left: 0,
    color: '#9DA3AE',
    width: '50px',
    pt: 2
  },

  bottomBox: {
    position: 'fixed',
    bottom: 0,
    left: 'calc(50vw - 20px)',
    right: 'calc(50vw - 20px)',
    height: '40px',
    width: '40px',
    zIndex: 12000
  },

  bottomdBoxIcon: {
    width: '40px',
    height: '40px',
    color: 'white'
  },

  filter: {
    pt: '60px',
    backgroundColor: sidebarColor,
    color: 'black'
  },

  speedDial: {
    position: 'absolute',
    top: 120,
    right: 10
  },

  speedDial2: {
    position: 'absolute',
    top: 120,
    left: 10
  }
}
