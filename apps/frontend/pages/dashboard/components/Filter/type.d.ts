interface IappDashboardFilterState {
  tab: number
  hub: string
}

interface IappDashboardFilterProps {
  regions: IRegion[]
  hubs: IHub[]
  onChange: (e: SelectChangeEvent<string>) => void
  regionHub: string
}
