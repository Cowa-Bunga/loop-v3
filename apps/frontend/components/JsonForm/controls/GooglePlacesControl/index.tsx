import React from 'react'
import { withJsonFormsControlProps } from '@jsonforms/react'
import { FormControl } from '@mui/material'
import { ISelectControl } from '../controls.interface'
import { formControlStyles } from '../styles'
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-google-places-autocomplete'

const GooglePlacesControl = ({
  data = '',
  handleChange,
  path,
  ...rest
}: ISelectControl) => {
  const onChange = (address: string) => {
    handleChange(path, address)

    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        if (rest.schema['options']['update_lat_long']) {
          handleChange('latitude', latLng.lat)
          handleChange('longitude', latLng.lng)
        }
      })
      .catch((error) => console.error('Error', error))
  }

  return (
    <div id={rest.id}>
      <FormControl fullWidth sx={formControlStyles}>
        <GooglePlacesAutocomplete
          minLengthAutocomplete={4}
          selectProps={{
            placeholder: rest.label,
            required: rest.required,
            inputValue: data.length > 60 ? data.substring(0, 60) + '...' : data,
            onChange: (e) => onChange(e.label),
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
