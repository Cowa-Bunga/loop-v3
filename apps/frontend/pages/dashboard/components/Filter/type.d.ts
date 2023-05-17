interface IappDashboardFilterState {
  tab: number
  expanded: number[]
}

interface IappDashboardFilterProps {
  regions: IRegion[]
  hubs: IHub[]
  onChange: (e: SelectChangeEvent<string>) => void
  regionHub: string
}
