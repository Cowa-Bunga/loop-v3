import Register from './auth/register/index.page';
import Dashboard from './dashboard/index.page';
import { useSession } from 'next-auth/react';

export function LoopFrontend() {
  const { data: session } = useSession();
  return session ? <Dashboard /> : <Register />;
}

export default LoopFrontend;
