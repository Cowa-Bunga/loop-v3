import { render } from '@testing-library/react'

import CreateJob from '../index'

describe('CreateJob', () => {
  it('should render open', () => {
    const { baseElement } = render(
      <CreateJob handleClose={console.log} isOpen={true} />
    )
    expect(baseElement).toMatchSnapshot()
  })

  it('should render closed', () => {
    const { baseElement } = render(
      <CreateJob handleClose={console.log} isOpen={false} />
    )
    expect(baseElement).toMatchSnapshot()
  })
})
