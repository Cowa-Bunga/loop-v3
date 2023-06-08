import MOCK from '../maps/shared/reme.json'

export const mock = [
  {
    key: 'route',
    title: 'Reme',
    data: MOCK.map((v) => ({
      id: v.timestamp,
      name: v.location.toString(),
      start: v.timestamp,
      end: v.timestamp
    }))
  }
]
