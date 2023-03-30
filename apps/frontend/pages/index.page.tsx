import Dashboard from './dashboard/index.page';
import { useSession } from 'next-auth/react';
import SignIn from './auth/signin/index.page';

export function LoopFrontend() {
  const { data: session } = useSession();
  return session ? <Dashboard /> : <SignIn />;
}

export default LoopFrontend;
