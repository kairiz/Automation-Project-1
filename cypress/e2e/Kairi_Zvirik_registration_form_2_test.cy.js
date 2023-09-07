beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', () => {
        //Assignment 4.1.1
        cy.get('#username').type('Something')
        cy.get('#email').type('email@email.com')
        cy.get('[data-cy="name"]').type('Kati')
        cy.get('#lastName').type('Karu')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#password').type('Password456')
        cy.get('#confirm').type('Password123') |

            cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        //in order to activate submit button, user has to click somewhere outside the input field
        cy.get('h2').contains('Password').click()
        cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match!')
    })

    it('User can use only same both first and validation passwords', () => {
        //Assignment 4.1.2
        cy.get('#username').type('Something')
        cy.get('#email').type('email@email.com')
        cy.get('[data-cy="name"]').type('Kati')
        cy.get('#lastName').type('Karu')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#password').type('Password456')
        cy.get('#confirm').type('Password456') |
            //in order to activate submit button, user has to click somewhere outside the input field
            cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
    })

    it('User can submit form with all fields added', () => {
        //Assignment 4.2
        cy.get('#username').type('Something')
        cy.get('#email').type('email@email.com')
        cy.get('[data-cy="name"]').type('Kati')
        cy.get('#lastName').type('Karu')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#password').type('Password456')
        cy.get('#confirm').type('Password456') |
            cy.get('#htmlFavLanguage').click()
        cy.get('#vehicle1').click()
        cy.get('#vehicle2').click()
        cy.get('#cars').select('saab')
        cy.get('#animal').select('hippo')
        //in order to activate submit button, user has to click somewhere outside the input field
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible').should('contain', " User successfully submitted registration")
    })

    it('User can submit form with valid data and only mandatory fields added', () => {
        //Assignment 4.3 
        cy.get('#username').type('Something')
        cy.get('#email').type('email@email.com')
        cy.get('[data-cy="name"]').type('Kati')
        cy.get('#lastName').type('Karu')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#password').type('Password456')
        cy.get('#confirm').type('Password456') |
            //in order to activate submit button, user has to click somewhere outside the input field
            cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible').should('contain', " User successfully submitted registration")

    })


    it('User can submit form with valid data and only mandatory fields added', () => {
        //Assignment 4.4
        cy.get('#username').type('Something')
        cy.get('#email').type('email@email.com')
        cy.get('[data-cy="name"]').type('Kati')
        cy.get('#lastName').type('Karu')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#password').type('Password456')
        cy.get('#confirm').type('Password456')
        //in order to activate submit button, user has to click somewhere outside the input field
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        // Remove data from one field
        cy.get('#lastName').scrollIntoView()
        cy.get('#lastName').clear()
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')

    })

})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    //Assignment 5.1
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height, to less than 178 and greater than 100
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })
    //Assignment 5.2
    it('My test for second picture', () => {
        cy.log('Will check second logo source and size')
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
        cy.get('[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 100)
            .and('be.greaterThan', 50)
    });

    //Assignment 5.3
    it('Check navigation part - second link', () => {
        cy.get('nav').children().should('have.length', 2)

        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')

        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()

        cy.url().should('contain', '/registration_form_3.html')

        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check that radio button list is correct', () => {
        cy.get('input[type="radio"]').should('have.length', 4)

        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'PHP')

        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    // Assignment 5.4
    it('Check that the favorite transport checkbox is correct', () => {
        cy.get('input[type="checkbox"]').should('have.length', 3)
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')

        cy.get('input[type="checkbox"]').next().eq(0).should('have.text', 'I have a bike')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text', 'I have a car')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text', 'I have a boat')

        cy.get('#vehicle1').click()
        cy.get('h2').contains('Your favourite transport').click()
        cy.get('#vehicle1').should('be.checked')

        cy.get('#vehicle2').click()
        cy.get('h2').contains('Your favourite transport').click()
        cy.get('#vehicle2').should('be.checked')
        cy.get('#vehicle1').should('be.checked')

    })

    // Assignment 5.5
    it('Favorite animals dropdown is correct', () => {
        cy.get('#animal').children().should('have.length', 6)
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')

    })
})

function inputValidData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    // If element has multiple classes, then one of them can be used
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass')
    cy.get('h2').contains('Password').click()
}