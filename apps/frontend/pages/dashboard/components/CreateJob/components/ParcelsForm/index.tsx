import { JsonForm } from '@components'
import type { JsonSchema, Layout } from '@jsonforms/core'
import { Grid, IconButton, Typography } from '@mui/material'
import { GridAddIcon } from '@mui/x-data-grid'

interface IProps {
  schema: JsonSchema
  ui: Layout
  model: any
  onChange: (index: number, data: any) => void
  addParcel: () => void
  parcels: object[]
}

const ParcelsForm = ({
  ui,
  model,
  schema,
  onChange,
  addParcel,
  parcels
}: IProps) => {
  return (
    <Grid
      container
      style={{ padding: '0 20px ' }}
      justifyContent="space-between"
      columns={16}
    >
      <Grid item>
        <Typography variant="h5">Parcels</Typography>
      </Grid>
      <Grid item>
        <IconButton aria-label="Add parcel" color="primary" onClick={addParcel}>
          <GridAddIcon />
        </IconButton>
      </Grid>

      {parcels.map((parcel, index) => (
        <JsonForm
          key={index}
          schema={schema}
          ui={ui}
          model={model}
          onChange={(e) => onChange(index, e)}
        />
      ))}
    </Grid>
  )
}

export default ParcelsForm
