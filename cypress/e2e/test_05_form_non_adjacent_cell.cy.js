describe('Test 5: Form Submission - Non-Adjacent Cell Request', () => {
  it('should reject request for non-adjacent cell', () => {
    // Start game first
    cy.visit('http://localhost:5173')
    cy.contains('button', 'START GAME').click()
    cy.url().should('include', '/grid')

    // Navigate to cell request form
    cy.visit('http://localhost:5173/cell-request?playerId=1')
    
    // Wait a moment for page to load
    cy.wait(1000)
    
    // Enter non-adjacent cell coordinates (5,5) - far from player 1's start at (0,0)
    cy.get('input[type="number"]').eq(1).clear().type('5')  // X input
    cy.get('input[type="number"]').eq(2).clear().type('5')  // Y input
    
    // Click the Request button
    cy.contains('button', 'Request coordinates').click()

    // EXPECTED: Should show an error because (5,5) is not adjacent to (0,0)
    // After the bug fix, this error should appear
    cy.contains(/Target cell is not adjacent|not adjacent|Cell not available|Cell already owned|Adjacent cells only|not owned by you/i, { timeout: 5000 }).should('be.visible')
    
    // Modal should NOT appear
    cy.get('.modal').should('not.exist')
  })
})
