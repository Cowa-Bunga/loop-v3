import { render } from '@testing-library/react'
import { FirebaseAppProvider } from 'reactfire'
import { firebaseConfig } from '@util/lib/firebase'
import '@locale/config'

if (process.env.NODE_ENV === 'test') {
  console.info = console.log = console.warn = console.error = () => ''
}

export const renderWithProviders = (ui: JSX.Element) => {
  return {
    ...render(ui, {
      wrapper: ({ children }) => (
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          {children}
        </FirebaseAppProvider>
      )
    })
  }
}
