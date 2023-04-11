import { render } from '@testing-library/react';
import { FirebaseAppProvider } from 'reactfire';

const firebaseConfigMock = {
  apiKey: 'mock-api-key',
  authDomain: 'mock-auth-domain',
  projectId: 'mock-project-id',
  storageBucket: 'mock-storage-bucket',
  messagingSenderId: 'mock-messaging-sender-id',
  appId: 'mock-app-id',
  measurementId: 'mock-measurement-id',
  experimentalForceLongPolling: true
};
export const renderWithProviders = (ui: JSX.Element) => {
  return {
    ...render(ui, {
      wrapper: ({ children }) => (
        <FirebaseAppProvider firebaseConfig={firebaseConfigMock}>
          {children}
        </FirebaseAppProvider>
      )
    })
  };
};
