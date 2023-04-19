import { useUserContext } from '@context/user'
import { collection, query, where } from '@util/lib/firebase'
import {
  useEffect,
  useFirestore,
  useFirestoreCollectionData,
  useMergeState
} from '@hooks'
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
import ui from './style'
import Actions from './actions'

interface IProps {
  hubs: string[]
}

interface IState {
  availableDrivers: IDriver[]
  busyDrivers: IDriver[]
}

const RegionSelected = ({ hubs }: IProps) => {
  const { state: userContext } = useUserContext()
  const [state, setState] = useMergeState<IState>({
    availableDrivers: [],
    busyDrivers: []
  })
  const { modelDrivers, stringAvatar } = Actions(state, setState)

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
  }, [data, status])

  if (status !== 'success') {
    return (
      <Box sx={ui.container}>
        <CircularProgress color="secondary" />
      </Box>
    )
  }

  return (
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

export default RegionSelected
