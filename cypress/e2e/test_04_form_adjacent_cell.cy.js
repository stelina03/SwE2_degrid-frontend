describe('Test 4: Form Submission - Adjacent Cell Request', () => {
  it('should successfully request an adjacent cell via form submission', () => {
    // Start game first
    cy.visit('http://localhost:5173')
    cy.contains('button', 'START GAME').click()
    cy.url().should('include', '/grid')

    // Manually navigate to cell request form (don't auto-submit)
    cy.visit('http://localhost:5173/cell-request?playerId=1')
    
    // Wait a moment for page to load
    cy.wait(1000)
    
    // Enter adjacent cell coordinates (1,0) - adjacent to player 1's start at (0,0)
    cy.get('input[type="number"]').eq(1).clear().type('1')  // X input
    cy.get('input[type="number"]').eq(2).clear().type('0')  // Y input
    
    // Click the Request button manually
    cy.contains('button', 'Request coordinates').click()

    // Should show challenge modal
    cy.get('.modal', { timeout: 5000 }).should('be.visible')
    cy.contains('Challenge for cell (1,0)').should('be.visible')
  })
})
