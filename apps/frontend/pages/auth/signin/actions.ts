import { signIn } from 'next-auth/react'

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

  async getUser(client: IClient, cb: (updated: object) => void): Promise<void> {
    const res = await fetch('/api/me')
    const data: IMeInterface = await res.json()

    cb({
      id: data.user.id,
      client: client,
      firstName: data.user.firstname,
      lastName: data.user.lastname,
      mobileNo: data.user.mobile_no,
      organization: data.organization,
      hubs: data.hubs.filter((hub) => hub.branches.length > 0),
      regions: removeEmptyHubs(data.hubs, data.regions).filter(
        (region) => region.hub_ids?.length > 0
      )
    })
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
