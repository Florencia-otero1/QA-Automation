describe('Tests del carrito', () => {
  beforeEach(() => {
    cy.login()
  })

  it('Agrega un producto al carrito', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_badge').should('contain', '1')
  })

  it('Elimina un producto del carrito', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="remove-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_badge').should('not.exist')
  })

  it('Accede al carrito y ve el producto', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
    cy.get('.shopping_cart_link').click()
    cy.url().should('include', '/cart.html')
    cy.get('.cart_item').should('have.length', 1)
  })
})
