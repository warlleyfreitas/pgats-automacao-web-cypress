/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Automation Exercise - Signup and Login', () => {
    beforeEach(() => {

        cy.visit('https://automationexercise.com');
    });

    describe('User Signup Tests', () => {
        it('Should successfully start signup process', () => {

            const timestamp = Date.now();
            const testEmail = `test-pgats${timestamp}@qa.com`;
            const testName = 'test-pgats';


            cy.xpath('//a[@href="/login"]').click();


            cy.url().should('include', '/login');
            cy.contains('h2', 'Login to your account').should('be.visible');
            cy.contains('h2', 'New User Signup!').should('be.visible');


            cy.xpath('//input[@data-qa="signup-name"]').type(testName);
            cy.xpath('//input[@data-qa="signup-email"]').type(testEmail);
            cy.xpath('//button[@data-qa="signup-button"]').click();


            cy.url().should('include', '/signup');
            cy.contains('h2', 'Enter Account Information').should('be.visible');
        });

        it('Should complete full signup process with account information', () => {
            const timestamp = Date.now();
            const testEmail = `test-pgats${timestamp}@qa.com`;
            const testName = 'test-pgats';
            const testPassword = 'TestPassword123';

            cy.xpath('//a[@href="/login"]').click();

            const firstName = faker.person.firstName();
            const lastName = faker.person.lastName();
            const address = faker.location.streetAddress();
            const state = faker.location.state();
            const city = faker.location.city();
            const country = "India";
            const zipCode = faker.location.zipCode();
            const phoneNumber = faker.phone.number();

            cy.xpath('//input[@data-qa="signup-name"]').type(testName);
            cy.xpath('//input[@data-qa="signup-email"]').type(testEmail);
            cy.xpath('//button[@data-qa="signup-button"]').click();

            cy.url().should('include', '/signup');
            cy.contains('h2', 'Enter Account Information').should('be.visible');

            cy.xpath('//input[@data-qa="password"]').type(testPassword);
            cy.xpath('//input[@data-qa="first_name"]').type(firstName);
            cy.xpath('//input[@data-qa="last_name"]').type(lastName);
            cy.xpath('//input[@data-qa="address"]').type(address);
            cy.xpath('//select[@data-qa="country"]').select(country);
            cy.xpath('//input[@data-qa="state"]').type(state);
            cy.xpath('//input[@data-qa="city"]').type(city);
            cy.xpath('//input[@data-qa="zipcode"]').type(zipCode);
            cy.xpath('//input[@data-qa="mobile_number"]').type(phoneNumber);

            cy.xpath('//button[@data-qa="create-account"]').click();

            cy.contains('h2', 'Account Created!').should('be.visible');
            cy.xpath('//a[@data-qa="continue-button"]').click();
        });

        it('Should show error for existing email during signup', () => {
            const existingEmail = 'test-pgats1759587370861@qa.com';
            const testName = 'test-pgats';

            cy.xpath('//a[@href="/login"]').click();
            cy.xpath('//input[@data-qa="signup-name"]').type(testName);
            cy.xpath('//input[@data-qa="signup-email"]').type(existingEmail);
            cy.xpath('//button[@data-qa="signup-button"]').click();

            cy.contains('Email Address already exist!').should('be.visible');
        });



    });

    describe('User Login Tests', () => {
        it('Should successfully login with valid credentials', () => {
            const validEmail = 'test-pgats1759587370861@qa.com';
            const validPassword = 'TestPassword123';

            cy.xpath('//a[@href="/login"]').click();

            cy.url().should('include', '/login');
            cy.contains('h2', 'Login to your account').should('be.visible');

            cy.xpath('//input[@data-qa="login-email"]').type(validEmail);
            cy.xpath('//input[@data-qa="login-password"]').type(validPassword);
            cy.xpath('//button[@data-qa="login-button"]').click();

            cy.url().should('not.include', '/login');
            cy.contains('a', 'Logged in as').should('be.visible');
        });

        it('Should show error for invalid credentials', () => {
            const invalidEmail = 'invalid@example.com';
            const invalidPassword = 'wrongpassword';

            cy.xpath('//a[@href="/login"]').click();

            cy.xpath('//input[@data-qa="login-email"]').type(invalidEmail);
            cy.xpath('//input[@data-qa="login-password"]').type(invalidPassword);
            cy.xpath('//button[@data-qa="login-button"]').click();

            cy.contains('Your email or password is incorrect!').should('be.visible');
        });

        it('Should validate required fields in login form', () => {
            cy.xpath('//a[@href="/login"]').click();

            cy.xpath('//button[@data-qa="login-button"]').click();

            cy.xpath('//input[@data-qa="login-email"]').should('have.attr', 'required');
            cy.xpath('//input[@data-qa="login-password"]').should('have.attr', 'required');
        });

        it('Should allow user to logout', () => {
            cy.xpath('//a[@href="/login"]').click();
            cy.xpath('//input[@data-qa="login-email"]').type('test-pgats@qa.com');
            cy.xpath('//input[@data-qa="login-password"]').type('123456');
            cy.xpath('//button[@data-qa="login-button"]').click();

            cy.contains('a', 'Logged in as').should('be.visible');

            cy.contains('a', 'Logout').click();

            cy.url().should('include', '/login');
            cy.contains('h2', 'Login to your account').should('be.visible');
        });
    });

    describe('Send Contact US Form with uploading file', () => {
        it('Submitting Contact US Form', () => {

            cy.xpath('//a[contains(@href, "contact")]').click();

            cy.xpath('//input[@data-qa="name"]').type('test-pgats');
            cy.xpath('//input[@data-qa="email"]').type('test-pgats@qa.com');
            cy.xpath('//input[@data-qa="subject"]').type('testing');
            cy.xpath('//textarea[@data-qa="message"]').type('this is a message');

            cy.fixture('example.json').as('file');
            cy.xpath('//input[@type="file"]').selectFile('@file');

            cy.xpath('//*[@data-qa="submit-button"]').click();

            // asserts
            cy.xpath('//*[contains(@class, "status")]').should('be.visible');
            cy.xpath('//*[contains(@class, "status")]').should('have.text', 'Success! Your details have been submitted successfully.');

        });

    });
});
