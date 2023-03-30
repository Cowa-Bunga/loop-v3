'use client'

import { createContext, useContext } from 'react'
import { useMergeState } from './useMergeState'

const AppContext = createContext<ContextProps>({
  state: {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setContext: () => {}
})

export function AppContextWrapper({ children }: Props): JSX.Element {
  const [state, setContext] = useMergeState({})
  return (
    <AppContext.Provider value={{ state, setContext }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const { state, setContext } = useContext(AppContext)
  return [state, setContext]
}
