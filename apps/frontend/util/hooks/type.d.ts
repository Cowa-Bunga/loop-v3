// useAppContext.ts
interface ContextProps {
  state: unknown
  setContext: (state: unknown) => void
}

interface Props {
  children: React.ReactNode
}
