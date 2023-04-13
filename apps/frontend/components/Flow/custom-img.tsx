import { Button, ButtonGroup, Card, CardMedia } from '@mui/material'
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
        backgroundColor: 'primary.main',
        color: 'primary.contrastText'
      }}
    >
      <Handle
        type="target"
        position={targetPosition}
        isConnectable={isConnectable}
      />
      {data?.label}
      <Handle
        type="source"
        position={sourcePosition}
        isConnectable={isConnectable}
      />

      <NodeToolbar isVisible={data.visible} position={data.position}>
        <Card sx={{ p: 2, width: '300px', textAlign: 'center' }}>
          <CardMedia image="/spark.png" component="img" />
          <br />
          <ButtonGroup>
            <Button variant="outlined">delete</Button>
            <Button variant="outlined">copy</Button>
            <Button variant="outlined">expand</Button>
          </ButtonGroup>
        </Card>
      </NodeToolbar>

      {/* <div style={{ padding: '10px 20px' }}>label</div> */}
    </Card>
  )
}

CustomNode.displayName = 'CustomNode'

export default memo(CustomNode)
