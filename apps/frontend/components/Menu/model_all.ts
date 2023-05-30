import DashboardIcon from '@mui/icons-material/Dashboard'
import BusinessIcon from '@mui/icons-material/Business'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import SendTimeExtensionIcon from '@mui/icons-material/SendTimeExtension'
import GradingIcon from '@mui/icons-material/Grading'
import ImportExportIcon from '@mui/icons-material/ImportExport'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import LiveHelpIcon from '@mui/icons-material/LiveHelp'
import ModelTrainingIcon from '@mui/icons-material/ModelTraining'
import AssessmentIcon from '@mui/icons-material/Assessment'
import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt'
// import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied'
import LoopIcon from '@mui/icons-material/Loop'
import PersonPinIcon from '@mui/icons-material/PersonPin'
import GroupsIcon from '@mui/icons-material/Groups'
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions'
import ApiIcon from '@mui/icons-material/Api'
import ElectricCarIcon from '@mui/icons-material/ElectricCar'
import DatasetLinkedIcon from '@mui/icons-material/DatasetLinked'
import { BookOnline } from '@mui/icons-material'

export const MODEL_MENU = ({ client_id }) =>
  [
    {
      id: 'dashboard',
      icon: DashboardIcon,
      title: 'Dashboard',
      link: '/dashboard',
      permissions: []
    },
    {
      id: 'fleet',
      icon: LocalShippingIcon,
      title: 'Fleet',
      permissions: [],
      children: [
        {
          id: 'fleet-admin',
          icon: AdminPanelSettingsIcon,
          title: 'Admin',
          link: `/dashboard`,
          permissions: []
        },
        {
          id: 'fleet-drivers',
          icon: SensorOccupiedIcon,
          title: 'Drivers',
          link: `/company/todo-id/driver/todo-driver-id/details`,
          permissions: []
        },
        {
          id: 'fleet-vehicle',
          icon: ElectricCarIcon,
          title: 'Vehicles',
          link: `/company/todo-id/fleet/todo-vehicle-id`,
          permissions: []
        }
      ]
    },
    {
      id: 'orders',
      icon: LoopIcon,
      title: 'Orders',
      permissions: [],
      children: [
        {
          id: 'create-orders',
          icon: SendTimeExtensionIcon,
          title: 'Create Order',
          link: `/company/${client_id}/orders/create`,
          permissions: []
        },
        {
          id: 'orders-all',
          icon: GradingIcon,
          title: 'All Orders',
          link: `/company/${client_id}/orders/view`,
          permissions: []
        },
        {
          id: 'orders-import',
          icon: ImportExportIcon,
          title: 'Import Orders',
          link: '/company/todo-id/orders/import',
          permissions: []
        }
      ]
    },
    {
      id: 'reports',
      icon: AssessmentIcon,
      title: 'Reports',
      link: '/company/todo-id/reports',
      permissions: [],
      children: [
        {
          id: 'all-orders-report',
          icon: AssessmentIcon,
          title: 'All Orders',
          link: '/company/todo-id/settings',
          permissions: []
        },
        {
          id: 'trip-report',
          icon: AssessmentIcon,
          title: 'Trip',
          link: '/company/todo-id/settings',
          permissions: []
        },
        {
          id: 'logbook-report',
          icon: AssessmentIcon,
          title: 'Log Book',
          link: '/company/todo-id/settings',
          permissions: []
        },
        // lookerstudio reports
        {
          id: 'looker-average-duration',
          icon: DatasetLinkedIcon,
          title: 'Average Durations',
          link: '/company/todo-id/reports',
          permissions: []
        },
        {
          id: 'looker-orders',
          icon: DatasetLinkedIcon,
          title: 'Orders Overview',
          link: '/company/todo-id/reports',
          permissions: []
        },
        {
          id: 'looker-delivery-times',
          icon: DatasetLinkedIcon,
          title: 'Delivery Times',
          link: '/company/todo-id/reports',
          permissions: []
        },
        {
          id: 'looker-sla-time-bands',
          icon: DatasetLinkedIcon,
          title: 'SLA Time Bands',
          link: '/company/todo-id/reports',
          permissions: []
        },
        {
          id: 'looker-distance-ranges',
          icon: DatasetLinkedIcon,
          title: 'Distance Ranges',
          link: '/company/todo-id/reports',
          permissions: []
        },
        {
          id: 'looker-driver-monitoring',
          icon: DatasetLinkedIcon,
          title: 'Driver Monitoring',
          link: '/company/todo-id/reports',
          permissions: []
        },
        {
          id: 'looker-driver-scheduling',
          icon: DatasetLinkedIcon,
          title: 'Driver Scheduling',
          link: '/company/todo-id/reports',
          permissions: []
        },
        {
          id: 'looker-locations',
          icon: DatasetLinkedIcon,
          title: 'Locations',
          link: '/company/todo-id/reports',
          permissions: []
        },
        {
          id: 'looker-exceptions',
          icon: DatasetLinkedIcon,
          title: 'Exceptions',
          link: '/company/todo-id/reports',
          permissions: []
        }
      ]
    },

    {
      id: 'settings',
      icon: AppSettingsAltIcon,
      title: 'Settings',
      permissions: [],
      children: [
        {
          id: 'settings-billing',
          icon: AppSettingsAltIcon,
          title: 'Account',
          link: '/company/todo-id/settings',
          permissions: []
        },
        {
          id: 'settings-clients',
          icon: PersonPinIcon,
          title: 'Clients',
          link: '/company/todo-id/settings',
          permissions: []
        },
        {
          id: 'settings-integration',
          icon: ApiIcon,
          title: 'Integrations',
          link: '/company/todo-id/settings',
          permissions: []
        },
        {
          id: 'settings-optimisations',
          icon: IntegrationInstructionsIcon,
          title: 'Optimisations',
          link: '/company/todo-id/settings',
          permissions: []
        },
        {
          id: 'settings-org',
          icon: BusinessIcon,
          title: 'Organisation',
          link: '/company/todo-id/settings',
          permissions: []
        },

        {
          id: 'settings-users',
          icon: GroupsIcon,
          title: 'Users',
          link: '/company/todo-id/settings',
          permissions: []
        }
      ]
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
      id: 'tools',
      icon: ModelTrainingIcon,
      title: 'Tools',
      children: [
        {
          id: 'flow',
          icon: BookOnline,
          title: 'Flow Demo',
          link: '/tools/flow',
          permissions: []
        },
        // {
        //   id: 'api-dos',
        //   icon: BookOnline,
        //   title: 'DOS API',
        //   link: '/support/api-doc',
        //   permissions: []
        // },
        {
          id: 'api-driver',
          icon: BookOnline,
          title: 'API docs',
          link: '/support/api-doc',
          permissions: []
        }
      ]
    }
    // {
    //   id: 'signout',
    //   icon: PowerSettingsNewIcon,
    //   title: 'Sign out',
    //   action: () => 'signOut',
    //   permissions: []
    // }
  ] as unknown as IMenu[]
