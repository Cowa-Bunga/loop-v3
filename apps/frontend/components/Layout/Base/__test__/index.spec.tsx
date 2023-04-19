import React from 'react'
import LayoutBase from '../index'
import { withMockAuth } from '@tomfreudenberg/next-auth-mock/jest'
import { renderWithProviders } from '../../../../test/helpers'

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}))

describe('LayoutBase', () => {
  it('should render successfully', () => {
    const { baseElement } = renderWithProviders(
      withMockAuth(<LayoutBase>panel</LayoutBase>)
    )
    expect(baseElement).toBeTruthy()
    expect(baseElement).toMatchSnapshot()
  })
})
