import { PermissionsProvider, usePermissions } from '@util/rules/permissions'
import { renderWithProviders } from '@test/helpers'
import { useUserContext } from '@context/user'

const mockUseUserContext = useUserContext as jest.Mock
jest.mock('@context/user', () => ({
  useUserContext: jest.fn()
}))

const TestingComponent = () => {
  const { canAccess } = usePermissions()
  return (
    <>
      {canAccess(['fleet:access']) && <div>fleet</div>}
      {canAccess(['admin:access']) && <div>admin</div>}
      {canAccess(['order:create']) && <div>order</div>}
    </>
  )
}

describe('<PermissionsProvider />', () => {
  it('should render the fleet component when the user has fleet access', () => {
    mockUseUserContext.mockReturnValue({
      state: {
        permissions: {
          fleet: true
        }
      }
    })
    const { container } = renderWithProviders(
      <PermissionsProvider>
        <TestingComponent />
      </PermissionsProvider>
    )
    expect(container).toMatchSnapshot()
  })

  it('should render the fleet component when the user has admin access', () => {
    mockUseUserContext.mockReturnValue({
      state: {
        permissions: {
          administrator: true
        }
      }
    })
    const { container } = renderWithProviders(
      <PermissionsProvider>
        <TestingComponent />
      </PermissionsProvider>
    )
    expect(container).toMatchSnapshot()
  })

  it('should render the order create component when the order:create has admin access', () => {
    mockUseUserContext.mockReturnValue({
      state: {
        permissions: {
          scopes: ['order:create']
        }
      }
    })
    const { container } = renderWithProviders(
      <PermissionsProvider>
        <TestingComponent />
      </PermissionsProvider>
    )
    expect(container).toMatchSnapshot()
  })
})
