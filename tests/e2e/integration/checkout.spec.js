describe('Checkout Flow', () => {
    it('completes a successful order', () => {
      cy.visit('/checkout/enterprise')
      cy.get('input[label="Full Name"]').type('John Doe')
      cy.get('input[label="Phone"]').type('1234567890')
      cy.get('input[label="Email"]').type('john.doe@example.com')
      cy.get('input[label="CEP"]').type('12345-678').blur()
      cy.wait(1000) 
      cy.get('select').select('Credit Card')
      cy.get('input[label="CPF"]').type('111.444.777-35')
      cy.get('input[label="Card Number"]').type('4111111111111111')
      cy.get('input[label="Expiry Date"]').type('12/23')
      cy.get('input[label="CVV"]').type('123')
      cy.get('button').contains('Finalizar Pedido').click()
      cy.url().should('include', '/success')
      cy.get('p').contains('Your order ID:').should('exist')
    })
  })
  