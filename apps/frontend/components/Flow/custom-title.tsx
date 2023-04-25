import { Card, Typography } from '@mui/material'
import { memo } from 'react'
import { Handle, NodeProps, Position } from 'reactflow'

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
        backgroundColor: 'teal',
        color: 'primary.contrastText'
      }}
    >
      <Handle
        type="target"
        position={targetPosition}
        isConnectable={isConnectable}
      />
      <Typography variant="h4">{data?.label}</Typography>
      <Handle
        type="source"
        position={sourcePosition}
        isConnectable={isConnectable}
      />
    </Card>
  )
}

CustomNode.displayName = 'CustomNode'

export default memo(CustomNode)
