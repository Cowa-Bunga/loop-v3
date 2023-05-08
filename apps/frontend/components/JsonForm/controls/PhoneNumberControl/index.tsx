import React from 'react'
import { withJsonFormsControlProps } from '@jsonforms/react'
import { FormControl } from '@mui/material'
import { ISelectControl } from '../controls.interface'
import { formControlStyles } from '../styles'
import MuiPhoneNumber from 'mui-phone-number'

const PhoneNumberControl = ({
  data = 'ZA',
  handleChange,
  path,
  ...rest
}: ISelectControl) => {
  console.log(data)
  return (
    <div id={rest.id}>
      <FormControl fullWidth sx={formControlStyles}>
        <MuiPhoneNumber
          id={`${rest.id}-text-input`}
          label={rest.label}
          defaultCountry={'za'}
          preferredCountries={['za']}
          countryCodeEditable={false}
          onChange={(number) => handleChange(path, number)}
          required={rest.required}
          variant="outlined"
        />
      </FormControl>
    </div>
  )
}

export default withJsonFormsControlProps(PhoneNumberControl)
