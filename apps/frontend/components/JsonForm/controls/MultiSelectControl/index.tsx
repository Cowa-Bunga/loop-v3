import React, { useEffect, useState } from 'react'
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
  const { t } = useTranslation()
  const [selected, setSelected] = useState<string[]>(data)

  const onChange = (event: SelectChangeEvent<typeof selected>) => {
    const {
      target: { value }
    } = event
    setSelected(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  useEffect(() => {
    handleChange(path, selected)
    return
  }, [selected])

  const renderTranslatedValue = (values: string[]) => {
    return values
      .map((value) => t(`${rest.uischema['i18n']}.${value}`))
      .join(', ')
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
          renderValue={(selected) => renderTranslatedValue(selected)}
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
