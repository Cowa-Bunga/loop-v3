export const MODEL_MENU = ({ client_id }) =>
  [
    {
      id: 'dashboard',
      icon: '',
      title: 'Dashboard',
      link: '/dashboard',
      permissions: []
    },
    {
      id: 'orders',
      icon: '',
      title: 'All Orders',
      link: `/client/${client_id}/orders/view`,
      permissions: []
    },
    {
      id: 'drivers',
      icon: '',
      title: 'Driver Details',
      link: '/driver/todo-id/profile',
      permissions: []
    },
    {
      id: 'import',
      icon: '',
      title: 'Import Orders',
      link: '/client/todo-id/orders/import',
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
      title: 'Reports',
      link: '/intel/reports',
      permissions: []
    },
    {
      id: 'fleet',
      icon: '',
      title: 'Fleet',
      link: '/fleet',
      permissions: []
    },
    {
      id: 'signout',
      icon: '',
      title: 'Log Out',
      action: () => 'signOut',
      permissions: []
    }
  ] as IMenu[]
