import Dashboard from './map/index.page'
import Signin from './auth/signin/index.page'
import { useSession } from '@hooks'

export function LoopFrontend() {
  const { status } = useSession()
  return status === 'authenticated' ? <Dashboard /> : <Signin />
}

export default LoopFrontend
