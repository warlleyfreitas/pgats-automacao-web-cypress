class Menu {
    navegarParaLoginSignUp() {
        cy.get('a[href="/login"]').click();
    }

    efetuarLogout() {
        cy.get('a[href="/logout"]').should('be.visible').click();
    }

    deletarConta() {
        cy.get('a[href="/delete_account"]').should('be.visible').click();
    }

    verificarContaDeletada() {
        cy.get('h2[data-qa="account-deleted"]').should('be.visible');
        cy.contains('h2', 'Account Deleted!').should('be.visible');
        cy.get('a[data-qa="continue-button"]').click();
    }
}

export default new Menu();
