import React from 'react'
import { withJsonFormsControlProps } from '@jsonforms/react'

import { FormControl, TextField } from '@mui/material'
import { ISelectControl } from '../controls.interface'
import { formControlStyles } from '../styles'

const TextInputControl = ({
  data = '',
  handleChange,
  path,
  ...rest
}: ISelectControl) => {
  console.log(rest)
  return (
    <div id={rest.id}>
      <FormControl fullWidth sx={formControlStyles}>
        <TextField
          id={`${rest.id}-text-input`}
          label={rest.label}
          required={rest.required}
          value={data}
          variant="outlined"
          type={rest.schema.type == 'integer' ? 'number' : 'text'}
          onChange={(e) => handleChange(path, e.target.value)}
        />
      </FormControl>
    </div>
  )
}

export default withJsonFormsControlProps(TextInputControl)
