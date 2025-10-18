describe('Drag and Drop and Windows', () => {
    beforeEach(() => {
        
    });

    it('Multiple Windows', () => {
        cy.visit('https://the-internet.herokuapp.com/windows');
        cy.get('a[href="/windows/new"]')
            .invoke('removeAttr', 'target')
            .click();

        cy.get('h3').should('have.text', 'New Window');

        cy.go('back');
        cy.get('h3').should('have.text', 'Opening a new window');
    });

    it('Drag and Drop', () => {
        cy.visit('https://the-internet.herokuapp.com/drag_and_drop');

        const dataTransfer = new DataTransfer();

        cy.get('#column-a').trigger('dragstart', { dataTransfer });
        cy.get('#column-b').trigger('drop', { dataTransfer });
        cy.get('#column-a').should('have.text', 'B');
    });
});