import RegionSelect from './components/RegionSelect'
import RegionSelected from './components/RegionsSelected'

export default function Drivers({ hubs }: { hubs: string[] }) {
  return hubs.length === 0 ? 
  <RegionSelect /> : <RegionSelected hubs={hubs} />
}
