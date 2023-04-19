import { useUserContext } from '@context/user'
import { collection, query, where } from 'firebase/firestore'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'
import ui from '../Drivers/style'
import { useMergeState, useEffect } from '@hooks'
import Actions from '../Drivers/actions'
import { stringAvatar } from '@util/helpers'
import {
  Alert,
  Avatar,
  Box,
  CircularProgress,
  Input,
  List,
  ListItem,
  ListItemText,
  Stack
} from '@mui/material'

export default function RegionSelected({ hubs }: { hubs: string[] }) {
  const { state: userContext } = useUserContext()

  const [state, setState] = useMergeState<{
    availableDrivers: IDriver[]
    busyDrivers: IDriver[]
  }>({
    availableDrivers: [],
    busyDrivers: []
  })
  const { modelDrivers } = Actions(state, setState)

  const driversRef = collection(useFirestore(), 'drivers')
  const contains = hubs.map((id) => ({
    promisor_id: userContext.client.client_id,
    hub_id: id
  }))
  const constraints = where(
    'delivery_permissions',
    'array-contains-any',
    contains
  )
  const q = query(driversRef, constraints)
  const { status, data } = useFirestoreCollectionData(q)

  useEffect(() => {
    if (status == 'success') {
      const drivers = modelDrivers(data)
      setState({
        availableDrivers: drivers.filter((d: IDriver) => d.available),
        busyDrivers: drivers.filter((d: IDriver) => !d.available)
      })
    }
  }, [data, modelDrivers, setState, status])

  return status !== 'success' ? (
    <Box sx={ui.container}>
      <CircularProgress color="secondary" />
    </Box>
  ) : (
    <Box sx={ui.container}>
      <Input
        sx={ui.searchDriver}
        fullWidth
        placeholder="Search driver name or code"
      />
      <Stack sx={ui.stack} spacing={2}>
        <Alert severity="success">Available</Alert>
        <List dense>
          {state.availableDrivers.map((driver) => (
            <ListItem key={driver.id}>
              <Avatar {...stringAvatar(driver.name)} />
              <div>&nbsp;</div>
              <ListItemText primary={driver.name} />
            </ListItem>
          ))}
        </List>
        <Alert severity="warning">Busy</Alert>
        <List dense>
          {state.busyDrivers.map((driver) => (
            <ListItem key={driver.id}>
              <Avatar {...stringAvatar(driver.name)} />
              <div>&nbsp;</div>
              <ListItemText primary={driver.name} />
            </ListItem>
          ))}
        </List>
      </Stack>
    </Box>
  )
}
