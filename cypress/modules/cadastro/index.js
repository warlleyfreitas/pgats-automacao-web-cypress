import { faker } from '@faker-js/faker';

class Cadastro {
    preencherFormularioDeCadastroCompleto() {
        const timestamp = Date.now();
        const testEmail = `test-pgats${timestamp}@qa.com`;
        const testName = 'test-pgats';
        const testPassword = 'TestPassword123';

    
        cy.get('a[href="/login"]').click();

        
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const address = faker.location.streetAddress();
        const state = faker.location.state();
        const city = faker.location.city();
        const country = faker.location.country();
        const zipCode = faker.location.zipCode();
        const phoneNumber = faker.phone.number();

        
        cy.url().should('include', '/signup');
        cy.contains('h2', 'Enter Account Information').should('be.visible');

        
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

    preencherFormularioDePreCadastro() {
        const timestamp = Date.now();
        const testEmail = `test-pgats${timestamp}@qa.com`;
        const testName = 'test-pgats';

        
        cy.get('input[data-qa="signup-name"]').type(testName);
        cy.get('input[data-qa="signup-email"]').type(testEmail);
        cy.get('button[data-qa="signup-button"]').click();

        
        cy.url().should('include', '/signup');
        cy.contains('h2', 'Enter Account Information').should('be.visible');
    }

    verificarErroEmailExistente() {
        cy.contains('Email Address already exist!').should('be.visible');
    }

    verificarSucessoCadastro() {
        cy.contains('h2', 'Account Created!').should('be.visible');
        cy.get('a[data-qa="continue-button"]').click();
    }
}

export default new Cadastro();