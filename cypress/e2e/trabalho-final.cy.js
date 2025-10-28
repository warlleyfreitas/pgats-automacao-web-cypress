/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

// Import modules
import menu from '../modules/menu';
import login from '../modules/login';
import cadastro from '../modules/cadastro';
import contato from '../modules/contato';
import carrinho from '../modules/carrinho';
import produtos from '../modules/produtos';
import home from '../modules/home';
import checkout from '../modules/checkout';

describe('Automation Exercise E2E Tests - Trabalho Final', () => {
    beforeEach(() => {
        cy.visit('https://automationexercise.com');
    });

    describe.skip('Register and Login/Logout Test Cases', () => {
        it.skip('Test Case 1: Register User', () => {
            // Passos 1-2: Abrir navegador e Navegar para a URL - coberto pelo beforeEach
            // Passo 3: Verificar que a página inicial está visível com sucesso
            login.verificarPaginaInicial();

            // Passo 4: Clicar no botão 'Signup / Login'
            menu.navegarParaLogin();

            // Passo 5: Verificar que 'New User Signup!' está visível
            cadastro.verificarNovoUsuarioSignup();

            // Passo 6: Inserir nome e endereço de email
            cadastro.preencherFormularioDePreCadastro();

            // Passo 7: Clicar no botão 'Signup'
            cadastro.clicarBotaoSignup();

            // Passo 8: Verificar que 'ENTER ACCOUNT INFORMATION' está visível
            cadastro.verificarEnterAccountInformation();

            // Passos 9-13: Preencher todos os detalhes e criar conta
            cadastro.preencherFormularioDeCadastroCompletoComTodosOsCampos();

            // Passo 14: Verificar que 'ACCOUNT CREATED!' está visível
            cadastro.verificarAccountCreated();

            // Passo 15: Clicar no botão 'Continue'
            cy.get('a[data-qa="continue-button"]').click();

            // Passo 16: Verificar que 'Logged in as username' está visível
            login.verificarLoginComSucesso();

            // Passo 17: Clicar no botão 'Delete Account'
            menu.deletarConta();

            // Passo 18: Verificar que 'ACCOUNT DELETED!' está visível e clicar em 'Continue'
            menu.verificarContaDeletada();
        });

        it.skip('Test Case 2: Login User with correct email and password', () => {
            // Carregar credenciais do fixture
            cy.fixture('validAccount').then((account) => {
                // Passos 1-2: Abrir navegador e Navegar para a URL - coberto pelo beforeEach
                // Passo 3: Verificar que a página inicial está visível com sucesso
                login.verificarPaginaInicial();

                // Passo 4: Clicar no botão 'Signup / Login'
                menu.navegarParaLogin();

                // Passo 5: Verificar que 'Login to your account' está visível
                login.verificarPaginaDeLogin();

                // Passo 6: Inserir email e senha corretos
                // Passo 7: Clicar no botão 'login'
                login.preencherFormularioDeLogin();

                // Passo 8: Verificar que 'Logged in as username' está visível
                login.verificarLoginComSucesso();

                // Passo 9: Clicar no botão 'Delete Account'
                menu.deletarConta();

                // Passo 10: Verificar que 'ACCOUNT DELETED!' está visível
                menu.verificarContaDeletada();
            });
        });

        it('Test Case 3: Login User with incorrect email and password', () => {
            // Passos 1-2: Abrir navegador e Navegar para a URL - coberto pelo beforeEach
            // Passo 3: Verificar que a página inicial está visível com sucesso
            login.verificarPaginaInicial();

            // Passo 4: Clicar no botão 'Signup / Login'
            menu.navegarParaLoginSignUp();

            // Passo 5: Verificar que 'Login to your account' está visível
            login.verificarPaginaDeLogin();

            // Passo 6: Inserir email e senha incorretos
            login.preencherFormularioDeLogin('incorrect@example.com', 'wrongpassword123');

            // Passo 7: Clicar no botão 'login'
            login.clicarBotaoLogin();

            // Passo 8: Verificar que o erro 'Your email or password is incorrect!' está visível
            login.verificarErroCredenciaisInvalidas();
        });

        it('Test Case 4: Logout User', () => {
            // Carregar credenciais do fixture
            cy.fixture('validAccountNotDeleted').then((account) => {
                // Passos 1-2: Abrir navegador e Navegar para a URL - coberto pelo beforeEach
                // Passo 3: Verificar que a página inicial está visível com sucesso
                login.verificarPaginaInicial();

                // Passo 4: Clicar no botão 'Signup / Login'
                menu.navegarParaLoginSignUp();

                // Passo 5: Verificar que 'Login to your account' está visível
                login.verificarPaginaDeLogin();

                // Passo 6: Inserir email e senha corretos
                login.preencherFormularioDeLogin(account.email, account.password);

                // Passo 7: Clicar no botão 'login'
                login.clicarBotaoLogin();

                // Passo 8: Verificar que 'Logged in as username' está visível
                login.verificarLoginComSucesso(account.userName);

                // Passo 9: Clicar no botão 'Logout'
                menu.efetuarLogout();

                // Passo 10: Verificar que o usuário foi navegado para a página de login
                login.verificarPaginaDeLogin();
            });
        });

        it('Test Case 5: Register User with existing email', () => {
            cy.fixture('validAccountNotDeleted').then((account) => {
                // Passos 1-2: Abrir navegador e Navegar para a URL - coberto pelo beforeEach
                // Passo 3: Verificar que a página inicial está visível com sucesso
                login.verificarPaginaInicial();

                // Passo 4: Clicar no botão 'Signup / Login'
                menu.navegarParaLoginSignUp();

                // Passo 5: Verificar que 'New User Signup!' está visível
                cadastro.verificarNovoUsuarioSignup();

                // Passo 6: Inserir nome e email já registrados
                cadastro.preencherFormularioDeCadastroEmailExistente(account.userName, account.email);

                // Passo 7: Clicar no botão 'login'
                cadastro.clicarBotaoSignup();

                // Passo 8: Verificar que o erro 'Your email or password is incorrect!' está visível
                cadastro.verificarErroEmailExistente();

            });

        });
    });

    describe.skip('Contact Us Test Cases', () => {
        it('Test Case 6: Contact Us Form', () => {
            // Passos 1-2: Abrir navegador e Navegar para a URL - coberto pelo beforeEach
            // Passo 3: Verificar que a página inicial está visível com sucesso
            login.verificarPaginaInicial();

            // Passo 4: Clicar no botão 'Contact Us'
            contato.navegarParaContactUs();

            // Passo 5: Verificar que 'GET IN TOUCH' está visível
            contato.verificarGetInTouch();

            // Passo 6: Inserir nome, email, assunto e mensagem
            contato.preencherFormularioDeContato();

            // Passo 7: Fazer upload do arquivo
            contato.anexarArquivo();

            // Passo 8: Clicar no botão 'Submit'
            contato.enviarFormulario();

            // Passo 9: Clicar no botão OK (alert)
            contato.aceitarAlert();

            // Passo 10: Verificar mensagem de sucesso 'Success! Your details have been submitted successfully.'
            contato.verificarSucessoEnvio();

            // Passo 11: Clicar no botão 'Home' e verificar que navegou para a home page com sucesso
            contato.voltarParaHome();
            login.verificarPaginaInicial();
        });


    });

    describe.skip('Products Test Cases', () => {
        it('Test Case 8: Verify All Products and product detail page', () => {
            // Passos 1-2: Abrir navegador e Navegar para a URL - coberto pelo beforeEach
            // Passo 3: Verificar que a página inicial está visível com sucesso
            login.verificarPaginaInicial();

            // Passo 4: Clicar no botão 'Products'
            produtos.navegarParaProdutos();

            // Passo 5: Verificar que o usuário navegou para a página ALL PRODUCTS com sucesso
            produtos.verificarPaginaAllProducts();

            // Passo 6: Verificar que a lista de produtos está visível
            produtos.verificarListaDeProdutosVisivel();

            // Passo 7: Clicar em 'View Product' do primeiro produto
            produtos.clicarViewProductDoPrimeiroProduto();

            // Passo 8: Verificar que o usuário chegou na página de detalhes do produto
            produtos.verificarPaginaDetalhesProduto();

            // Passo 9: Verificar que os detalhes estão visíveis: product name, category, price, availability, condition, brand
            produtos.verificarDetalhesDoPrimeiroProduto();
        });

        it('Test Case 9: Search Product', () => {
            // Passos 1-2: Abrir navegador e Navegar para a URL - coberto pelo beforeEach
            // Passo 3: Verificar que a página inicial está visível com sucesso
            login.verificarPaginaInicial();

            // Passo 4: Clicar no botão 'Products'
            produtos.navegarParaProdutos();

            // Passo 5: Verificar que o usuário navegou para a página ALL PRODUCTS com sucesso
            produtos.verificarPaginaAllProducts();

            // Passo 6: Inserir nome do produto no campo de busca e clicar no botão de busca
            const nomeProduto = 'Tshirt';
            produtos.buscarProduto(nomeProduto);

            // Passo 7: Verificar que 'SEARCHED PRODUCTS' está visível
            produtos.verificarSearchedProducts();

            // Passo 8: Verificar que todos os produtos relacionados à busca estão visíveis
            produtos.verificarProdutosRelacionadosABusca(nomeProduto);
        });

    });

    describe.skip('Subscription Test Cases', () => {
        it('Test Case 10: Verify Subscription in home page', () => {
            // Passos 1-2: Abrir navegador e Navegar para a URL - coberto pelo beforeEach
            // Passo 3: Verificar que a página inicial está visível com sucesso
            login.verificarPaginaInicial();

            // Passo 4: Fazer scroll até o footer
            home.scrollParaFooter();

            // Passo 5: Verificar texto 'SUBSCRIPTION'
            home.verificarTextoSubscription();

            // Passo 6: Inserir endereço de email no campo input e clicar no botão de arrow
            home.preencherEmailSubscription();

            // Passo 7: Verificar mensagem de sucesso 'You have been successfully subscribed!'
            home.verificarMensagemSucessoSubscription();
        });
    });

    describe.skip('Checkout Tests Cases', () => {
        it('Test Case 15: Place Order - Register before checkout', () => {
            // Passos 1-2: Abrir navegador e Navegar para a URL - coberto pelo beforeEach
            // Passo 3: Verificar que a página inicial está visível com sucesso
            login.verificarPaginaInicial();

            // Passo 4: Clicar no botão 'Signup / Login'
            menu.navegarParaLoginSignUp();

            // Passo 5: Preencher todos os detalhes no Signup e criar conta
            cadastro.verificarNovoUsuarioSignup();
            cadastro.preencherFormularioDePreCadastro();
            cadastro.clicarBotaoSignup();
            cadastro.verificarEnterAccountInformation();
            cadastro.preencherFormularioDeCadastroCompletoComTodosOsCampos();

            // Passo 6: Verificar 'ACCOUNT CREATED!' e clicar no botão 'Continue'
            cadastro.verificarAccountCreated();
            cy.get('a[data-qa="continue-button"]').click();

            // Passo 7: Verificar que 'Logged in as username' está no topo
            login.verificarLoginComSucesso('test-pgats');

            // Passo 8: Adicionar produtos ao carrinho
            carrinho.adicionarProdutoAoCarrinho(0);
            carrinho.adicionarProdutoAoCarrinho(1);

            // Passo 9: Clicar no botão 'Cart'
            carrinho.navegarParaCarrinho();

            // Passo 10: Verificar que a página do carrinho está sendo exibida
            checkout.verificarPaginaCarrinho();

            // Passo 11: Clicar em Proceed To Checkout
            carrinho.procederParaCheckout();

            // Passo 12: Verificar Address Details e Review Your Order
            checkout.verificarDetalhesEndereco();
            checkout.verificarRevisaoPedido();

            // Passo 13: Inserir descrição na área de comentário e clicar em 'Place Order'
            checkout.inserirComentarioPedido('Este é um pedido de teste automatizado para o Test Case 15');
            checkout.clicarPlaceOrder();

            // Passo 14: Inserir detalhes de pagamento: Name on Card, Card Number, CVC, Expiration date
            checkout.preencherDadosPagamentoComDadosFaker();

            // Passo 15: Clicar no botão 'Pay and Confirm Order'
            checkout.clicarPayAndConfirmOrder();

            // Passo 16: Verificar mensagem de sucesso 'Your order has been placed successfully!'
            checkout.verificarMensagemSucessoPedido();

            // Passo 17: Clicar no botão 'Delete Account'
            menu.deletarConta();

            // Passo 18: Verificar 'ACCOUNT DELETED!' e clicar no botão 'Continue'
            menu.verificarContaDeletada();
        });

    });

});
