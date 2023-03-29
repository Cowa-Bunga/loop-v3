interface IdbStateFlow {
  '01_pending': IdbStateFlow01Pending
  '02_accepted': IdbStateFlow02Accepted
  '03_arrived_at_store': IdbStateFlow03ArrivedAtStore
  '04_collected': IdbStateFlow04Collected
  '05_departed': IdbStateFlow05Departed
  '06_arrived': IdbStateFlow06Arrived
  '07_delivered': IdbStateFlow07Delivered
  '08_completed_completed': IdbStateFlow08CompletedCompleted
  '09_completed_returned': IdbStateFlow09CompletedReturned
  '10_abandoned': IdbStateFlow10Abandoned
}

interface IdbStateFlowNextStates {
  auto: string
  button: string
}

interface IdbStateFlowNextStates {
  auto: string
  button: string
}


interface IdbStateFlowProgress {
  max: number
  steps: number
}

interface IdbStateFlowProgressText {
  button: string
  progress: string
}


// 01

interface IdbStateFlow01PendingOptions {
  auto_only: boolean
  glass: boolean
  lunchable: boolean
  qr: boolean
  show_call_customer_button: boolean
  show_problem_button: boolean
}

interface IdbStateFlow01Pending {
  accepted_parcel_status: number[]
  current_step: number
  id: string
  independent: boolean
  name: string
  next: string
  next_states: IdbStateFlowNextStates
  options: IdbStateFlow01PendingOptions
  progress: IdbStateFlowProgress
  segment: string
  target_parcel_status: number
  text: IdbStateFlowProgressText
  total_steps: number
}


// 02

interface IdbStateFlow02AcceptedAuto {
  next: string
  distance: string
  points: string[]
  under: number
}

interface IdbStateFlow02AcceptedOptions {
  auto_only: boolean
  glass: boolean
  lunchable: boolean
  qr: boolean
  show_instructions: boolean
  show_problem_button: boolean
}

interface IdbStateFlow02Accepted {
  auto: IdbStateFlow02AcceptedAuto
  current_step: number
  id: string
  name: string
  next: string
  next_states: IdbStateFlowNextStates
  options: IdbStateFlow02AcceptedOptions
  progress: IdbStateFlowProgress
  segment: string
  text: IdbStateFlowProgressText
  total_steps: number
}


// 03

interface IdbStateFlow03ArrivedAtStoreOptions {
  auto_only: boolean
  glass: boolean
  qr: boolean
  set_parcel_status: boolean
  show_additional_driver: boolean
  show_call_customer_button: boolean
  show_problem_button: boolean
}

interface IdbStateFlow03ArrivedAtStore {
  accepted_parcel_status: number[]
  api_end_point: string
  current_step: number
  id: string
  name: string
  next: string
  next_states: IdbStateFlowNextStates
  options: IdbStateFlow03ArrivedAtStoreOptions
  progress: IdbStateFlowProgress
  segment: string
  text: IdbStateFlowProgressText
  total_steps: number
  unified_state: boolean
}

// 04
interface IdbStateFlow04Collected {

}

// 05
interface IdbStateFlow05Departed {}

// 06
interface IdbStateFlow06Arrived {}


// 07
interface IdbStateFlow07Delivered {}


// 08
interface IdbStateFlow08CompletedCompleted {}

// 09
interface IdbStateFlow09CompletedReturned {}

// 10
interface IdbStateFlow10Abandoned {}

// <root>
interface IdbAppParameters {
  abandonement_reasons: EnumDbAbandonmentReasons
  state_flow: IdbStateFlow
  trip_mapping: IdbTripMapping
}
