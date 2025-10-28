import { faker } from '@faker-js/faker';

class Checkout {
    // Verificações
    verificarPaginaCarrinho() {
        cy.url().should('include', '/view_cart');
        cy.get('#cart_info_table').should('be.visible');
    }

    verificarDetalhesEndereco() {
        cy.get(':nth-child(2) > .heading').should('be.visible');
        cy.get('#address_delivery').should('be.visible');
        cy.get('#address_invoice').should('be.visible');
    }

    verificarRevisaoPedido() {
        cy.get(':nth-child(4) > .heading').should('be.visible');
        cy.get('.cart_description').should('be.visible');
    }

    verificarMensagemSucessoPedido() {
        cy.get('[data-qa="order-placed"]').should('be.visible');
        cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');
    }

    // Ações
    procederParaCheckout() {
        cy.get('.btn-default').contains('Proceed To Checkout').click();
    }

    inserirComentarioPedido(comentario) {
        cy.get('textarea[name="message"]').type(comentario);
    }

    clicarPlaceOrder() {
        cy.get('a[href="/payment"]').click();
    }

    preencherDadosPagamento(nome, numeroCartao, cvc, mesExpiracao, anoExpiracao) {
        cy.get('[data-qa="name-on-card"]').type(nome);
        cy.get('[data-qa="card-number"]').type(numeroCartao);
        cy.get('[data-qa="cvc"]').type(cvc);
        cy.get('[data-qa="expiry-month"]').type(mesExpiracao);
        cy.get('[data-qa="expiry-year"]').type(anoExpiracao);
    }

    preencherDadosPagamentoComDadosFaker() {
        const nome = faker.person.fullName();
        const numeroCartao = faker.finance.creditCardNumber();
        const cvc = faker.finance.creditCardCVV();
        const mesExpiracao = '12';
        const anoExpiracao = '2027';

        this.preencherDadosPagamento(nome, numeroCartao, cvc, mesExpiracao, anoExpiracao);
    }

    clicarPayAndConfirmOrder() {
        cy.get('[data-qa="pay-button"]').click();
    }
}

export default new Checkout();

