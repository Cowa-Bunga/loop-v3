/* eslint-disable @typescript-eslint/ban-ts-comment */

import React from 'react'
import SignIn from '../index.page'
// @ts-ignore
import { withMockAuth } from '@tomfreudenberg/next-auth-mock/jest'
import { renderWithProviders } from '../../../../__test__/test-helpers'
import { MODEL_CLIENT_EMPTY } from '@util/models/client/model'
import { fireEvent } from '@testing-library/react'

const mockRouter = jest.fn()
const mockUseSession = jest.fn()
const mockAuthFirebase = jest.fn()
const mockGetUser = jest.fn()
const mockRouterPush = jest.fn()
const mockActionSubmit = jest.fn()
const mockActionChange = jest.fn()
const mockUseMergeState = jest.fn()
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

// mock default export form ./Actions
jest.mock('../actions', () => ({
  default: jest.fn().mockImplementation(() => ({
    getUser: jest.fn().mockImplementation(() => mockGetUser()),
    submit: jest.fn().mockImplementation(() => mockActionSubmit()),
    change: jest.fn().mockImplementation(() => mockActionChange())
  })),
  __esModule: true
}))

describe('SignIn', () => {
  beforeEach(() => {
    mockUseSession.mockReturnValue({
      status: 'loading',
      data: {}
    })
    mockRouter.mockReturnValue({
      query: {}
    })
    mockAuthFirebase.mockResolvedValue({})
    mockGetUser.mockResolvedValue({})
    mockUseMergeState.mockReturnValue([
      {
        email: '',
        password: ''
      },
      jest.fn()
    ])
  })

  it('should render successfully', () => {
    const { baseElement } = renderWithProviders(withMockAuth(<SignIn />))

    expect(baseElement).toBeTruthy()
    expect(baseElement).toMatchSnapshot()
  })

  it('should render successfully - error', () => {
    mockRouter.mockReturnValue({
      query: {
        error: 'error'
      }
    })

    const { baseElement } = renderWithProviders(withMockAuth(<SignIn />))

    expect(baseElement).toBeTruthy()
    expect(baseElement).toMatchSnapshot()
  })

  it('should redirect the user to the map page', () => {
    mockUseSession.mockReturnValue({
      status: 'authenticated',
      data: {
        user: {
          clients: [MODEL_CLIENT_EMPTY]
        }
      }
    })
    mockRouter.mockReturnValue({
      query: {},
      push: mockRouterPush.mockResolvedValue({})
    })

    renderWithProviders(withMockAuth(<SignIn />))

    expect(mockRouterPush).toHaveBeenCalledWith('/map')
  })

  it('should redirect the user to the client select page', () => {
    mockUseSession.mockReturnValue({
      status: 'authenticated',
      data: {
        user: {
          clients: [MODEL_CLIENT_EMPTY, MODEL_CLIENT_EMPTY, MODEL_CLIENT_EMPTY]
        }
      }
    })
    mockRouter.mockReturnValue({
      query: {},
      push: mockRouterPush.mockResolvedValue({})
    })

    renderWithProviders(withMockAuth(<SignIn />))

    expect(mockRouterPush).toHaveBeenCalledWith('/auth/client_select')
  })

  it('should complete the login form', () => {
    const { baseElement } = renderWithProviders(withMockAuth(<SignIn />))

    const emailInput = baseElement.querySelector('#email')
    const passwordInput = baseElement.querySelector('#password')

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password' } })

    expect(mockActionChange).toHaveBeenCalled()
  })

  it('should submit the login form', () => {
    mockUseMergeState.mockReturnValue([
      {
        email: 'test@test.com',
        password: 'password'
      },
      jest.fn()
    ])

    const { baseElement } = renderWithProviders(withMockAuth(<SignIn />))

    const submitButton = baseElement.querySelector('button[type="submit"]')

    fireEvent.click(submitButton)

    expect(mockActionSubmit).toHaveBeenCalled()
  })
})
