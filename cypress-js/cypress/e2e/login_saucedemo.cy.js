describe('Tests de Login', () => {
  it('Login exitoso', () => {
    cy.login()
    cy.url().should('include', '/inventory.html')
  })

  it('Login con usuario bloqueado', () => {
    cy.login('locked_out_user', 'secret_sauce')
    cy.get('[data-test="error"]').should('contain', 'locked out')
  })

  it('Login con credenciales incorrectas', () => {
    cy.login('usuario_incorrecto', 'clave_incorrecta')
    cy.get('[data-test="error"]').should('contain', 'Username and password do not match')
  })

  it('Login sin completar usuario', () => {
    cy.visit('https://www.saucedemo.com')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="error"]').should('be.visible')
  })

  it('Login sin completar contraseña', () => {
    cy.visit('https://www.saucedemo.com')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="error"]').should('be.visible')
  })
})
