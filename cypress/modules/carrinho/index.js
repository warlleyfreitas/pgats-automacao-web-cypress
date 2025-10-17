class Carrinho {
    navegarParaCarrinho() {
        cy.get('a[href="/view_cart"]').click();
    }

    navegarParaProdutos() {
        cy.get('a[href="/products"]').click();
    }

    adicionarProdutoAoCarrinho(produtoIndex = 0) {
        
        this.navegarParaProdutos();
        cy.get('.productinfo').eq(produtoIndex).find('a[data-product-id]').click();
        cy.get('button[data-dismiss="modal"]').click();
    }

    verificarProdutoNoCarrinho() {
        this.navegarParaCarrinho();
        cy.get('#cart_info_table').should('be.visible');
        cy.get('.cart_description').should('contain', 'Blue Top');
    }

    removerProdutoDoCarrinho() {
        cy.get('.cart_delete').first().click();
    }

    verificarCarrinhoVazio() {
        cy.contains('Cart is empty!').should('be.visible');
    }

    procederParaCheckout() {
        cy.get('.btn-default').contains('Proceed To Checkout').click();
    }

    verificarTotalDoCarrinho() {
        cy.get('.cart_total_price').should('be.visible');
    }
}

export default new Carrinho();

