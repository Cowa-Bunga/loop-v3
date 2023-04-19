import fetchMock from 'jest-fetch-mock'

const mockRouter = jest.fn()
const mockUseSession = jest.fn()
const mockAuthFirebase = jest.fn()

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn().mockImplementation(() => mockRouter())
}))

jest.mock('@hooks', () => ({
  ...jest.requireActual('@hooks'),
  useSession: jest.fn().mockImplementation(() => mockUseSession())
}))

jest.mock('@util/lib/firebase', () => ({
  ...jest.requireActual('@util/lib/firebase'),
  authFirebase: jest.fn().mockImplementation(() => mockAuthFirebase())
}))

jest.mock('next-auth/react', () => ({
  ...jest.requireActual('next-auth/react')
}))

global.fetch = fetchMock

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}))

Math.random = jest.fn(() => 0.5)
