import Dashboard from './dashboard/index.page'
import { useEffect, useRouter, useSession } from '@hooks'

export function LoopFrontend() {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin')
    }
  }, [router, session])

  return <Dashboard />
}

export default LoopFrontend
