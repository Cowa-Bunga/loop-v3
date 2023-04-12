import React from 'react'
import RegionSelect from './region-select'
import RegionSelected from './regions-selected'

interface IProps {
  regionHubId: string
}

const Drivers = ({ regionHubId }: IProps) => {
  if (regionHubId == '') {
    return <RegionSelect />
  }

  return <RegionSelected regionHubId={regionHubId} />
}

export default Drivers
