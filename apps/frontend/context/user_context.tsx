import { createContext, useContext } from 'react';
import { IClient } from '../../../libs/auth/IclientLogin';

interface IUserContext {
  client: IClient;
  firebase_token: string;
}

const UserContext = createContext({} as IUserContext);

export function UserWrapper({ children }) {
  const sharedState = {} as IUserContext;

  return (
    <UserContext.Provider value={sharedState}>{children}</UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
