import { withJsonFormsControlProps } from '@jsonforms/react'
import { Autocomplete, FormControl, TextField } from '@mui/material'
import { ISelectControl } from '../controls.interface'
import { formControlStyles } from '../styles'
import { makeInputId } from '../../helpers'

const AutoCompleteControl = ({ data = [], handleChange, path, ...rest }: ISelectControl) => {
  return (
    <div id={makeInputId(rest.id)}>
      <FormControl fullWidth sx={formControlStyles}>
        <Autocomplete
          disablePortal
          id={makeInputId(rest.id, 'auto-complete')}
          options={rest.schema.enum}
          renderInput={(params) => <TextField {...params} label={rest.label} required={rest.required} />}
        />
      </FormControl>
    </div>
  )
}

export default withJsonFormsControlProps(AutoCompleteControl)
