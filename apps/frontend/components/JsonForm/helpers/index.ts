const makeInputId = (id: string, suffix?: string) => {
  const parts = id.split('/')

  if (suffix) {
    return `${parts[parts.length - 1]}-${suffix}`
  }

  return parts[parts.length - 1]
}

export { makeInputId }
