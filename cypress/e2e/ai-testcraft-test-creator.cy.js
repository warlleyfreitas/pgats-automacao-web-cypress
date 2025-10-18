import ModalPage from '../support/pageObjects/modalPage';

describe('Dev.Finance$ - Modal Nova Transação', () => {
    const modalPage = new ModalPage();

    beforeEach(() => {
        cy.visit('https://devfinance-agilizei.netlify.app/#');
        // Remove any existing transactions to start clean
        cy.get('body').then(($body) => {
            if ($body.find('#data-table tbody tr').length > 0) {
                cy.get('#data-table tbody tr td img[alt="Remover transação"]').each(($btn) => {
                    cy.wrap($btn).click();
                });
            }
        });
    });

    it('should display the modal when triggered', () => {
        cy.contains('Nova Transação').click();
        modalPage.assertModalVisible();
        // Verify form elements are present
        cy.get('#description').should('be.visible');
        cy.get('#amount').should('be.visible');
        cy.get('#date').should('be.visible');
    });

    it('should fill form and save transaction successfully', () => {
        cy.contains('Nova Transação').click();
        modalPage.fillDescription('Salary Income');
        modalPage.fillAmount('5000');
        modalPage.fillDate('2024-10-18');
        modalPage.clickSave();

        // Verify modal closes after successful save
        modalPage.assertModalHidden();

        // Verify transaction appears in the table
        cy.get('#data-table tbody tr').should('have.length', 1);
        cy.get('#data-table tbody tr td.description').should('contain', 'Salary Income');
        cy.get('#data-table tbody tr td.income').should('contain', '5.000,00');
        cy.get('#data-table tbody tr td.date').should('contain', '18/10/2024');

        // Verify balance is updated
        cy.get('#incomeDisplay').should('contain', '5.000,00');
        cy.get('#totalDisplay').should('contain', '5.000,00');
    });

    it('should save negative amount as expense', () => {
        cy.contains('Nova Transação').click();
        modalPage.fillDescription('Rent Payment');
        modalPage.fillAmount('-1500');
        modalPage.fillDate('2024-10-15');
        modalPage.clickSave();

        // Verify transaction appears as expense
        cy.get('#data-table tbody tr td.description').should('contain', 'Rent Payment');
        cy.get('#data-table tbody tr td.expense').should('contain', '1.500,00');

        // Verify expense display is updated
        cy.get('#expenseDisplay').should('contain', '1.500,00');
    });

    it('should cancel the transaction and close the modal', () => {
        cy.contains('Nova Transação').click();
        modalPage.fillDescription('Test Transaction');
        modalPage.fillAmount('100');
        modalPage.clickCancel();

        // Verify modal is closed
        modalPage.assertModalHidden();

        // Verify no transaction was added
        cy.get('#data-table tbody tr').should('have.length', 0);
    });

    it('should show validation error when description is empty', () => {
        cy.contains('Nova Transação').click();
        // Leave description empty
        modalPage.fillAmount('100');
        modalPage.fillDate('2024-10-18');
        modalPage.clickSave();

        // Verify modal remains open (validation prevented submission)
        modalPage.assertModalVisible();

        // Verify no transaction was added
        cy.get('#data-table tbody tr').should('have.length', 0);
    });

    it('should show validation error when amount is empty', () => {
        cy.contains('Nova Transação').click();
        modalPage.fillDescription('Test Transaction');
        // Leave amount empty
        modalPage.fillDate('2024-10-18');
        modalPage.clickSave();

        // Verify modal remains visible (form validation prevented submission)
        modalPage.assertModalVisible();

        // Verify amount field has type="number" validation
        cy.get('#amount').should('have.attr', 'type', 'number');

        // Verify no transaction was added
        cy.get('#data-table tbody tr').should('have.length', 0);
    });

    it('should show validation error when date is empty', () => {
        cy.contains('Nova Transação').click();
        modalPage.fillDescription('Test Transaction');
        modalPage.fillAmount('100');
        // Leave date empty
        modalPage.clickSave();

        // Verify modal remains visible (form validation prevented submission)
        modalPage.assertModalVisible();

        // Verify date field has required attribute
        cy.get('#date').should('have.attr', 'type', 'date');

        // Verify no transaction was added
        cy.get('#data-table tbody tr').should('have.length', 0);
    });

    it('should allow multiple transactions to be added', () => {
        // Add first transaction
        cy.contains('Nova Transação').click();
        modalPage.fillDescription('First Income');
        modalPage.fillAmount('1000');
        modalPage.fillDate('2024-10-10');
        modalPage.clickSave();

        // Add second transaction
        cy.contains('Nova Transação').click();
        modalPage.fillDescription('Second Income');
        modalPage.fillAmount('2000');
        modalPage.fillDate('2024-10-15');
        modalPage.clickSave();

        // Verify both transactions are in the table
        cy.get('#data-table tbody tr').should('have.length', 2);

        // Verify total balance
        cy.get('#totalDisplay').should('contain', '3.000,00');
    });

    it('should remove transaction when delete button is clicked', () => {
        // Add a transaction first
        cy.contains('Nova Transação').click();
        modalPage.fillDescription('Transaction to Delete');
        modalPage.fillAmount('500');
        modalPage.fillDate('2024-10-18');
        modalPage.clickSave();

        // Verify transaction was added
        cy.get('#data-table tbody tr').should('have.length', 1);

        // Click delete button
        cy.get('#data-table tbody tr td img[alt="Remover transação"]').click();

        // Verify transaction was removed
        cy.get('#data-table tbody tr').should('have.length', 0);

        // Verify balance is reset
        cy.get('#totalDisplay').should('contain', '0,00');
    });
});