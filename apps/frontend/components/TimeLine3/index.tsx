import { Gantt, GanttDataType } from 'react-virtual-gantt'
import { mock } from './mock'

export default function TimelineGantt({ data }) {
  return (
    <div
      style={{
        height: '300px',
        '& *': {
          background: 'black !important',
          color: 'white !important'
        }
      }}
    >
      <Gantt>
        <Gantt.Controls />
        <Gantt.Chart data={mock} style={{ background: 'red' }} />
      </Gantt>
    </div>
  )
}
