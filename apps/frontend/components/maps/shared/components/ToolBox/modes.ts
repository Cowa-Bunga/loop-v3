import {
  ViewMode,
  DrawPointMode,
  DrawLineStringMode,
  DrawPolygonMode,
  DrawCircleFromCenterMode,
  DrawRectangleMode,
  MeasureDistanceMode,
  MeasureAngleMode,
  MeasureAreaMode
} from '@nebula.gl/edit-modes'
import {
  TouchApp as SelectIcon,
  Room as DrawPointIcon,
  Timeline as DrawLineIcon,
  Route as DrawPolygonIcon,
  Rectangle as DrawRectangleIcon,
  Circle as DrawCircleFromCenterIcon,
  Edit,
  Delete,
  Straighten,
  SquareFoot,
  SelectAll,
  Handyman,
  TouchApp,
  RemoveRedEye,
  Save
} from '@mui/icons-material'

export const MODE_GROUPS = [
  {
    label: 'View',
    icon: TouchApp,
    top: 100,
    modes: [
      { label: 'View', mode: ViewMode, content: RemoveRedEye },
      { label: 'Select', mode: ViewMode, content: SelectIcon }
    ]
  },
  {
    label: 'Draw',
    icon: Edit,
    top: 180,
    modes: [
      { label: 'Point', mode: DrawPointMode, content: DrawPointIcon },
      { label: 'Line', mode: DrawLineStringMode, content: DrawLineIcon },
      { label: 'Polygon', mode: DrawPolygonMode, content: DrawPolygonIcon },
      {
        label: 'Rectangle',
        mode: DrawRectangleMode,
        content: DrawRectangleIcon
      },
      {
        label: 'Circle',
        mode: DrawCircleFromCenterMode,
        content: DrawCircleFromCenterIcon
      }
    ]
  },
  {
    label: 'Measure tools',
    icon: Straighten,
    top: 260,
    modes: [
      { label: 'Distance', mode: MeasureDistanceMode, content: Straighten },
      { label: 'Angle', mode: MeasureAngleMode, content: SquareFoot },
      { label: 'Area', mode: MeasureAreaMode, content: SelectAll }

      // TODO check what mode its meant to be
      // {
      //   label: 'Difference',
      //   mode: MeasureAngleMode,
      //   config: { booleanOperation: 'difference' },
      //   content: Settings
      // },
      // {
      //   label: 'Union',
      //   mode: MeasureAngleMode,
      //   config: { booleanOperation: 'union' },
      //   content: Settings
      // },
      // {
      //   label: 'Intersection',
      //   mode: MeasureAngleMode,
      //   config: { booleanOperation: 'intersection' },
      //   content: Settings
      // }
    ]
  },
  {
    label: 'Actions',
    icon: Handyman,
    top: 340,
    modes: [
      { label: 'Clear All', mode: ViewMode, content: Delete },
      { label: 'Save', mode: ViewMode, content: Save, action: 'clearAll' }
    ]
  }
]
