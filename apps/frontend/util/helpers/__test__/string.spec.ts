import { stringAvatar } from '@util/helpers'

describe('stringAvatar', () => {
  it('should return a valid style object code from Actions.stringAvatar (full name)', () => {
    const result = stringAvatar('test test')

    expect(result).toEqual({
      sx: {
        bgcolor: '#60fb30'
      },
      children: 'tt'
    })
  })

  it('should return a valid style object code from Actions.stringAvatar (first name)', () => {
    const result = stringAvatar('test')

    expect(result).toEqual({
      sx: {
        bgcolor: '#924436'
      },
      children: 't'
    })
  })
})
