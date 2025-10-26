import { faker } from '@faker-js/faker';

class Login {
    preencherFormularioDeLogin(email, password) {
        cy.get('input[data-qa="login-email"]').type(email);
        cy.get('input[data-qa="login-password"]').type(password);
    }

    preencherFormularioDePreCadastro() {
        this.preencherFormularioDeLogin();
    }

    verificarLoginComSucesso(userName) {
        cy.url().should('not.include', '/login');
        cy.contains('a', `Logged in as ${userName}`).should('be.visible');
    }

    verificarErroCredenciaisInvalidas() {
        cy.contains('Your email or password is incorrect!').should('be.visible');
    }

    verificarValidacaoCamposObrigatorios() {
        cy.get('input[data-qa="login-email"]').should('have.attr', 'required');
        cy.get('input[data-qa="login-password"]').should('have.attr', 'required');
    }

    verificarPaginaDeLogin() {
        cy.contains('h2', 'Login to your account').should('be.visible');
    }

    verificarPaginaInicial() {
        cy.url().should('eq', 'https://automationexercise.com/');
        cy.get('.carousel-inner').should('be.visible');
    }

    clicarBotaoLogin() {
        cy.get('button[data-qa="login-button"]').click();
    }
}

export default new Login();