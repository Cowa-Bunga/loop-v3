import dynamic from 'next/dynamic'
import { LayoutBase, TabPanel } from '@components'
import Filter from './components/Filter'
import Drivers from './components/Drivers'
import { Box, Divider, Drawer, Tab, Tabs } from '@mui/material'
import ui from './style'
import { useUserContext } from '@context/user'
import Actions from './actions'
import { useReducer } from 'react'
import { initialState, reducer } from '@pages/map/reducer'

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
const Cesium = dynamic(() => import('apps/frontend/components/Cesium'), {
  ssr: false
})

export default function CesiumMap() {
  const { state: userContext } = useUserContext()
  const { hubs = [], regions = [] } = userContext

  const [state, dispatch] = useReducer(reducer, initialState)
  const { regionChange, tabChange } = Actions(state, dispatch)

  return (
    <LayoutBase>
      <Drawer anchor="left" variant="permanent" open={true} sx={{ zIndex: 0 }}>
        <Box sx={ui.container}>
          <Tabs sx={ui.tabs} value={state.tab} onChange={tabChange} centered>
            <Tab label="Filters" />
            <Tab label="Drivers" />
          </Tabs>
          <Divider />
          <TabPanel value={state.tab} index={0}>
            <Filter
              hubs={hubs}
              regions={regions}
              regionHub={state.regionHub}
              onChange={(e) => regionChange(e, userContext.client.client_id)}
            />
          </TabPanel>
          <TabPanel value={state.tab} index={1}>
            <Drivers hubs={state.hubs} />
          </TabPanel>
        </Box>
      </Drawer>
      <Cesium viewStyle={{ margin: '60px 0 0 320px' }} />
    </LayoutBase>
  )
}
