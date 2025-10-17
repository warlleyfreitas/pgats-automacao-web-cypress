class Menu {
    navegarParaLogin() {
        cy.get('a[href="/login"]').click();
    }

    efetuarLogout() {
        cy.contains('a', 'Logout').click();
    }
}

export default new Menu();
