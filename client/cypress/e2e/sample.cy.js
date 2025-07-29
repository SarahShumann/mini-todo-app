describe('Sample Test', () => {
    it('Visits the app root and checks for Login button', () => {
      cy.visit('/');
      cy.contains('Login');
    });
  });
  