describe('App loads', () => {
  it('should load the home page and show UI elements', () => {
    cy.visit('http://localhost:5173');

    cy.contains('Login', { timeout: 10000 }).should('be.visible');

    cy.get('input[placeholder="Username"]').should('exist');
    cy.contains('Login').should('be.visible');
  });
});