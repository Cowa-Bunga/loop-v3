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
      title: 'Orders',
      permissions: [],
      children: [
        {
          id: 'all-orders',
          icon: LoopIcon,
          title: 'Overview',
          link: `/organisation/${client_id}/orders/view`,
          permissions: []
        },
        {
          id: 'import',
          icon: ImportExportIcon,
          title: 'Import New',
          link: `/organisation/${client_id}/reports`,
          permissions: []
        },
        {
          id: 'trip-report',
          icon: AssessmentIcon,
          title: 'Trip Report',
          link: `/organisation/${client_id}/fleet`,
          permissions: []
        }
      ]
    },
    {
      id: 'driver',
      icon: Person,
      title: 'Drivers',
      // tmp
      link: `/drivers/overview`,
      permissions: []
    },
    {
      id: 'messages',
      icon: Person,
      title: 'Message Centre',
      permissions: []
    },
    {
      id: 'reports',
      icon: PowerSettingsNewIcon,
      title: 'Reports',
      link: `/organisation/${client_id}/reports`,
      permissions: []
    },
    {
      id: 'routing',
      icon: LiveHelpIcon,
      title: 'Route Planning',
      link: '/dashboard',
      permissions: []
    },
    {
      id: 'learn',
      icon: ModelTrainingIcon,
      title: 'Learning Centre',
      link: '/support/training',
      permissions: []
    },
    {
      id: 'support',
      icon: SupportAgentIcon,
      title: 'Support',
      permissions: [],
      link: '/support/documentation'
    }
  ] as unknown as IMenu[]
