import { render } from '@testing-library/react'
import { FirebaseAppProvider } from 'reactfire'
import { firebaseConfig } from '@util/lib/firebase'

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
