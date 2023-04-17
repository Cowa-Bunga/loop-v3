import DashboardIcon from '@mui/icons-material/Dashboard'
import ImportExportIcon from '@mui/icons-material/ImportExport'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import LiveHelpIcon from '@mui/icons-material/LiveHelp'
import ModelTrainingIcon from '@mui/icons-material/ModelTraining'
import AssessmentIcon from '@mui/icons-material/Assessment'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import LoopIcon from '@mui/icons-material/Loop'
import { Person } from '@mui/icons-material'

export const MODEL_MENU = ({ client_id }) =>
  [
    {
      id: 'home',
      icon: DashboardIcon,
      title: 'Home',
      link: '/dashboard',
      permissions: []
    },
    {
      id: 'orders',
      icon: LoopIcon,
      title: 'All Orders',
      link: `/organisation/${client_id}/orders/view`,
      permissions: []
    },
    {
      id: 'driver',
      icon: Person,
      title: 'Driver Details',
      permissions: []
    },
    {
      id: 'dashboards',
      icon: DashboardIcon,
      title: 'Dashboards',
      permissions: [],
      children: [
        {
          id: 'fleet-management',
          icon: DashboardIcon,
          title: 'Fleet Management',
          link: '/organisation/todo-id/reports',
          permissions: []
        },
        {
          id: 'reports',
          icon: AssessmentIcon,
          title: 'Reports',
          link: '/organisation/todo-id/reports',
          permissions: []
        }
      ]
    },
    {
      id: 'import',
      icon: ImportExportIcon,
      title: 'Import Orders',
      link: '/organisation/todo-id/reports',
      permissions: []
    },
    {
      id: 'support',
      icon: SupportAgentIcon,
      title: 'Support',
      permissions: [],
      children: [
        {
          id: 'support-main',
          icon: LiveHelpIcon,
          title: 'Documentation',
          link: '/support/documentation',
          permissions: []
        },
        {
          id: 'training',
          icon: ModelTrainingIcon,
          title: 'Training Centre',
          link: '/support/training',
          permissions: []
        }
      ]
    },
    {
      id: 'client-admin',
      icon: DashboardIcon,
      title: 'Client Admin',
      link: `/organisation/${client_id}/reports`,
      permissions: [],
      children: [
        {
          id: 'fleet-management',
          icon: DashboardIcon,
          title: 'Hubs',
          link: '/organisation/todo-id/reports',
          permissions: []
        },
        {
          id: 'fleet-management',
          icon: DashboardIcon,
          title: 'Branches',
          link: '/organisation/todo-id/reports',
          permissions: []
        },
        {
          id: 'fleet-management',
          icon: DashboardIcon,
          title: 'Regions',
          link: '/organisation/todo-id/reports',
          permissions: []
        },
        {
          id: 'fleet-management',
          icon: DashboardIcon,
          title: 'Users',
          link: '/organisation/todo-id/reports',
          permissions: []
        },
        {
          id: 'fleet-management',
          icon: DashboardIcon,
          title: 'Settings',
          link: '/organisation/todo-id/reports',
          permissions: []
        }
      ]
    },
    {
      id: 'signout',
      icon: PowerSettingsNewIcon,
      title: 'Log Out',
      action: () => 'signOut',
      permissions: []
    }
  ] as unknown as IMenu[]
