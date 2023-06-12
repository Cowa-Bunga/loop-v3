import { Button, Card } from '@mui/material'
import { memo } from 'react'
import { Handle, NodeProps, NodeToolbar, Position } from 'reactflow'

const CustomNode = ({
  data,
  isConnectable,
  targetPosition = Position.Top,
  sourcePosition = Position.Bottom
}: NodeProps) => {
  return (
    <Card
      sx={{
        p: 4,
        width: '200px',
        textAlign: 'center',
        backgroundColor: 'primary.main',
        color: 'primary.contrastText'
      }}
    >
      <Handle type="target" position={targetPosition} isConnectable={isConnectable} />
      {data?.label}
      <Handle type="source" position={sourcePosition} isConnectable={isConnectable} />

      <NodeToolbar isVisible={data.visible} position={data.position}>
        <Card sx={{ p: 2 }}>
          <Button variant="outlined">delete</Button>
          <Button variant="outlined">copy</Button>
          <Button variant="outlined">expand</Button>
        </Card>
      </NodeToolbar>
    </Card>
  )
}

CustomNode.displayName = 'CustomNode'

export default memo(CustomNode)
