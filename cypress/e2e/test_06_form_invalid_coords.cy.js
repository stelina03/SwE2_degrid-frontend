describe('Test 6: Form Submission - Invalid Coordinates', () => {
  it('should reject invalid coordinates (outside 0-9 range)', () => {
    // Start game first
    cy.visit('http://localhost:5173')
    cy.contains('button', 'START GAME').click()
    cy.url().should('include', '/grid')

    // Navigate to cell request form
    cy.visit('/cell-request?playerId=1')
    
    // Wait for the number input to be visible and enabled
    cy.get('input[type="number"]').should('be.visible').and('be.enabled')
    
    // Enter invalid coordinates (outside 0-9 range)
    cy.get('input[type="number"]').eq(1).clear().type('15')  // X input - invalid
    cy.get('input[type="number"]').eq(2).clear().type('-1')  // Y input - invalid
    
    // Click the Request button
    cy.contains('button', 'Request coordinates').click()

    // Should show error message
    cy.contains('Coordinates must be 0..9').should('be.visible')
    
    // Modal should NOT appear
    cy.get('.modal').should('not.exist')
  })
})
