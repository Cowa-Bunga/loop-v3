import React from 'react'
import RegionSelect from './region-select'
import RegionSelected from './regions-selected'

interface IProps {
  hubs: string[]
}

const Drivers = ({ hubs }: IProps) => {
  if (hubs.length === 0) {
    return <RegionSelect />
  }

  return <RegionSelected hubs={hubs} />
}

export default Drivers
