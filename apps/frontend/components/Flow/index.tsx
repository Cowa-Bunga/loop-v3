import { useCallback } from '@hooks'
import CustomNode from './custom'
import CustomImgNode from './custom-img'
import CustomTitleNode from './custom-title'
import { initialNodes, initialEdges } from './mock'
import ReactFlow, {
  addEdge,
  Background,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap
} from 'reactflow'

// Test for drag drop route option / system automation ui
const BasicFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  )

  return (
    <div
      style={{
        height: 'calc(100vh - 60px)',
        width: '100vw',
        paddingTop: '20px'
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={{
          custom: CustomNode,
          customImg: CustomImgNode,
          customTitle: CustomTitleNode
        }}
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  )
}

export default BasicFlow
