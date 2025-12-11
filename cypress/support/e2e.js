// Cypress support file for e2e tests
// This file is loaded before each test file

// Suppress cy.request/cy.visit unhandled promise rejections
Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignore specific errors if needed
  return true
})
