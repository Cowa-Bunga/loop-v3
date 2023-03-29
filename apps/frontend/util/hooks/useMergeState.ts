import { useState } from 'react'
import { deepmerge } from '@mui/utils';


/**
 * @desc deep merge state objects
 */
export const useMergeState = (object: any = {}) => {
  const [state, setState] = useState(object)
  const mergeState = (newState: any) => setState(deepmerge(state, newState))
  return [state, mergeState]
}
