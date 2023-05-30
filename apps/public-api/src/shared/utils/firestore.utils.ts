export function convertFirestoreTimestamp(timestamp: {
    _seconds: number
    _nanoseconds: number
  }): Date | null {
    if (timestamp) {
      const timeSeconds = timestamp._seconds
      const timeMilliseconds = timeSeconds * 1000
      const timeNanoseconds = timestamp._nanoseconds
      const date = new Date(timeMilliseconds + timeNanoseconds / 1e6)
      return date
    }
    return null
  }
  