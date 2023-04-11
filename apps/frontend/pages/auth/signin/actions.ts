import { signIn } from 'next-auth/react'
import { IHub, IMeInterface, IRegion } from '@pages/api/me/me.interface'

const Actions = (state, setState) => ({
  change: (key: string, value: string) => {
    setState({ [key]: value })
  },

  submit: async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    signIn('credentials', {
      callbackUrl: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/dashboard`,
      redirect: false,
      email: state.email,
      password: state.password
    }).then(console.warn)
  },

  async getUser(): Promise<object> {
    const res = await fetch('/api/me')
    const data: IMeInterface = await res.json()

    return {
      id: data.user.id,
      firstName: data.user.firstname,
      lastName: data.user.lastname,
      mobileNo: data.user.mobile_no,
      organization: data.organization,
      hubs: data.hubs.filter((hub) => hub.branches.length > 0),
      regions: removeEmptyHubs(data.hubs, data.regions).filter(
        (region) => region.hub_ids?.length > 0
      )
    }
  }
})

const removeEmptyHubs = (hubs: IHub[], regions: IRegion[]) => {
  const non_empty_hubs = hubs.filter((hub: IHub) => hub.branches.length > 0)

  return regions.filter((region: IRegion) => {
    return region.hub_ids.some(
      (hub_id: string) =>
        non_empty_hubs.findIndex((hub: IHub) => hub.id == hub_id) >= 0
    )
  })
}
export default Actions
