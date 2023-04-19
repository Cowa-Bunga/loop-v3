import Actions from '../actions'

describe('Actions', () => {
  it('should be defined', () => {
    expect(Actions).toBeDefined()
  })

  describe('', () => {
    const baseDocument = {
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

    const baseExpect = {
      id: 'test',
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
    it('should return IDriver[] (id) from Actions.modelDrivers', () => {
      const mockState = {}
      const mockSetState = jest.fn()

      const documents = [
        {
          id: 'test',
          ...baseDocument
        }
      ]
      const actions = Actions(mockState, mockSetState)

      const result = actions.modelDrivers(documents)

      expect(result).toEqual([
        {
          ...baseExpect
        }
      ])
    })

    it('should return IDriver[] (NO_ID_FIELD) from Actions.modelDrivers', () => {
      const mockState = {}
      const mockSetState = jest.fn()

      const documents = [
        {
          NO_ID_FIELD: 'test',
          ...baseDocument
        }
      ]
      const actions = Actions(mockState, mockSetState)

      const result = actions.modelDrivers(documents)

      expect(result).toEqual([
        {
          ...baseExpect
        }
      ])
    })
  })

  describe('stringAvatar', () => {
    it('should return a valid style object code from Actions.stringAvatar (full name)', () => {
      const mockState = {}
      const mockSetState = jest.fn()

      const actions = Actions(mockState, mockSetState)

      const result = actions.stringAvatar('test test')

      expect(result).toEqual({
        sx: {
          bgcolor: '#60fb30'
        },
        children: 'tt'
      })
    })

    it('should return a valid style object code from Actions.stringAvatar (first name)', () => {
      const mockState = {}
      const mockSetState = jest.fn()

      const actions = Actions(mockState, mockSetState)

      const result = actions.stringAvatar('test')

      expect(result).toEqual({
        sx: {
          bgcolor: '#924436'
        },
        children: 't'
      })
    })
  })
})
