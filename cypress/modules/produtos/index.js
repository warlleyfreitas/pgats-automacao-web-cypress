class Produtos {
    // Navegação
    navegarParaProdutos() {
        cy.get('a[href="/products"]').click();
    }

    // Verificações de Página
    verificarPaginaAllProducts() {
        cy.url().should('include', '/products');
        cy.contains('h2', 'All Products').should('be.visible');
    }

    verificarListaDeProdutosVisivel() {
        cy.get('.features_items').should('be.visible');
        cy.get('.product-image-wrapper').should('have.length.greaterThan', 0);
    }

    verificarPaginaDetalhesProduto() {
        cy.get('.product-information').should('be.visible');
    }

    verificarDetalhesDoPrimeiroProduto() {
        // Verificar nome do produto
        cy.get('.product-information h2').contains('Blue Top').should('be.visible');

        // Verificar categoria
        cy.get('.product-information p').contains('Category: Women > Tops').should('be.visible');

        // Verificar preço
        cy.get(':nth-child(5) > span').contains('Rs. 500').should('be.visible');

        // Verificar disponibilidade
        cy.get('.product-information p').contains('Availability: In Stock').should('be.visible');

        // Verificar condição
        cy.get('.product-information p').contains('Condition: New').should('be.visible');

        // Verificar marca
        cy.get('.product-information p').contains('Brand: Polo').should('be.visible');
    }

    verificarSearchedProducts() {
        cy.contains('h2', 'Searched Products').should('be.visible');
    }

    verificarProdutosRelacionadosABusca(nomeProduto) {
        cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0);
        cy.get('.features_items').each(($element) => {
            cy.wrap($element).find('.product-image-wrapper > .single-products > .productinfo > p').contains(nomeProduto).should('be.visible');
        });
    }

    // Ações
    clicarViewProductDoPrimeiroProduto() {
        cy.get('.choose a[href*="/product_details/"]').first().click();
    }

    buscarProduto(nomeProduto) {
        cy.get('#search_product').type(nomeProduto);
        cy.get('#submit_search').click();
    }
}

export default new Produtos();

