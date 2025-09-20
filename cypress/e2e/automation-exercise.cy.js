/// <reference types="cypress" />

describe('My First Test', () => {
    it('Cadastrar um usuário', () => {
        cy.visit('https://automationexercise.com');

        cy.get('a[href="/login"]').click();
    });
});
