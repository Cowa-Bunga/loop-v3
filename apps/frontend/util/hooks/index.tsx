// @see: usehooks-ts.com
export * from 'usehooks-ts';

// @see: react.dev
export {
  useState,
  useCallback,
  memo,
  useContext,
  useEffect,
  useDebugValue,
  useImperativeHandle,
  useInsertionEffect,
  useDeferredValue,
  useLayoutEffect,
  useMemo,
  useReducer,
  useSyncExternalStore,
  useTransition
} from 'react';

// @see: nextjs.org
export { useRouter } from 'next/router';
export { useSearchParams } from 'next/navigation';

// custom hooks
export { useMergeState } from './useMergeState';
export { useAppContext } from './useAppContext';

// firebase / reactfire
export { useFirebaseApp } from 'reactfire';

// next/auth
export { useSession } from 'next-auth/react';

// translations
export { useTranslation } from 'react-i18next';
