describe('Tests de checkout', () => {
  beforeEach(() => {
    cy.login()
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="checkout"]').click()
  })

  it('Completa el checkout exitosamente', () => {
    cy.get('[data-test="firstName"]').type('Florencia')
    cy.get('[data-test="lastName"]').type('Otero')
    cy.get('[data-test="postalCode"]').type('1234')
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="finish"]').click()
    cy.get('.complete-header').should('contain', 'Thank you for your order!')
  })

  it('Valida errores si faltan datos del formulario', () => {
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="error"]').should('be.visible')
  })
})
