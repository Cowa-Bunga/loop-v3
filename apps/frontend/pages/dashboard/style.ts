export const ui = {
  leftDrawer: {},
  rightDrawer: {},

  openBox: {
    position: 'fixed',
    height: '100vh',
    width: '30px',
    backgroundColor: '#F3F4F6',
    top: 0,
    bottom: 0,
    left: 0,
    pt: 'calc(50vh - 30px)',
    color: '#9DA3AE !important',
    zIndex: 12,
    shadow: 4
  },

  openBoxR: {
    position: 'fixed',
    height: '100vh',
    width: '30px',
    backgroundColor: '#F3F4F6',
    top: 0,
    bottom: 0,
    right: 0,
    pt: 'calc(50vh - 30px)',
    color: '#9DA3AE !important',
    zIndex: 12,
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

  filter: {
    pt: '60px',
    backgroundColor: '#F3F4F6',
    color: 'black'
  }
}
