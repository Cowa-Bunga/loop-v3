import ApiDoc from '../index.page'
import { renderWithProviders } from '@test/helpers'

describe('ApiDoc', function () {
  it('should render successfully', () => {
    const { baseElement } = renderWithProviders(<ApiDoc />)

    expect(baseElement).toBeTruthy()
    expect(baseElement).toMatchSnapshot()
  })
})
