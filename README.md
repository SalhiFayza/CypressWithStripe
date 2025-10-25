# Stripe Elements Cypress Test Project

This project demonstrates how to test Stripe Elements payment forms using Cypress and the `cypress-plugin-stripe-elements` plugin.

## Project Structure

```
public/
├── index.html        # Main payment page
├── success.html      # Payment success page
├── style.css         # CSS styling
server.js             # Express server
package.json          # Node dependencies and scripts
cypress/
├── e2e/
│   └── payment.cy.js # Cypress test for Stripe Elements
├── support/
│   └── e2e.js        # Cypress support file with plugin import
cypress.config.js     # Cypress configuration
```

## Setup Instructions

1. **Install dependencies:**
```bash
npm install
```

2. **Set your Stripe secret key (optional, defaults provided):**
```bash
export STRIPE_SECRET=sk_test_YourSecretKeyHere
```

3. **Start the server:**
```bash
npm start
```

4. **Open Cypress:**
```bash
npm run test
```

5. **Run tests headlessly (optional):**
```bash
npm run cypress:run
```

## Test Description

The Cypress test `payment.cy.js` automates a fake payment using Stripe Elements:

- Fills the cardholder name.
- Waits for Stripe iframes to load.
- Fills the credit card number, expiry, CVC, and postal code.
- Submits the form.
- Verifies that the payment is successful.

### Cypress Test Code
```js
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
});
```

## Notes

- The test uses the `cypress-plugin-stripe-elements` plugin to interact with Stripe's iframes.
- Postal code is handled as a separate text input.
- Make sure to use a valid Stripe publishable key in `index.html` or via URL param `?pk=...`.
- Increase timeouts if network is slow to ensure Stripe iframes load properly.

## Styling

- Soft pink theme with hover and focus effects.
- Centered link for demo purposes.
- Card element and submit button styled for visibility and user experience.

## Server

- Express server serves static files from `public/`.
- Endpoint `/create-payment-intent` returns a Stripe PaymentIntent client secret.
- Configurable via `STRIPE_SECRET` environment variable.

## Dependencies

- express
- stripe
- cypress
- cypress-plugin-stripe-elements