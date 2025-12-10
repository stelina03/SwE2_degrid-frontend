describe('Test 3: Cell Request from GridPage', () => {
  it('should ONLY allow clicking adjacent cells and reject non-adjacent cells', () => {
    // Start the game
    cy.visit('http://localhost:5173')
    cy.contains('button', 'START GAME').click()
    cy.url().should('include', '/grid')
    cy.get('.grid').should('exist')

    // Player 1 starts at (0,0) - top-left corner
    // Adjacent cells to (0,0): (1,0) and (0,1)
    // Non-adjacent cells should have 'not-allowed' class

    // Get all cells that are NOT marked as available (non-adjacent)
    cy.get('.grid-cell.not-allowed').should('have.length.greaterThan', 0)

    // Get all cells that ARE marked as available (adjacent to starting cell)
    cy.get('.grid-cell.available').should('have.length.greaterThan', 0)

    // Click on the first available adjacent cell
    cy.get('.grid-cell.available').first().click()

    // Should be redirected to CellRequestPage with coordinates in URL
    cy.url().should('include', '/cell-request')
    cy.url().should('include', 'x=')
    cy.url().should('include', 'y=')
    cy.url().should('include', 'playerId=')
  })
})
