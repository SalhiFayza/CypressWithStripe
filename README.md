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
<img width="528" height="575" alt="Screenshot from 2025-10-25 20-16-27" src="https://github.com/user-attachments/assets/3d22a019-0d24-4d08-8348-268113b898c7" />
<img width="528" height="575" alt="Screenshot from 2025-10-25 20-17-48" src="https://github.com/user-attachments/assets/501d0988-e276-434f-aa48-e43fe3c4ab84" />

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
<img width="577" height="127" alt="Screenshot from 2025-10-25 20-19-17" src="https://github.com/user-attachments/assets/aa87517b-6ca2-42a1-8338-58e629098b60" />
<img width="528" height="575" alt="Screenshot from 2025-10-25 20-17-06" src="https://github.com/user-attachments/assets/3416ee43-9d34-4988-a663-a9196fcf315b" />
<img width="528" height="575" alt="Screenshot from 2025-10-25 20-17-10" src="https://github.com/user-attachments/assets/30a48b99-cb07-434b-8159-361fe4b34aa5" />
<img width="528" height="575" alt="Screenshot from 2025-10-25 20-17-24" src="https://github.com/user-attachments/assets/12df94ae-7c00-4d27-ac29-387823b88587" />
<img width="528" height="575" alt="Screenshot from 2025-10-25 20-17-42" src="https://github.com/user-attachments/assets/e19e7ba8-ad60-408d-a317-e856fef7b90d" />

4. **Open Cypress:**
```bash
npm run test
```
<img width="899" height="260" alt="image" src="https://github.com/user-attachments/assets/51335a4a-f307-4bfd-83b1-750e00da6964" />
<img width="1297" height="728" alt="image" src="https://github.com/user-attachments/assets/f5e796ee-8b02-4173-bbcd-21afc3a76cc3" />
https://github.com/user-attachments/assets/2b6fb77b-8f81-40bf-898f-759c1c5cdae7

5. **Run tests headlessly (optional):**
```bash
npm run cypress:run
```
<img width="1269" height="661" alt="image" src="https://github.com/user-attachments/assets/de817869-5c9a-4ce2-b224-3badba197b70" />
<img width="1269" height="661" alt="image" src="https://github.com/user-attachments/assets/104364e5-9323-48b1-963d-d8af2658b6aa" />

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
