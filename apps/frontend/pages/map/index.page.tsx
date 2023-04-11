import dynamic from 'next/dynamic'
import { LayoutBase, TabPanel } from '@components'
import Filter from './components/Filter'
import Drivers from './components/Drivers'
import { Box, Divider, Drawer, Tab, Tabs } from '@mui/material'
import { useMergeState } from '../../util/hooks/useMergeState'
import ui from './style'

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
const Cesium = dynamic(() => import('apps/frontend/components/Cesium'), {
  ssr: false
})

export default function CesiumMap() {
  const [state, setState] = useMergeState({
    tab: 0
  })

  return (
    <LayoutBase>
      <Drawer anchor="left" variant="permanent" open={true}>
        <Box sx={ui.container}>
          <Tabs
            sx={ui.tabs}
            value={state.tab}
            onChange={(e, i) => setState({ tab: i })}
            centered
          >
            <Tab label="Filters" />
            <Tab label="Drivers" />
          </Tabs>
          <Divider />
          <TabPanel value={state.tab} index={0}>
            <Filter />
          </TabPanel>
          <TabPanel value={state.tab} index={1}>
            <Drivers />
          </TabPanel>
        </Box>
      </Drawer>
      <Cesium viewStyle={{ margin: '60px 0 0 320px' }} />
    </LayoutBase>
  )
}
