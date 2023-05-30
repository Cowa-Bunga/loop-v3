import RegionsSelected from '../'
import { renderWithProviders } from '@test/helpers'

const mockUseFirestoreCollectionData = jest.fn() as jest.Mock

jest.mock('@context/user', () => ({
  useUserContext: () => ({
    state: {
      client: {
        client_id: 'clientId'
      }
    }
  })
}))

jest.mock('@hooks', () => ({
  ...jest.requireActual('@hooks'),
  useFirestore: jest.fn(),
  useFirestoreCollectionData: jest.fn()
}))

jest.mock('@util/lib/firebase', () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  firebaseConfig: {}
}))

describe('RegionsSelected', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  xit('should render: loading', () => {
    mockUseFirestoreCollectionData.mockReturnValue({
      status: 'loading'
    })
    const hubs = ['hubId1', 'hubId2']
    const { baseElement } = renderWithProviders(<RegionsSelected hubs={hubs} />)
    expect(baseElement).toMatchSnapshot()
  })

  xit('should render: success', () => {
    mockUseFirestoreCollectionData.mockReturnValue({
      status: 'success',
      data: [
        {
          name: 'test',
          email: 'test',
          mobile_no: 'test',
          vehicle_type: 'test',
          employee_code: 'test',
          location: 'test',
          lunch: 'test',
          available: 'test',
          on_active_trip: 'test',
          idle_since: 'test',
          created_at: 'test'
        }
      ]
    })
    const hubs = ['hubId1', 'hubId2']
    const { baseElement } = renderWithProviders(<RegionsSelected hubs={hubs} />)
    expect(baseElement).toMatchSnapshot()
  })
})
