import React from 'react'
import { withJsonFormsControlProps } from '@jsonforms/react'

import { Checkbox, FormControl, FormControlLabel } from '@mui/material'
import { ISelectControl } from '../controls.interface'

const CheckboxControl = ({
  data = false,
  handleChange,
  path,
  ...rest
}: ISelectControl) => {
  return (
    <div id={rest.id}>
      <FormControl fullWidth style={{ margin: '23px 0' }}>
        <FormControlLabel
          id={`${rest.id}-checkbox`}
          label={rest.label}
          control={
            <Checkbox
              checked={data}
              onChange={(e) => handleChange(path, e.target.value)}
            />
          }
        />
      </FormControl>
    </div>
  )
}

export default withJsonFormsControlProps(CheckboxControl)
