import React from 'react'
import { render } from '@testing-library/react'
import LayoutSite from '../index'
// @ts-ignore
import { withMockAuth } from '@tomfreudenberg/next-auth-mock/jest'

describe('LayoutSite', () => {
  it('should render successfully', () => {
    const { baseElement } = render(withMockAuth(<LayoutSite>panel</LayoutSite>))
    expect(baseElement).toBeTruthy()
    expect(baseElement).toMatchSnapshot()
  })
})
