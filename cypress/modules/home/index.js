import { faker } from '@faker-js/faker';

class Home {
    navegarParaHome() {
        cy.get('a[href="/"]').click();
    }

    scrollParaFooter() {
        cy.get('footer').scrollIntoView();
    }

    verificarTextoSubscription() {
        cy.get('.single-widget h2').contains('Subscription').should('be.visible');
    }

    preencherEmailSubscription(email = faker.internet.email()) {
        cy.get('#susbscribe_email').type(email);
        cy.get('#subscribe').click();
    }

    verificarMensagemSucessoSubscription() {
        cy.get('.alert-success').should('be.visible');
        cy.get('.alert-success').should('contain', 'You have been successfully subscribed!');
    }
}

export default new Home();