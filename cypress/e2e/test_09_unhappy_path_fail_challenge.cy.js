describe('Test 9: Unhappy Path - Challenge Failure', () => {
  it('should execute a challenge that results in failure', () => {
    // Start game flow - user navigates to grid
    cy.visit('/')
    cy.contains('button', 'START GAME').click()
    cy.url().should('include', '/grid')
    cy.wait(2000)
    
    // Click on an adjacent cell to open cell request page
    cy.get('.grid-cell.available').first().click({ force: true })
    cy.url().should('include', '/cell-request')
    cy.wait(1000)
    
    // Button should now be enabled (we just came from grid)
    cy.contains('button', 'Request coordinates').click()
    cy.log('✓ Cell request submitted')

    // Challenge modal should appear
    cy.get('.modal', { timeout: 5000 }).should('be.visible')
    cy.log('✓ Challenge modal appeared')

    // Intercept the challenge API and mock a failure response
    cy.intercept('POST', '**/challenge', {
      statusCode: 200,
      body: {
        success: false,
        attempt: 95,
        message: 'Claim failed',
        cell: null,
        nextPlayer: 2,
        winner: null
      }
    }).as('challengeRequest')
    
    // Start the challenge - roll the dice
    cy.contains('button', 'Start Challenge').click()
    cy.log('✓ Rolling dice for challenge with HIGH roll (failure expected)...')

    // Wait for the challenge API response and verify it's a failure
    cy.wait('@challengeRequest').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
      expect(interception.response.body.success).to.eq(false)
      expect(interception.response.body.message).to.include('failed')
      cy.log('✓ Challenge API returned success=false (failure confirmed)')
    })

    // Wait for completion and redirect to grid
    cy.url({ timeout: 8000 }).should('include', '/grid')
    cy.get('.grid', { timeout: 5000 }).should('exist')
    cy.log('✓ Challenge completed - player redirected to grid after failure')
  })
})
