describe('User Login', () => {
  it('successfully logs into a single client account', () => {
    cy.login(
      Cypress.env('VALID_SINGLE_USERNAME'),
      Cypress.env('VALID_SINGLE_PASSWORD')
    )
      .url()
      .should('include', '/dashboard')
  })

  it('successfully logs into a multi client account', () => {
    const clientSelect = '#client-select'
    const continueButton = `[type="submit"]`

    cy.login(
      Cypress.env('VALID_MULTI_USERNAME'),
      Cypress.env('VALID_MULTI_PASSWORD')
    )
      .get(clientSelect)
      .click()
      .get('li')
      .contains('Yo Speedy Delivery')
      .click()
      .get(continueButton)
      .click()
      .url()
      .should('include', '/dashboard')
  })

  xit('fails to login with invalid credentials', () => {
    cy.login('invalue@user.name', 'password')
      .get('[data-testid="NOTIFICATION_CONTROL"]')
      .should('contain', 'Incorrect username or password')
  })
})
