import { useUserContext } from '@context/user'
import { collection, query, where } from 'firebase/firestore'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'
import {
  Alert,
  Avatar,
  Box,
  Input,
  List,
  ListItem,
  ListItemText,
  Stack
} from '@mui/material'
import ui from '@pages/map/components/Drivers/style'
import { IdbDrivers } from '../../../../../../libs/@types/loop/src'

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
  regionHubId: string
}

const RegionSelected = ({ regionHubId }: IProps) => {
  const { state: userContext } = useUserContext()

  console.log('regionHubId', userContext.client)
  const burritoRef = collection(useFirestore(), 'drivers')
  const constraints = where('delivery_permissions', 'array-contains', {
    promisor_id: 'ayce3l5n0QSA7FO7CDtr',
    hub_id: '03gHB1rr1HlbxF9XbPEo'
  })
  const q = query(burritoRef, constraints)
  const { status, data } = useFirestoreCollectionData(q)

  const availableDrivers = data.filter((d: IdbDrivers) => d.available)
  const busyDrivers = data.filter((d: IdbDrivers) => !d.available)
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
          {availableDrivers.map((driver) => (
            <ListItem key={driver.id}>
              <Avatar {...stringAvatar(driver.name)} />
              <div>&nbsp;</div>
              <ListItemText primary={driver.name} />
            </ListItem>
          ))}
        </List>
        <Alert severity="warning">Busy</Alert>
        <List dense>
          {busyDrivers.map((driver) => (
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
