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
    let merged
    origSetState((_state: unknown) => {
      merged = deepmerge(_state, mutation)
      return merged
    })

    if (cb) {
      cb(merged)
    }

    if (process.env.NODE_ENV === 'development') {
      console.debug('%c setMergeState: \n', 'color: silver', {
        mutation,
        old: state,
        new: merged
      })
    }
  }

  return [state as T, setState as (mutation: T) => void]
}
