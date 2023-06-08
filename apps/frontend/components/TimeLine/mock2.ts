import MOCK from '../maps/shared/reme.json'

export const channels = ['reme'].map((v) => ({
  logo: `/driver1.jpg`,
  uuid: v
}))

export const epg = MOCK.map((v) => ({
  channelUuid: 'reme',
  description: '',
  id: v.timestamp,
  image: '/loop-log-icon.png',
  since: v.timestamp,
  till: new Date(new Date(v.timestamp).getTime() + 1 * 60000),
  title: v.location
}))
