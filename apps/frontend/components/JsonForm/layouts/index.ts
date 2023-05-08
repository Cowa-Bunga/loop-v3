import { rankWith, uiTypeIs } from '@jsonforms/core'

export { default as GroupLayout } from './GroupLayout'
export const groupTester = rankWith(3, uiTypeIs('Group'))
