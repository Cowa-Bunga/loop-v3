import React, { useEffect } from 'react'
import { withJsonFormsControlProps } from '@jsonforms/react'
import { FormControl } from '@mui/material'
import { ISelectControl } from '../controls.interface'
import { formControlStyles } from '../styles'
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-google-places-autocomplete'
import { useMergeState } from '@hooks'
import { makeInputId } from '../../helpers'

const GooglePlacesControl = ({
  data = '',
  handleChange,
  path,
  ...rest
}: ISelectControl) => {
  const [state, setState] = useMergeState({
    address: data
  })
  useEffect(() => {
    if (data == '') return

    if (rest.schema['options']['update_lat_long']) {
      geocodeByAddress(data)
        .then((results) => getLatLng(results[0]))
        .then((latLng) => {
          handleChange('latitude', latLng.lat)
          handleChange('longitude', latLng.lng)
        })
        .catch((error) => console.error('Error', error))
    }
    return
  }, [data])

  return (
    <div id={makeInputId(rest.id)}>
      <FormControl fullWidth sx={formControlStyles}>
        <GooglePlacesAutocomplete
          minLengthAutocomplete={4}
          selectProps={{
            placeholder: rest.label,
            required: rest.required,
            inputValue: state.address,
            onChange: (e) => handleChange(path, e.label),
            onInputChange: (e) => setState({ address: e }),
            styles: {
              input: (provided) => ({
                ...provided,
                padding: '11px 14px',
                // This just prevents the input from pushing the colum width
                maxWidth: '1px'
              }),
              menu: (provided) => ({
                ...provided,
                zIndex: 100
              }),
              dropdownIndicator: (provided) => ({
                ...provided,
                display: 'none'
              }),
              indicatorSeparator: (provided) => ({
                ...provided,
                display: 'none'
              })
            }
          }}
          apiKey={rest.schema['options']['api_key']}
        />
      </FormControl>
    </div>
  )
}

export default withJsonFormsControlProps(GooglePlacesControl)
