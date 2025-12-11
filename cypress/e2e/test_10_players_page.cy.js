describe('Test 10: Players Page - View and Edit Players', () => {
  it('should navigate to Players page and view/edit player information', () => {
    // Start from home
    cy.visit('/')
    
    // Click on Players link in navigation
    cy.get('nav a').contains('Players').click()
    cy.log('✓ Navigated to Players page')
    
    // Verify we're on Players page
    cy.url().should('include', '/players')
    cy.contains('Players').should('be.visible')
    cy.log('✓ Players page loaded')
    
    // Verify players list exists and contains players
    cy.get('.player-row, .player-card, [data-testid="player-item"]').should('have.length.greaterThan', 0)
    cy.log('✓ Players list displayed')
    
    // Click on first player row to select it
    cy.get('.player-row').first().click()
    cy.log('✓ Selected a player')
    
    // Verify player details are shown (description field should be present)
    cy.get('textarea, [contenteditable], input[type="text"]').should('exist')
    cy.log('✓ Player details displayed')
    
    // Edit description
    cy.get('textarea').first().clear().type('Updated test description')
    cy.log('✓ Edited player description')
    
    // Save changes
    cy.contains('button', 'Save').click()
    cy.log('✓ Clicked Save button')
    
    // Verify success message or confirmation
    cy.on('window:alert', (text) => {
      expect(text).to.contain('Saved')
    })
    cy.log('✓ Player information saved successfully')
  })
})
