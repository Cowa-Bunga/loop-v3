export const rows = [
  {
    id: 1,
    name: 'Frikkie Spizo',
    code: '2345676543',
    email: 'frikkz@spizo.co',
    type: 'car',
    client: 'Sibas deliveries',
    hubs: 'Cape Town Hub',
    status: 'Active',
    trips: ''
  }
]

export const columns = [
  { field: 'name', headerName: 'DRIVER NAME', minWidth: 160 },
  { field: 'code', headerName: 'CODE', minWidth: 120 },
  { field: 'email', headerName: 'EMAIL ADDRESS', minWidth: 140 },
  { field: 'type', headerName: 'VEHICLE TYPE', minWidth: 120 },
  { field: 'client', headerName: 'ASSOCIATED CLIENT', minWidth: 180 },
  { field: 'hubs', headerName: 'ASSOCIATED HUBS', minWidth: 180 },
  { field: 'status', headerName: 'STATUS', minWidth: 120 },
  { field: 'trips', headerName: 'MANAGE TRIPS', minWidth: 160 }
]
