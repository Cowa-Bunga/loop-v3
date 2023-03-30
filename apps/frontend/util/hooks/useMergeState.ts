import { useState } from 'react'
import { deepmerge } from '@mui/utils'

/**
 * @desc deep merge state objects augmentor
 * @prop {object} object - initial state object
 */
export const useMergeState = <T>(
  object: T = {} as T
): [T, (newState: T) => void] => {
  const [state, setState] = useState(object)
  const mergeState = (newState: T) => setState(deepmerge(state, newState))
  return [state as T, mergeState as (newState: T) => void]
}
