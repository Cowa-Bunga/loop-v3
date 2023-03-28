import axios from 'axios'
import { signIn } from 'next-auth/react'

const Actions = () => ({
  submit: (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const info = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password')
    }
    axios.post('http://localhost:3333/api/user', info).then((res) => {
      if (res.data) {
        signIn('credentials', {
          redirect: false,
          email: info.email,
          password: info.password
        })
      }
    })
  }
})

export default Actions
