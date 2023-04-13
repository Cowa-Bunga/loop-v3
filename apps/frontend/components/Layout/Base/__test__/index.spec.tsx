import React from 'react'
import LayoutBase from '../index'
// @ts-ignore
import { withMockAuth } from '@tomfreudenberg/next-auth-mock/jest'
import { renderWithProviders } from '../../../../__test__/test-helpers'

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
