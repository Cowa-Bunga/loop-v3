import React, { useState } from 'react'
import { withJsonFormsControlProps } from '@jsonforms/react'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Checkbox, ListItemText, MenuItem } from '@mui/material'
import { JsonSchema, UISchemaElement } from '@jsonforms/core'
import { useTranslation } from 'react-i18next'

interface IMultiSelectControl {
  data: any
  path: string
  label: string
  schema: JsonSchema
  uischema: UISchemaElement

  handleChange(path: string, value: any): void
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

const MultiSelectControl = ({
  // the incoming selected items
  data = [],
  handleChange,
  path,
  ...rest
}: IMultiSelectControl) => {
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
    <>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel id="demo-multiple-checkbox-label">{rest.label}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selected}
          onChange={onChange}
          renderValue={(selected) => selected.join(', ')}
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
    </>
  )
}

export default withJsonFormsControlProps(MultiSelectControl)
