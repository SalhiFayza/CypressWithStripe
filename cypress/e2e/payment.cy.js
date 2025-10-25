describe('Stripe Elements flow', () => {
  it('successfully completes fake payment', () => {

    cy.visit('/');

    cy.get('#cardholder-name').type('Test 123');

    cy.get('#card-element iframe', { timeout: 20000 }).should('exist');

    cy.fillElementsInput('cardNumber', '4242424242424242');
    cy.fillElementsInput('cardExpiry', '1225');
    cy.fillElementsInput('cardCvc', '123');
    cy.fillElementsInput('postalCode', '12345');

    cy.get('button[type="submit"]').click();

    cy.contains('Success!', { timeout: 15000 }).should('exist');
  });
})
