import { faker } from '@faker-js/faker';

class Cadastro {
    preencherFormularioDeCadastroCompleto() {
        const testPassword = 'test-pgats';

        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const address = faker.location.streetAddress();
        const state = faker.location.state();
        const city = faker.location.city();
        const country = "India";
        const zipCode = faker.location.zipCode();
        const phoneNumber = faker.phone.number();

        cy.get('input[data-qa="password"]').type(testPassword);
        cy.get('input[data-qa="first_name"]').type(firstName);
        cy.get('input[data-qa="last_name"]').type(lastName);
        cy.get('input[data-qa="address"]').type(address);
        cy.get('select[data-qa="country"]').select(country);
        cy.get('input[data-qa="state"]').type(state);
        cy.get('input[data-qa="city"]').type(city);
        cy.get('input[data-qa="zipcode"]').type(zipCode);
        cy.get('input[data-qa="mobile_number"]').type(phoneNumber);

        cy.get('button[data-qa="create-account"]').click();
    }

    preencherFormularioDeCadastroCompletoComTodosOsCampos() {
        const testPassword = 'test-pgats';
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const company = faker.company.name();
        const address = faker.location.streetAddress();
        const address2 = faker.location.secondaryAddress();
        const state = faker.location.state();
        const city = faker.location.city();
        const country = "India";
        const zipCode = faker.location.zipCode();
        const phoneNumber = faker.phone.number();

        // Passo 9: Preencher detalhes - Title, Name, Email, Password, Date of birth
        cy.get('#id_gender1').check(); // Title: Mr.
        cy.get('input[data-qa="password"]').type(testPassword);
        cy.get('select[data-qa="days"]').select('15');
        cy.get('select[data-qa="months"]').select('7');
        cy.get('select[data-qa="years"]').select('1990');

        // Passo 10: Selecionar checkbox 'Sign up for our newsletter!'
        cy.get('#newsletter').check();

        // Passo 11: Selecionar checkbox 'Receive special offers from our partners!'
        cy.get('#optin').check();

        // Passo 12: Preencher detalhes - First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
        cy.get('input[data-qa="first_name"]').type(firstName);
        cy.get('input[data-qa="last_name"]').type(lastName);
        cy.get('input[data-qa="company"]').type(company);
        cy.get('input[data-qa="address"]').type(address);
        cy.get('input[data-qa="address2"]').type(address2);
        cy.get('select[data-qa="country"]').select(country);
        cy.get('input[data-qa="state"]').type(state);
        cy.get('input[data-qa="city"]').type(city);
        cy.get('input[data-qa="zipcode"]').type(zipCode);
        cy.get('input[data-qa="mobile_number"]').type(phoneNumber);

        // Passo 13: Clicar no botão 'Create Account'
        cy.get('button[data-qa="create-account"]').click();
    }

    preencherFormularioDePreCadastro() {
        const timestamp = Date.now();
        const testName = 'test-pgats';
        const testEmail = `test-pgats${timestamp}@qa.com`;

        cy.get('input[data-qa="signup-name"]').type(testName);
        cy.get('input[data-qa="signup-email"]').type(testEmail);
    }

    preencherFormularioDeCadastroEmailExistente(userName, testEmail) {
        cy.get('input[data-qa="signup-name"]').type(userName);
        cy.get('input[data-qa="signup-email"]').type(testEmail);
    }

    verificarErroEmailExistente() {
        cy.contains('Email Address already exist!').should('be.visible');
    }

    verificarSucessoCadastro() {
        cy.contains('h2', 'Account Created!').should('be.visible');
        cy.get('a[data-qa="continue-button"]').click();
    }

    verificarNovoUsuarioSignup() {
        cy.contains('h2', 'New User Signup!').should('be.visible');
    }

    verificarEnterAccountInformation() {
        cy.url().should('include', '/signup');
        cy.contains('h2', 'Enter Account Information').should('be.visible');
    }

    verificarAccountCreated() {
        cy.get('h2[data-qa="account-created"]').should('be.visible');
        cy.contains('h2', 'Account Created!').should('be.visible');
    }

    clicarBotaoSignup() {
        cy.get('button[data-qa="signup-button"]').click();
    }
}

export default new Cadastro();