export const mock = [
  {
    key: 'task-1',
    title: 'South Africa',
    children: [
      {
        key: 'task-1-1',
        title: 'Western Cape',
        data: {
          startDate: '2023-04-05T08:00:00.000Z',
          endDate: '2024-10-05T08:00:00.000Z'
        },
        children: [
          {
            key: 'task-1-1-1',
            title: 'John Smith',
            data: {
              startDate: '2023-06-05T08:00:00.000Z',
              endDate: '2023-06-05T09:00:00.000Z'
            }
          }
        ]
      },
      {
        key: 'task-1-2',
        title: 'Mr T',
        data: {
          startDate: '2023-06-05T08:00:00.000Z',
          endDate: '2023-06-05T09:00:00.000Z'
        }
      }
    ]
  }
  // {
  //   key: 'task-2',
  //   title: 'Some monthly repeating task',
  //   data: {
  //     startDate: '2023-04-05T08:00:00.000Z',
  //     endDate: '2024-10-05T08:00:00.000Z'
  //   }
  // }
]
