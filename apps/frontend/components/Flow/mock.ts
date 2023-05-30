import { Edge } from 'reactflow'

export const initialNodes = [
  {
    id: '1',
    data: { label: 'Company' },
    position: { x: 400, y: 100 },
    visible: false,
    type: 'customTitle'
  },
  {
    id: '2',
    data: { label: 'Region' },
    position: { x: 500, y: 300 },
    visible: false,
    type: 'customImg'
  },
  {
    id: '3',
    data: { label: 'Hub' },
    position: { x: 500, y: 500 },
    visible: false,
    type: 'custom'
  },
  {
    id: '4',
    type: 'custom',
    data: { label: 'Driver' },
    visible: false,
    position: { x: 600, y: 700 }
  }
]

export const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' }
]
