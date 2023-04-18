import { defineConfig } from 'cypress'
import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    ...nxE2EPreset(__dirname)
  }
})
