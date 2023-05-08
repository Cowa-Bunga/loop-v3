import { rankWith, uiTypeIs } from '@jsonforms/core'

export { default as GroupLayout } from './GroupLayout'
export { default as ChildGroupLayout } from './ChildGroupLayout'

export const groupTester = rankWith(3, uiTypeIs('Group'))
export const childGroupTester = rankWith(3, uiTypeIs('ChildGroup'))
