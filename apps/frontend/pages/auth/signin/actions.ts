import { signIn } from 'next-auth/react';

const Actions = (state, setState) => ({
  change: (e, key: string) => {
    setState({ ...state, [key]: e.target.value });
  },

  submit: (e) => {
    e.preventDefault();
    signIn('credentials', {
      // TODO: router version
      callbackUrl: `${window.location.origin}/dashboard`,
      redirect: false,
      email: state.email,
      password: state.password
    }).then(console.warn);
  }
});

export default Actions;
