import { useState } from 'react'
import { deepmerge } from '@mui/utils'

/**
 * @function useMergeState
 * @desc deep merge state objects augmentor
 * @prop {object} object - initial state object
 * @example
 * const [state, setState] = useMergeState({ foo: 'bar' })
 * setState({ baz: 'qux' })
 *  // state = { foo: 'bar', baz: 'qux' }
 */
export const useMergeState = <T>(
  initState: T = {} as T
): [T, (initState: T) => void] => {
  const [state, origSetState] = useState(initState)

  const setState = (mutation: T, cb) => {
    let merged: T

    origSetState((_state) => {
      merged = deepmerge(_state, mutation)
      if (process.env.NODE_ENV === 'development') {
        console.debug('%c setMergeState: \n', 'color: aquamarine', {
          mutation,
          previous: _state
        })
      }
      if (cb) {
        cb(merged)
      }
      return merged
    })
  }

  return [state as T, setState as (mutation: T) => void]
}
