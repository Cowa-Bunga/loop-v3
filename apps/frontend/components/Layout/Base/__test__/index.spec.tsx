import React from 'react'
import LayoutBase from '../index'
import { renderWithProviders } from '@test/helpers'

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}))

describe('LayoutBase', () => {
  it('should render successfully', () => {
    const { baseElement } = renderWithProviders(<LayoutBase>panel</LayoutBase>)
    expect(baseElement).toBeTruthy()
    expect(baseElement).toMatchSnapshot()
  })
})
