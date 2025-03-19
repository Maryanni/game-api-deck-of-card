# game-api-deck-of-card
This project implements automated API tests for a deck of card game using Cypress with the Page Object Model (POM) pattern.

# Install dependencies
npm install

# Open Cypress
npx cypress open  or npm run cy:open

# Run all tests
npx cypress run  or npm run cy:run

# Open report
open cypress/reports/mochawesome.html

- **cypress/e2e/deckOfCardPage.cy.js**: Test suite containing all test cases for the Deck of Cards API
- **cypress/support/pages/PrincipalAPIPage.js**: Base class that handles common API request functionality
- **cypress/support/pages/DeckOfCardPage.js**: Page object for Deck of Cards API operations
- **cypress/reports/**: Contains generated test reports after test execution
- **cypress/support/comamands.js**: Custom Cypress commands for response verification
