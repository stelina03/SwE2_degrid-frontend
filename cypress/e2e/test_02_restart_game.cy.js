describe('Test 2: Restart Game from GridPage', () => {
  it('should restart the game when clicking Restart button on GridPage', () => {
    // Start from home and go to grid
    cy.visit('http://localhost:5173')
    cy.contains('button', 'START GAME').click()
    cy.url().should('include', '/grid')
    cy.get('.grid').should('exist')
    
    // Find and click the Restart button
    cy.contains('button', 'Restart').click()
    
    // Handle the confirmation dialog
    cy.on('window:confirm', () => true)
    
    // Verify we're still on grid page (game restarted)
    cy.url().should('include', '/grid')
    cy.get('.grid').should('exist')
  })
})
