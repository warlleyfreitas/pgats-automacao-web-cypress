import { faker } from '@faker-js/faker';

class Contato {
    navegarParaContactUs() {
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

    anexarArquivo(caminhoArquivo = 'cypress/fixtures/image.png') {
        cy.fixture('image.png').as('file');
        cy.get('input[type=file]').selectFile('@file');
    }

    enviarFormulario() {
        cy.get('[data-qa="submit-button"]').click();
    }

    verificarSucessoEnvio() {
        cy.get('.status').should('be.visible');
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.');
    }

    verificarGetInTouch() {
        cy.contains('h2', 'Get In Touch').should('be.visible');
    }

    aceitarAlert() {
        cy.on('window:alert', (text) => {
            expect(text).to.contains('pressed a button');
        });
    }

    voltarParaHome() {
        cy.get('a[href="/"]').contains('Home').click();
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

