import { useUserContext } from '@context/user'
import { collection, query, where } from 'firebase/firestore'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'
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
import ui from '@pages/map/components/Drivers/style'
import { useMergeState } from '@hooks'
import { useEffect } from 'react'
import Actions from './actions'

function stringToColor(string: string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

function stringAvatar(name: string) {
  const fn = name.split(' ')[0][0]
  const ln = name.split(' ')[1] ? name.split(' ')[1][0] : ''

  return {
    sx: {
      bgcolor: stringToColor(name)
    },
    children: `${fn}${ln}`
  }
}

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
  }, [status])

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
