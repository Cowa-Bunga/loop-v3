import dynamic from 'next/dynamic'
import { LayoutBase, TabPanel } from '@components'
import Filter from './components/Filter'
import Drivers from './components/Drivers'
import { Box, Divider, Drawer, Tab, Tabs } from '@mui/material'
import { useMergeState } from '@hooks'
import ui from './style'
import { useUserContext } from '@context/user'
import Actions from './actions'

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
const Cesium = dynamic(() => import('apps/frontend/components/Cesium'), {
  ssr: false
})

interface IState {
  tab: number
  regionHub: string
}

export default function CesiumMap() {
  const { state: userContext } = useUserContext()
  const [state, setState] = useMergeState<IState>({
    tab: 0,
    regionHub: ''
  })
  const { hubs = [], regions = [] } = userContext
  const { regionChange, tabChange } = Actions(state, setState)

  return (
    <LayoutBase>
      <Drawer anchor="left" variant="permanent" open={true}>
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
              onChange={regionChange}
            />
          </TabPanel>
          <TabPanel value={state.tab} index={1}>
            <Drivers regionHubId={state.regionHub} />
          </TabPanel>
        </Box>
      </Drawer>
      <Cesium viewStyle={{ margin: '60px 0 0 320px' }} />
    </LayoutBase>
  )
}
