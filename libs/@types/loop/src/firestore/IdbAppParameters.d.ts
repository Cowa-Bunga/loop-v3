import { EnumDbAbandonmentReasons } from './IdbEnums'

export interface IdbStateFlow {
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

export interface IdbStateFlowNextStates {
  auto: string
  button: string
}

export interface IdbStateFlowNextStates {
  auto: string
  button: string
}

export interface IdbStateFlowProgress {
  max: number
  steps: number
}

export interface IdbStateFlowProgressText {
  button: string
  progress: string
}

// 01
export interface IdbStateFlow01PendingOptions {
  auto_only: boolean
  glass: boolean
  lunchable: boolean
  qr: boolean
  show_call_customer_button: boolean
  show_problem_button: boolean
}

export interface IdbStateFlow01Pending {
  current_step: number
  accepted_parcel_status: number[]
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
export interface IdbStateFlow02AcceptedAuto {
  next: string
  distance: string
  points: string[]
  under: number
}

export interface IdbStateFlow02AcceptedOptions {
  auto_only: boolean
  glass: boolean
  lunchable: boolean
  qr: boolean
  show_instructions: boolean
  show_problem_button: boolean
}

export interface IdbStateFlow02Accepted {
  current_step: number
  auto: IdbStateFlow02AcceptedAuto
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
export interface IdbStateFlow03ArrivedAtStoreOptions {
  auto_only: boolean
  glass: boolean
  qr: boolean
  set_parcel_status: boolean
  show_additional_driver: boolean
  show_call_customer_button: boolean
  show_problem_button: boolean
}

export interface IdbStateFlow03ArrivedAtStore {
  current_step: number
  accepted_parcel_status: number[]
  api_end_point: string
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
export interface IdbStateFlow04CollectedOptions {
  auto_only: boolean
  glass: boolean
  qr: boolean
}

export interface IdbStateFlow04Collected {
  current_step: number
  auto: IdbStateFlow02AcceptedAuto
  id: string
  name: string
  next: string
  next_states: IdbStateFlowNextStates
  options: IdbStateFlow04CollectedOptions
  progress: IdbStateFlowProgress
  segment: string
  text: IdbStateFlowProgressText
  total_steps: number
}

// 05
export interface IdbStateFlow05DepartedOptions {
  auto_dont_check_stuff: boolean
  auto_only: boolean
  glass: boolean
  qr: boolean
  set_parcel_status: boolean
  show_customer_info: boolean
  show_instructions: boolean
}

export interface IdbStateFlow05Departed {
  current_step: number
  api_end_point: string
  auto: IdbStateFlow02AcceptedAuto
  id: string
  name: string
  next: string
  next_states: IdbStateFlowNextStates
  options: IdbStateFlow05DepartedOptions
  progress: IdbStateFlowProgress
  segment: string
  text: IdbStateFlowProgressText
  total_steps: number
}

// 06
export interface IdbStateFlow06ArrivedOptions {
  auto_only: boolean
  glass: boolean
  qr: boolean
  set_parcel_status: boolean
  show_customer_info_button: boolean
}

export interface IdbStateFlow06Arrived {
  current_step: number
  accepted_parcel_status: number[]
  api_end_point: string
  id: string
  name: string
  next: string
  next_states: IdbStateFlowNextStates
  options: IdbStateFlow06ArrivedOptions
  progress: IdbStateFlowProgress
  segment: string
  target_parcel_status: number
  text: IdbStateFlowProgressText
  total_steps: number
}

// 07
export interface IdbStateFlow07DeliveredAuto {
  next: {
    and: boolean
  }
}

export interface IdbStateFlow07DeliveredOptions {
  auto_only: boolean
  biometric_required: boolean
  glass: boolean
  qr: boolean
  show_customer_info: boolean
  show_problem_button: boolean
}

export interface IdbStateFlow07Delivered {
  current_step: number
  api_end_point: string
  auto: IdbStateFlow07DeliveredAuto
  id: string
  name: string
  next: string
  next_states: IdbStateFlowNextStates
  options: IdbStateFlow07DeliveredOptions
  progress: IdbStateFlowProgress
  segment: string
  text: IdbStateFlowProgressText
  total_steps: number
}

// 08
export interface IdbStateFlow08CompletedCompletedOptions {
  auto_only: boolean
  glass: boolean
  qr: boolean
  show_problem_button: boolean
}

export interface IdbStateFlow08CompletedCompleted {
  current_step: number
  complete_state: boolean
  id: string
  name: string
  next_states: IdbStateFlowNextStates
  options: IdbStateFlow08CompletedCompletedOptions
  progress: IdbStateFlowProgress
  segment: string
  text: IdbStateFlowProgressText
  total_steps: number
}

// 09
export interface IdbStateFlow09CompletedReturnedOptions {
  auto_only: boolean
  glass: boolean
  qr: boolean
  show_problem_button: boolean
}

export interface IdbStateFlow09CompletedReturned {
  current_step: number
  complete_state: boolean
  id: string
  name: string
  next_states: IdbStateFlowNextStates
  options: IdbStateFlow09CompletedReturnedOptions
  progress: IdbStateFlowProgress
  returned: boolean
  segment: string
  text: IdbStateFlowProgressText
}

// 10
export interface IdbStateFlow10AbandonedAuto {
  next: {
    and: boolean
  }
}

export interface IdbStateFlow10AbandonedOptions {
  auto_only: boolean
  glass: boolean
  lunchable: boolean
  qr: boolean
  set_parcel_status: boolean
  show_customer_info: boolean
  show_problem_button: boolean
}

export interface IdbStateFlow10Abandoned {
  api_end_point: string
  auto: IdbStateFlow02AcceptedAuto
  id: string
  independent: boolean
  name: string
  next: string
  next_states: IdbStateFlowNextStates
  options: IdbStateFlow10AbandonedOptions
  progress: IdbStateFlowProgress
  segment: string
  text: IdbStateFlowProgressText
}

export interface IdbTripMapping {
  accepted: string
  arrived_at_collection_point: string
  batched: string
  completed: string
  in_progress: string
}

// <root>
export interface IdbAppParameters {
  abandonement_reasons: EnumDbAbandonmentReasons
  state_flow: IdbStateFlow
  trip_mapping: IdbTripMapping
}
