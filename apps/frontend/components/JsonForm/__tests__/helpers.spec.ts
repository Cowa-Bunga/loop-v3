import { makeInputId } from '../helpers'

describe('helpers', () => {
  describe('makeInputId', () => {
    it('should return the last part of the id', () => {
      expect(makeInputId('#/foo/bar/baz')).toEqual('baz')
    })

    it('should return the last part of the id with a suffix', () => {
      expect(makeInputId('#/foo/bar/baz', 'qux')).toEqual('baz-qux')
    })
  })
})
