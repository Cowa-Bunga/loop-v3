import { withJsonFormsControlProps } from '@jsonforms/react'
import { Checkbox, FormControl, FormControlLabel } from '@mui/material'
import { ISelectControl } from '../controls.interface'
import { makeInputId } from '../../helpers'

const CheckboxControl = ({ data = false, handleChange, path, ...rest }: ISelectControl) => {
  return (
    <div id={makeInputId(rest.id)}>
      <FormControl fullWidth style={{ margin: '23px 0' }}>
        <FormControlLabel
          id={makeInputId(rest.id, 'checkbox')}
          label={rest.label}
          control={<Checkbox checked={Boolean(data)} onChange={(e) => handleChange(path, e.target.checked)} />}
        />
      </FormControl>
    </div>
  )
}

export default withJsonFormsControlProps(CheckboxControl)
