describe('Tests de productos', () => {
  beforeEach(() => {
    cy.login()
  })

  it('Muestra productos después del login', () => {
    cy.get('.inventory_item').should('have.length.at.least', 1)
  })

  it('Filtra productos de menor a mayor precio', () => {
    cy.get('[data-test="product_sort_container"]').select('lohi')
    cy.get('.inventory_item_price').then(precios => {
      const valores = [...precios].map(p => parseFloat(p.innerText.replace('$', '')))
      const ordenado = [...valores].sort((a, b) => a - b)
      expect(valores).to.deep.equal(ordenado)
    })
  })
})
