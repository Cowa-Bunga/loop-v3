import React from 'react'
import { render } from '@testing-library/react'
import TabPanel from '../index'

describe('TabPanel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TabPanel value={1} index={1}>
        panel
      </TabPanel>
    )
    expect(baseElement).toBeTruthy()
    expect(baseElement).toMatchSnapshot()
  })
})
