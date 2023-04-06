import React from 'react'
import { render } from '@testing-library/react'
import Loader from '../index'

describe('Loader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Loader />)
    expect(baseElement).toBeTruthy()
    expect(baseElement).toMatchSnapshot()
  })
})
