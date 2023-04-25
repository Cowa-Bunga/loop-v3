const Actions = (_state, _setState) => ({
  modelDrivers: (documents: DocumentData[]): IDriver[] => {
    return documents.map((document) => ({
      id: document.id || document.NO_ID_FIELD,
      name: document.name,
      email: document.email,
      mobile_no: document.mobile_no,
      vehicle_type: document.vehicle_type,
      employee_code: document.employee_code,
      location: document.location,
      lunch: document.lunch,
      available: document.available,
      on_active_trip: document.on_active_trip,
      idle_since: document.idle_since,
      created_at: document.created_at
    }))
  }
})

export default Actions
