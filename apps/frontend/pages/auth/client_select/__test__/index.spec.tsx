/* eslint-disable @typescript-eslint/ban-ts-comment */

import {
  renderWithProviders,
  selectMaterialUiSelectOption
} from '../../../../test/helpers'
// @ts-ignore
import { withMockAuth } from '@tomfreudenberg/next-auth-mock/jest'
import ClientSelect from '@pages/auth/client_select/index.page'
import React from 'react'
import { MODEL_CLIENT_EMPTY } from '@util/models/client/model'
import { fireEvent } from '@testing-library/react'

const mockRouter = jest.fn()
const mockRouterPush = jest.fn()
const mockUseSession = jest.fn()
const mockAuthFirebase = jest.fn()
const mockUseMergeState = jest.fn()
const mockActionSubmit = jest.fn()
const mockActionChange = jest.fn()
const mockClients = [
  {
    ...MODEL_CLIENT_EMPTY,
    client_id: '1',
    name: 'client 1'
  },
  {
    ...MODEL_CLIENT_EMPTY,
    client_id: '2',
    name: 'client 2'
  }
]
jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn().mockImplementation(() => mockRouter())
}))

jest.mock('@hooks', () => ({
  ...jest.requireActual('@hooks'),
  useSession: jest.fn().mockImplementation(() => mockUseSession()),
  useMergeState: jest.fn().mockImplementation(() => mockUseMergeState())
}))

jest.mock('@util/lib/firebase', () => ({
  ...jest.requireActual('@util/lib/firebase'),
  authFirebase: jest.fn().mockImplementation(() => mockAuthFirebase())
}))

jest.mock('../actions', () => ({
  default: jest.fn().mockImplementation(() => ({
    change: jest.fn().mockImplementation(() => mockActionChange()),
    submit: jest.fn().mockImplementation(() => mockActionSubmit())
  })),
  __esModule: true
}))
describe('ClientSelect', () => {
  beforeEach(() => {
    mockUseSession.mockReturnValue({
      status: 'loading',
      data: {}
    })
    mockRouter.mockReturnValue({
      query: {}
    })
    mockAuthFirebase.mockResolvedValue({})
    mockUseMergeState.mockReturnValue([
      {
        client_id: '',
        clientSelected: false,
        clients: []
      },
      jest.fn()
    ])
  })

  it('should render successfully', () => {
    const { baseElement } = renderWithProviders(withMockAuth(<ClientSelect />))

    expect(baseElement).toBeTruthy()
    expect(baseElement).toMatchSnapshot()
  })

  it('should render successfully - error', () => {
    mockRouter.mockReturnValue({
      query: {
        error: 'error'
      }
    })

    const { baseElement } = renderWithProviders(withMockAuth(<ClientSelect />))

    expect(baseElement).toBeTruthy()
    expect(baseElement).toMatchSnapshot()
  })

  it('should trigger onChange event when select list updated', async () => {
    const clients = [...mockClients]
    mockUseMergeState.mockImplementation(() => [
      {
        client_id: '1',
        clientSelected: false,
        clients
      },
      jest.fn()
    ])

    const { baseElement, getByTestId } = renderWithProviders(
      withMockAuth(<ClientSelect />)
    )

    const select = getByTestId('client-select')
    selectMaterialUiSelectOption(select, 'client 2')
    expect(mockActionChange).toHaveBeenCalled()

    const submitButton = baseElement.querySelector('button[type="submit"]')
    fireEvent.click(submitButton)
    expect(mockActionSubmit).toHaveBeenCalled()
  })

  it('should push sot /dashboard when client is selected', async () => {
    const clients = [...mockClients]
    mockUseMergeState.mockImplementation(() => [
      {
        client_id: '1',
        clientSelected: true,
        clients
      },
      jest.fn()
    ])
    mockUseSession.mockReturnValue({
      status: 'authenticated',
      data: {
        user: {
          clients
        }
      }
    })
    mockRouter.mockReturnValue({
      query: {},
      push: mockRouterPush.mockResolvedValue({})
    })

    renderWithProviders(withMockAuth(<ClientSelect />))

    expect(mockRouterPush).toHaveBeenCalledWith('/dashboard')
  })
})
