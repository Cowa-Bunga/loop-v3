export const Actions = (onChange) => ({
  clearAll: () => {
    onChange({ type: 'FeatureCollection', features: [] })
  }
})
