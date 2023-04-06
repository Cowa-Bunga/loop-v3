import { Auth, signInWithCustomToken } from 'firebase/auth'

export const firebaseConfigDev = {
  apiKey: 'AIzaSyCgiluwpE3dNxGLL_iAPaV4SKZDTm_tpME',
  authDomain: 'cb-dev-298308.firebaseapp.com',
  projectId: 'cb-dev-298308',
  storageBucket: 'cb-dev-298308.appspot.com',
  messagingSenderId: '997363095290',
  appId: '1:997363095290:web:ac9608e141fa8ad93ddb43',
  measurementId: 'G-3P6K67GJB2',
  experimentalForceLongPolling: true
}

export const firebaseConfigProd = {
  apiKey: 'AIzaSyAw1rb33HQJAgqCt_rYRL6C_6kJNVBSGIc',
  authDomain: 'cb-prod-297913.firebaseapp.com',
  projectId: 'cb-prod-297913',
  storageBucket: 'cb-prod-297913.appspot.com',
  messagingSenderId: '136986454700',
  appId: '1:136986454700:web:e43ad1edeba6da3cd1cd09',
  measurementId: 'G-03ZPMNVXTZ',
  experimentalForceLongPolling: true
}

export const firebaseAppConfig =
  process.env.NODE_ENV === 'production' ? firebaseConfigProd : firebaseConfigDev

export async function authFirebase(firebaseAuth: Auth, token: string) {
  return signInWithCustomToken(firebaseAuth, token)
}
