import { withJsonFormsControlProps } from '@jsonforms/react'
import { FormControl, TextField } from '@mui/material'
import { ISelectControl } from '../controls.interface'
import { formControlStyles } from '../styles'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { makeInputId } from '../../helpers'

const TextInputControl = ({ data = '', handleChange, path, ...rest }: ISelectControl) => {
  return (
    <div id={makeInputId(rest.id)}>
      <FormControl fullWidth sx={formControlStyles}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label={rest.label}
            onChange={(e) => handleChange(path, e)}
            renderInput={(props) => <TextField {...props} required={rest.required} />}
            value={data}
          />
        </LocalizationProvider>
      </FormControl>
    </div>
  )
}

export default withJsonFormsControlProps(TextInputControl)
