import React from 'react'
import { render } from '@testing-library/react'
import Menu from '../index'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

describe('Menu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Menu open={true} setOpen={() => ''} />)
    expect(baseElement).toBeTruthy()
    expect(baseElement).toMatchSnapshot()
  })
})
