import React, { useState } from 'react'
import { withJsonFormsControlProps } from '@jsonforms/react'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Checkbox, ListItemText, MenuItem } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ISelectControl } from '../controls.interface'
import { formControlStyles, MenuProps } from '../styles'

const MultiSelectControl = ({
  // the incoming selected items
  data = [],
  handleChange,
  path,
  ...rest
}: ISelectControl) => {
  const [selected, setSelected] = useState<string[]>([])
  const { t } = useTranslation()

  const onChange = (event: SelectChangeEvent<typeof selected>) => {
    const {
      target: { value }
    } = event
    setSelected(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )

    handleChange(path, selected)
  }

  return (
    <div id={rest.id}>
      <FormControl fullWidth sx={formControlStyles}>
        <InputLabel id={`${rest.id}-label`}>{rest.label}</InputLabel>
        <Select
          labelId={`${rest.id}-label`}
          id={`${rest.id}-checkbox`}
          multiple
          value={selected}
          onChange={onChange}
          renderValue={(selected) => selected.join(', ')}
          required={rest.required}
          MenuProps={MenuProps}
          label={rest.label}
        >
          {rest.schema.enum.map((v: string) => (
            <MenuItem key={v} value={v}>
              <Checkbox checked={selected.includes(v)} />
              <ListItemText primary={t(`${rest.uischema['i18n']}.${v}`)} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default withJsonFormsControlProps(MultiSelectControl)
