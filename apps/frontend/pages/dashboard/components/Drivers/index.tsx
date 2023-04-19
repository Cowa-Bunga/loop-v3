import RegionSelect from '../RegionSelect'
import RegionSelected from '../RegionsSelected'

export default function Drivers({ hubs }: { hubs: string[] }) {
  return hubs.length === 0 ? <RegionSelect /> : <RegionSelected hubs={hubs} />
}
