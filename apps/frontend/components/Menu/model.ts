export const menuModel: IMenu[] = [
  {
    id: 'dashboard',
    icon: '',
    title: 'Dashboard',
    link: '/',
    permissions: []
  },
  {
    id: 'orders',
    icon: '',
    title: 'All Orders',
    link: '/orders',
    permissions: []
  },
  {
    id: 'drivers',
    icon: '',
    title: 'Driver Details',
    link: '/',
    permissions: []
  },
  {
    id: 'import',
    icon: '',
    title: 'Import Orders',
    link: '/',
    permissions: []
  },
  {
    id: 'training',
    icon: '',
    title: 'Training Centre',
    link: '/',
    permissions: []
  },
  {
    id: 'support',
    icon: '',
    title: 'Support',
    link: '/',
    permissions: []
  }
]

export const menuBottomModel: IMenu[] = [
  {
    id: 'admin',
    icon: '',
    title: 'Client Admin',
    link: '/',
    permissions: []
  },
  {
    id: 'fleet',
    icon: '',
    title: 'Fleet Management',
    link: '/',
    permissions: []
  },
  {
    id: 'signout',
    icon: '',
    title: 'Log Out',
    action: () => 'signOut',
    permissions: []
  }
]
