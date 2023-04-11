import { initializeApp } from 'firebase/app'
import { Auth, signInWithCustomToken } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDIbl1MrXQRkYihSN0U1mL-qnEOIDksdx4',
  authDomain: 'cb-dev-298308.firebaseapp.com',
  databaseURL:
    'https://cb-dev-298308-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'cb-dev-298308',
  storageBucket: 'cb-dev-298308.appspot.com',
  messagingSenderId: '997363095290',
  appId: '1:997363095290:web:dc024aadbda17e7b3ddb43',
  measurementId: 'G-07SR2DKDKX'
}

const app = initializeApp(firebaseConfig)

async function authFirebase(firebaseAuth: Auth, token: string) {
  return signInWithCustomToken(firebaseAuth, token)
}

export { app, authFirebase, firebaseConfig }
