import {
  fetchAndActivate,
  FirebaseAppProvider,
  firebaseConfig,
  getRemoteConfig,
  RemoteConfigProvider,
  useInitRemoteConfig
} from '@util/lib/firebase'

const FBAppProvider = (Child) => {
  function Wrapper(props) {
    return (
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <Child {...props} />
      </FirebaseAppProvider>
    )
  }

  return Wrapper
}

const FirebaseHOC = (Child) => {
  function Wrapper(props) {
    const { data: remoteConfigInstance } = useInitRemoteConfig(
      async (firebaseApp) => {
        const remoteConfig = getRemoteConfig(firebaseApp)
        remoteConfig.settings = {
          minimumFetchIntervalMillis: 10000,
          fetchTimeoutMillis: 10000
        }

        await fetchAndActivate(remoteConfig)
        return remoteConfig
      }
    )
    return (
      <RemoteConfigProvider sdk={remoteConfigInstance}>
        <Child {...props} />
      </RemoteConfigProvider>
    )
  }

  return FBAppProvider(Wrapper)
}
export default FirebaseHOC
