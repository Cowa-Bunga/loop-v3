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
    link: '/drivers/profile',
    permissions: []
  },
  {
    id: 'import',
    icon: '',
    title: 'Import Orders',
    link: '/orders/import',
    permissions: []
  },
  {
    id: 'training',
    icon: '',
    title: 'Training Centre',
    link: '/training',
    permissions: []
  },
  {
    id: 'support',
    icon: '',
    title: 'Support',
    link: '/support',
    permissions: []
  },
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
