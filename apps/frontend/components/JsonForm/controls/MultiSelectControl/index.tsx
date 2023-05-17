import React, { useEffect } from 'react'
import { withJsonFormsControlProps } from '@jsonforms/react'
import { InputLabel, FormControl, Select } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { Checkbox, ListItemText, MenuItem } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ISelectControl } from '../controls.interface'
import { formControlStyles, MenuProps } from '../styles'
import { useMergeState } from '@hooks'
import { makeInputId } from '../../helpers'

const MultiSelectControl = ({
  // the incoming selected items
  data = [],
  handleChange,
  path,
  ...rest
}: ISelectControl) => {
  const { t } = useTranslation()

  const [state, setState] = useMergeState({
    selected: data
  })

  const onChange = (event: SelectChangeEvent<typeof state.selected>) => {
    const {
      target: { value }
    } = event
    const oneOf = rest.schema['options']?.['oneOf'] ?? []
    const selected = value.filter((v) => oneOf.includes(v))

    if (selected.length > 1) {
      // Think of a viable way to inform the user of why this is not allowed
      return
    }

    setState(
      // On autofill we get a stringified value.
      { selected: value }
    )
  }

  useEffect(() => {
    handleChange(path, state.selected)
    return
  }, [state.selected])

  const renderTranslatedValue = (values: string[]) => {
    return values
      .map((value) => t(`${rest.uischema['i18n']}.${value}`))
      .join(', ')
  }

  return (
    <div id={makeInputId(rest.id)}>
      <FormControl fullWidth sx={formControlStyles}>
        <InputLabel id={makeInputId(rest.id, 'label')}>{rest.label}</InputLabel>
        <Select
          id={makeInputId(rest.id, 'select')}
          labelId={makeInputId(rest.id, 'label')}
          multiple
          value={state.selected}
          onChange={onChange}
          renderValue={(selected) => renderTranslatedValue(selected)}
          required={rest.required}
          MenuProps={MenuProps}
          label={rest.label}
        >
          {rest.schema.enum.map((v: string) => (
            <MenuItem key={v} value={v}>
              <Checkbox checked={state.selected.includes(v)} />
              <ListItemText primary={t(`${rest.uischema['i18n']}.${v}`)} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default withJsonFormsControlProps(MultiSelectControl)
