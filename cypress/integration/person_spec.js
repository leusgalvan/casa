describe('Person page', function () {
  beforeEach(() => {
    cy.server()
    cy.route('GET', '/people', 'fixture:person')
    cy.visit('/#/person')
  })

  it("should have a table with the correct header, data and buttons", function () {
    // Header
    cy.get('thead tr th:nth-child(1)').should('contain', 'ID')
    cy.get('thead tr th:nth-child(2)').should('contain', 'Nombre')

    // Data
    cy.get('tbody tr:nth-child(1) td:nth-child(1)').should('contain', '4')
    cy.get('tbody tr:nth-child(1) td:nth-child(2)').should('contain', 'Papu')
    cy.get('tbody tr:nth-child(2) td:nth-child(1)').should('contain', '5')
    cy.get('tbody tr:nth-child(2) td:nth-child(2)').should('contain', 'Nono')
    cy.get('tbody tr:nth-child(3) td:nth-child(1)').should('contain', '1')
    cy.get('tbody tr:nth-child(3) td:nth-child(2)').should('contain', 'Leo')
    cy.get('tbody tr:nth-child(4) td:nth-child(1)').should('contain', '3')
    cy.get('tbody tr:nth-child(4) td:nth-child(2)').should('contain', 'Ile')
    cy.get('tbody tr:nth-child(5) td:nth-child(1)').should('contain', '2')
    cy.get('tbody tr:nth-child(5) td:nth-child(2)').should('contain', 'Masi')

    // Buttons
    cy.get('.btn-add').should('contain', 'Agregar').and('not.have.attr', 'disabled')
    cy.get('.btn-edit').should('contain', 'Editar').and('have.attr', 'disabled')
    cy.get('.btn-delete').should('contain', 'Eliminar').and('have.attr', 'disabled')
  })

  it("should ")
})
