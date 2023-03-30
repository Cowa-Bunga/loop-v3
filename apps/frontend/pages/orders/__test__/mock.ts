export const rows = [
  { id: 1, col1: 'ORDER001111', col2: 'John', col3: '23/3/2023 14:21:33' , col4: '23/3/2023 14:23:12', col5: 'CPT 0034', col6: 'delivered', col7: 3, col8: 'ON DEMAND' },
  { id: 2, col1: 'ORDER001211', col2: 'Sally' , col3: '23/3/2023 14:21:33', col4: '23/3/2023 14:23:12', col5: 'CPT 0034', col6: 'delivered', col7: 3, col8: 'ON DEMAND' },
  { id: 3, col1: 'ORDER001113', col2: 'Robert' , col3: '23/3/2023 14:21:33', col4: '23/3/2023 14:23:12', col5: 'CPT 0034', col6: 'delivered', col7: 3, col8: 'ON DEMAND' },
];

export const columns = [
  { field: 'col1', headerName: 'ORDER NUMBER', minWidth: 180 },
  { field: 'col2', headerName: 'CUSTOMER NAME', minWidth: 180 },
  { field: 'col3', headerName: 'TIME PLACED', minWidth: 180 },
  { field: 'col4', headerName: 'DELIVERY TIME', minWidth: 180 },
  { field: 'col5', headerName: 'BRANCH', minWidth: 180 },
  { field: 'col6', headerName: 'STATUS', minWidth: 180 },
  { field: 'col7', headerName: 'PARCELS', minWidth: 180 },
  { field: 'col8', headerName: 'TYPE', minWidth: 180 },
  { field: 'actions', headerName: '', minWidth: 200 },
];
