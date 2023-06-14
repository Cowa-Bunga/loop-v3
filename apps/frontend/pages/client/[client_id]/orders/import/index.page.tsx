import { LayoutBase } from '@components'
import Button from '@mui/material/Button'
import { DataGrid } from '@mui/x-data-grid'
import { rows, columns } from './__test__/mock'
import { Tabs, Tab, Divider, Box, Typography } from '@mui/material'
import { positions } from '@mui/system'


const OrdersImport = () => {
  return <LayoutBase>
    
    <Button onClick={null}>O   Home</Button>
    <br/>
    <Box sx={{
      display: 'inline-flex',
        px: 5,
        py: 5
    }}>
        <Box>
          <Typography variant="h5">
            <b>Import Orders</b>
          </Typography>
          <br />
        </Box>
        <Button sx={{
          py:0,
          my:0,
          left: '85%'
          }}>Export import Template X</Button>
    </Box>
    <Box sx={{
        px: 5,
        py: 5,
        backgroundColor: 'lightgray',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.7],
        },
      }}>
    <Button variant='contained'>Import Orders</Button>
    <Button variant='contained'>Create Trip</Button>
    <Box sx={{
        px: 5,
        py: 5,
        backgroundColor: 'white',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.7],
        },
      }}>
    <DataGrid rows={rows} columns={columns} autoHeight hideFooter density="comfortable" />
    </Box>
    </Box>
    
    </LayoutBase>
}

export default OrdersImport
