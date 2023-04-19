/// <reference types="cypress" />

const COOKIE_NAME = 'cowabunga-user-cookie'
Cypress.Commands.add('login', (username: string, password: string) => {
  const emailSelector = '#email'
  const passwordSelector = '#password'
  const loginButtonSelector = `[type="submit"]`
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.visit('/')
    .get(emailSelector)
    .type(username)
    .get(passwordSelector)
    .type(password)
    .get(loginButtonSelector)
    .wait(5000)
    .click()
})

Cypress.Commands.add(
  'loginWithSession',
  (username: string, password: string) => {
    const emailSelector = '#email'
    const passwordSelector = '#password'
    const loginButtonSelector = `[type="submit"]`

    cy.session(
      username,
      () => {
        cy.visit('/')
          .get(emailSelector)
          .type(username)
          .get(passwordSelector)
          .type(password)
          .get(loginButtonSelector)
          .contains('Login')
          .click()
          .url()
          .should('include', '/loop/dos')
      },
      {
        validate: () => {
          cy.getCookie(COOKIE_NAME).should('exist')
        }
      }
    )
  }
)

// Cypress.Commands.add('regionHubSelect', (region: string, hub: string) => {
//   const regionSelector = `#button-${ORDERS_REGION_SELECT}`
//   const hubSelector = `#button-${ORDERS_HUB_SELECT}`
//
//   cy.get(regionSelector)
//     .click()
//     .get(`[data-title="${region}"]`)
//     .click()
//     .get(hubSelector)
//     .click()
//     .get(`[data-title="${hub}"]`)
//     .click()
// })

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    login(email: string, password: string): Chainable<void>

    loginWithSession(email: string, password: string): Chainable<void>

    cookieName(): string

    // regionHubSelect(region: string, hub: string): Chainable<void>

    // drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
    // dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
    // visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
  }
}
