describe('Test 7: Challenge Flow - Complete Challenge and Return to Grid', () => {
  it('should start challenge, roll dice, and return to GridPage', () => {
    // Use Test 4's approach that works - visit grid first, then request form
    cy.visit('http://localhost:5173')
    cy.contains('button', 'START GAME').click()
    cy.url().should('include', '/grid')
    cy.wait(1500)

    // Now navigate to request form
    cy.visit('http://localhost:5173/cell-request?playerId=1')
    cy.wait(1000)
    
    // Request an adjacent cell (1,0)
    cy.get('input[type="number"]').eq(1).clear().type('1')
    cy.get('input[type="number"]').eq(2).clear().type('0')
    cy.contains('button', 'Request coordinates').click()

    // Modal should appear with challenge
    cy.get('.modal', { timeout: 5000 }).should('be.visible')
    cy.contains('Challenge for cell (1,0)').should('be.visible')

    // Click Start Challenge
    cy.contains('button', 'Start Challenge').click()

    // Challenge animation should complete and redirect to grid
    // The rolling animation takes ~1 second, then 2 second delay before redirect
    cy.url({ timeout: 8000 }).should('include', '/grid')
    cy.get('.grid', { timeout: 5000 }).should('exist')
  })
})
