import React from 'react'
import { render } from '@testing-library/react'
import NavBar from '../index'
import { withMockAuth } from '@tomfreudenberg/next-auth-mock/jest'

describe('NavBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      withMockAuth(<NavBar open={false} setOpen={() => ''} />)
    )
    expect(baseElement).toBeTruthy()
    expect(baseElement).toMatchSnapshot()
  })
})
