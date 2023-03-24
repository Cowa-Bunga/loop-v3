import Register from './user/register/index.page';
import Dashboard from './dashboard/index.page';
import { useSession } from 'next-auth/react';

export function LoopFrontend() {
  const { data: session } = useSession();
  console.info('debug:session', session);
  return session ? <Dashboard /> : <Register />;
}

export default LoopFrontend;
