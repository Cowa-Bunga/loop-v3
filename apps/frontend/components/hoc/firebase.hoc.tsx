import { getFirestore } from 'firebase/firestore';
import { FirestoreProvider, useFirebaseApp } from 'reactfire';

const FirebaseHOC = (Component) => {
  return function HOCWrapper(props) {
    const firestoreInstance = getFirestore(useFirebaseApp());
    return (
      <FirestoreProvider sdk={firestoreInstance}>
        <Component {...props} />
      </FirestoreProvider>
    );
  };
};
export default FirebaseHOC;
