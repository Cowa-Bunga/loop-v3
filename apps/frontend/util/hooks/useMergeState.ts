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
  object: T = {} as T
): [T, (newState: T) => void] => {
  const [state, setState] = useState(object)

  const mergeState = (newState: T) => {
    const mergedState = deepmerge(state, object)
    console.warn('%c setState:\n', 'color: teal; font-weight: bold;', {
      mutation: newState,
      old: state,
      new: mergedState
    })
    setState(mergedState)
  }

  return [state as T, mergeState as (newState: T) => void]
}
