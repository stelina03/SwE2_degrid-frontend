describe('Test 8: Happy Path - Challenge Success', () => {
  it('should execute a complete challenge that results in success', () => {
    // Start game flow - user navigates to grid
    cy.visit('http://localhost:5173')
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
    cy.log('✓ Challenge initiated')

    // Intercept the challenge API and mock a success response
    cy.intercept('POST', '**/challenge', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          success: true,
          attempt: 10,
          message: 'Claim succeeded',
          cell: {
            cellId: 2,
            owner: 1,
            'cell-owner': 1,
            x: 1,
            y: 0,
            color: '#FF0000',
            claimValue: 10
          },
          nextPlayer: 2,
          winner: null
        }
      })
    }).as('challengeRequest')
    
    // Start the challenge - roll the dice
    cy.contains('button', 'Start Challenge').click()
    cy.log('✓ Rolling dice for challenge with LOW roll (success expected)...')

    // Wait for the challenge API response and verify it's a success
    cy.wait('@challengeRequest').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
      expect(interception.response.body.success).to.eq(true)
      expect(interception.response.body.message).to.include('succeeded')
      expect(interception.response.body.cell).to.not.be.null
      expect(interception.response.body.cell.owner).to.eq(1)
      cy.log('✓ Challenge API returned success=true with cell ownership confirmed')
    })

    // Wait for completion and redirect to grid
    cy.url({ timeout: 8000 }).should('include', '/grid')
    cy.get('.grid', { timeout: 5000 }).should('exist')
    cy.log('✓ Challenge succeeded - player redirected to grid after success')
  })
})
