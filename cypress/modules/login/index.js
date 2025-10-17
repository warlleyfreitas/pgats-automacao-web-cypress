import { faker } from '@faker-js/faker';

class Login {
    preencherFormularioDeLogin(email = 'test-pgats1759587370861@qa.com', password = 'TestPassword123') {
        cy.get('input[data-qa="login-email"]').type(email);
        cy.get('input[data-qa="login-password"]').type(password);
        cy.get('button[data-qa="login-button"]').click();
    }

    preencherFormularioDePreCadastro() {
        this.preencherFormularioDeLogin();
    }

    verificarLoginComSucesso() {
        cy.url().should('not.include', '/login');
        cy.contains('a', 'Logged in as').should('be.visible');
    }

    verificarErroCredenciaisInvalidas() {
        cy.contains('Your email or password is incorrect!').should('be.visible');
    }

    verificarValidacaoCamposObrigatorios() {
        cy.get('input[data-qa="login-email"]').should('have.attr', 'required');
        cy.get('input[data-qa="login-password"]').should('have.attr', 'required');
    }
}

export default new Login();