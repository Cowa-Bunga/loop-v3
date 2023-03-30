'use client'

import { createContext, useContext } from 'react'
import { useMergeState } from './useMergeState'

const AppContext = createContext({})

export function AppContextWrapper({ children }) {
  const [state, setContext] = useMergeState({})
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>
}

export function useAppContext() {
  return useContext(AppContext)
}
