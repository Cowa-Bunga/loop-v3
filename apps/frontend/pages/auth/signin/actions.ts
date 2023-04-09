import { signIn } from 'next-auth/react'

const Actions = (state, setState) => ({
  change: (key: string, value: string) => {
    setState({ [key]: value })
  },

  submit: (e: { preventDefault: () => void }) => {
    e.preventDefault()
    signIn('credentials', {
      callbackUrl: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/map`,
      redirect: false,
      email: state.email,
      password: state.password
    }).then(console.warn)
  }
})

export default Actions
