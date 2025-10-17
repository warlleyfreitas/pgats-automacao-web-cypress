import { faker } from '@faker-js/faker';

class Contato {
    navegarParaContato() {
        cy.get('a[href*=contact]').click();
    }

    preencherFormularioDeContato(nome = 'test-pgats', email = 'test-pgats@qa.com', assunto = 'testing', mensagem = 'this is a message') {
        cy.get('input[data-qa="name"]').type(nome);
        cy.get('input[data-qa="email"]').type(email);
        cy.get('input[data-qa="subject"]').type(assunto);
        cy.get('textarea[data-qa="message"]').type(mensagem);
    }

    preencherFormularioDeContatoComFaker() {
        const nome = faker.person.fullName();
        const email = faker.internet.email();
        const assunto = faker.lorem.sentence(3);
        const mensagem = faker.lorem.paragraph();

        this.preencherFormularioDeContato(nome, email, assunto, mensagem);
    }

    anexarArquivo(caminhoArquivo = 'cypress/fixtures/example.json') {
        cy.fixture('example.json').as('file');
        cy.get('input[type=file]').selectFile('@file');
    }

    enviarFormulario() {
        cy.get('[data-qa="submit-button"]').click();
    }

    verificarSucessoEnvio() {
        cy.get('.status').should('be.visible');
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.');
    }

    preencherEEnviarFormularioCompleto() {
        this.navegarParaContato();
        this.preencherFormularioDeContatoComFaker();
        this.anexarArquivo();
        this.enviarFormulario();
        this.verificarSucessoEnvio();
    }
}

export default new Contato();

