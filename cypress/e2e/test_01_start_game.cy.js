describe('Test 1: Start Game Navigation', () => {
  it('should navigate from StartPage to GridPage when clicking START GAME', () => {
    // Visit the app
    cy.visit('http://localhost:5173')
    
    // Verify we're on StartPage (contains START GAME button)
    cy.contains('button', 'START GAME').should('be.visible')
    
    // Click START GAME
    cy.contains('button', 'START GAME').click()
    
    // Verify we navigated to GridPage
    cy.url().should('include', '/grid')
    
    // Verify grid is displayed
    cy.get('.grid').should('exist')
  })
})
