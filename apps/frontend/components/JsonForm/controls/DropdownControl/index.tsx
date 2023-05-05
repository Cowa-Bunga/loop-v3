import React from 'react'
import { withJsonFormsControlProps } from '@jsonforms/react'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { ListItemText, MenuItem } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { formControlStyles, MenuProps } from '../styles'
import { ISelectControl } from '../controls.interface'

const DropdownControl = ({
  data = [],
  handleChange,
  path,
  ...rest
}: ISelectControl) => {
  const { t } = useTranslation()
  console.log(rest)
  return (
    <div id={rest.id}>
      <FormControl fullWidth sx={formControlStyles}>
        <InputLabel id={`${rest.id}-label`}>{rest.label}</InputLabel>
        <Select
          labelId={`${rest.id}-label`}
          id={`${rest.id}-checkbox`}
          value={data}
          onChange={(e) => handleChange(path, e.target.value)}
          required={rest.required}
          MenuProps={MenuProps}
          label={rest.label}
        >
          {rest.schema.enum.map((v: string) => (
            <MenuItem key={v} value={v}>
              <ListItemText primary={t(`${rest.uischema['i18n']}.${v}`)} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default withJsonFormsControlProps(DropdownControl)
