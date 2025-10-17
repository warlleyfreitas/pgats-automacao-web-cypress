/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

// Import modules
import menu from '../modules/menu';
import login from '../modules/login';
import cadastro from '../modules/cadastro';
import contato from '../modules/contato';
import carrinho from '../modules/carrinho';


describe('Automation Exercise - E2E Tests with Modules', () => {
    beforeEach(() => {
        cy.visit('https://automationexercise.com');
    });
    describe('Menu Module Tests', () => {
        it('Should navigate to login page from menu', () => {
            menu.navegarParaLogin();
            cy.url().should('include', '/login');
            cy.contains('h2', 'Login to your account').should('be.visible');
        });

        it('Should navigate to contact page from menu', () => {
            contato.navegarParaContato();
            cy.url().should('include', '/contact_us');
        });

        it('Should navigate to products page from menu', () => {
            carrinho.navegarParaProdutos();
            cy.url().should('include', '/products');
        });
    });
    describe('Cadastro Module Tests', () => {
        beforeEach(() => {
            menu.navegarParaLogin();
        });

        it('Should successfully start signup process', () => {
            cadastro.preencherFormularioDePreCadastro();
        });

        it('Should complete full signup process with account information', () => {
            cadastro.preencherFormularioDePreCadastro();
            cadastro.preencherFormularioDeCadastroCompleto();
            cadastro.verificarSucessoCadastro();
        });

        it('Should show error for existing email during signup', () => {
            const existingEmail = 'test-pgats1759587370861@qa.com';
            const testName = 'test-pgats';

            cy.get('input[data-qa="signup-name"]').type(testName);
            cy.get('input[data-qa="signup-email"]').type(existingEmail);
            cy.get('button[data-qa="signup-button"]').click();

            cadastro.verificarErroEmailExistente();
        });
    });

    describe('Login Module Tests', () => {
        beforeEach(() => {
            menu.navegarParaLogin();
        });

        it('Should successfully login with valid credentials', () => {
            login.preencherFormularioDeLogin();
            login.verificarLoginComSucesso();
        });

        it('Should show error for invalid credentials', () => {
            login.preencherFormularioDeLogin('invalid@example.com', 'wrongpassword');
            login.verificarErroCredenciaisInvalidas();
        });

        it('Should validate required fields in login form', () => {
            cy.get('button[data-qa="login-button"]').click();
            login.verificarValidacaoCamposObrigatorios();
        });

        it('Should allow user to logout', () => {
            login.preencherFormularioDeLogin();
            login.verificarLoginComSucesso();
            menu.efetuarLogout();
            cy.url().should('include', '/login');
        });
    });

   
    describe('Contato Module Tests', () => {
        it('Should fill and submit contact form with static data', () => {
            contato.navegarParaContato();
            contato.preencherFormularioDeContato();
            contato.anexarArquivo();
            contato.enviarFormulario();
            contato.verificarSucessoEnvio();
        });

        it('Should fill and submit contact form with Faker.js data', () => {
            contato.preencherEEnviarFormularioCompleto();
        });
    });

    
    describe('Carrinho Module Tests', () => {
        it('Should add product to cart', () => {
            carrinho.adicionarProdutoAoCarrinho();
        });

        it.skip('Should verify product in cart', () => {
            carrinho.adicionarProdutoAoCarrinho();
            carrinho.verificarProdutoNoCarrinho();
        });

        it.skip('Should remove product from cart', () => {
            carrinho.adicionarProdutoAoCarrinho();
            carrinho.verificarProdutoNoCarrinho();
            carrinho.removerProdutoDoCarrinho();
            carrinho.verificarCarrinhoVazio();
        });
    });

});
