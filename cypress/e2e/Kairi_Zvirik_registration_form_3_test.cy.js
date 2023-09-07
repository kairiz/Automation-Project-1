beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})


describe('Visual tests for Registration form 3', () => {

    //Radio button
    it('Check that radio button list is correct', () => {
        cy.get('input[type="radio"]').should('have.length', 4)

        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'Daily')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'Weekly')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'Monthly')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'Never')

        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('h2').contains('Birthday').click()
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('h2').contains('Birthday').click()
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    //Country dropdown
    it('Country dropdown is correct', () => {
        cy.get('#country').children().should('have.length', 4)

        cy.get('#country').find('option').eq(0).should('be.empty')
        cy.get('#country').find('option').eq(1).should('have.text', 'Spain')
        cy.get('#country').find('option').eq(2).should('have.text', 'Estonia')
        cy.get('#country').find('option').eq(3).should('have.text', 'Austria')

        cy.get('#country').select('Spain')
        cy.get('#city').find('option').eq(0).should('be.empty')
        cy.get('#city').find('option').eq(1).should('have.text', 'Malaga')
        cy.get('#city').find('option').eq(2).should('have.text', 'Madrid')
        cy.get('#city').find('option').eq(3).should('have.text', 'Valencia')
        cy.get('#city').find('option').eq(4).should('have.text', 'Corralejo')

        cy.get('#country').select('Estonia')
        cy.get('#city').find('option').eq(0).should('be.empty')
        cy.get('#city').find('option').eq(1).should('have.text', 'Tallinn')
        cy.get('#city').find('option').eq(2).should('have.text', 'Haapsalu')
        cy.get('#city').find('option').eq(3).should('have.text', 'Tartu')

        cy.get('#country').select('Austria')
        cy.get('#city').find('option').eq(0).should('be.empty')
        cy.get('#city').find('option').eq(1).should('have.text', 'Vienna')
        cy.get('#city').find('option').eq(2).should('have.text', 'Salzburg')
        cy.get('#city').find('option').eq(3).should('have.text', 'Innsbruck')

    })

    //Checkboxes (1st checkbox text?)
    it('Check that the checkboxes are correct', () => {
        cy.get('input[type="checkbox"]').should('have.length', 2)
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')

        cy.get('input[type="checkbox"]').eq(0).click()
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).click()
        cy.get('input[type="checkbox"]').eq(1).should('be.checked')

        cy.get('input[type="checkbox"]').next().eq(0).should('have.text', '')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text', 'Accept our cookie policy')

    })

    //Link in checkbox
    it('Check navigation part - link in second checkbox', () => {
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text', 'Accept our cookie policy')
        cy.get('input[type="checkbox"]').next().eq(1).click()

        cy.url().should('eq', 'http://localhost:54924/cypress/fixtures/cookiePolicy.html')
        cy.get('#successMessage').should('contain', 'This is a demo page, no cookie policies are used for demo')

        cy.go('back')
        cy.log('Back again in registration form 3')
    })

    //Email format
    it('Check if the email format is correct', () => {
        cy.get('input[type="email"]').should('have.class', 'email')
        
        cy.get('input[type="email"]').type('email@email.com')
        cy.get('#emailAlert').should('not.be.visible')

        cy.get('input[type="email"]').clear()
        cy.get('#emailAlert').should('be.visible').and('contain', 'Email is required.')

        cy.get('input[type="email"]').type('email')
        cy.get('#emailAlert').should('be.visible').and('contain', 'Invalid email address.')

        cy.get('input[type="email"]').type('@email.com')
        cy.get('#emailAlert').should('not.be.visible')

    })
})


describe('Functional tests for Registration form 3', () => {

    //All fields filled
    it('User can submit form with all fields filled', () => {
        cy.get('#name').clear().type('Something')
        cy.get('input[type="email"]').type('email@email.com')
        cy.get('#country').select('Estonia')
        cy.get('#city').select('Tallinn')
        cy.get('input[type="date"]').eq(0).click().type('1991-01-01')
        cy.get('input[type="radio"]').eq(3).check().should('be.checked')
        cy.get('input[type="date"]').eq(1).click().type('1991-01-01')
        cy.get('input[type="checkbox"]').eq(0).click()
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).click()
        cy.get('input[type="checkbox"]').eq(1).should('be.checked')
        cy.get('#myFile').click().selectFile('picture.jpeg')

        cy.get('input[type="submit"]').eq(1).should('be.enabled')
        cy.get('input[type="submit"]').eq(1).click()
        cy.get('h1').should('contain', "Submission received")
    })

    //Only mandatory fields filled
    it('User can submit form with only mandatory fields added', () => {
        cy.get('#name').clear().type('Something')
        cy.get('input[type="email"]').type('email@email.com')
        cy.get('#country').select('Estonia')
        cy.get('#city').select('Tallinn')
        cy.get('input[type="radio"]').eq(3).check().should('be.checked')
        cy.get('input[type="date"]').eq(1).click().type('1991-01-01')
        cy.get('input[type="checkbox"]').eq(0).click()
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')

        cy.get('input[type="submit"]').eq(1).should('be.enabled')
        cy.get('input[type="submit"]').eq(1).click()
        cy.get('h1').should('contain', "Submission received")

    })

    //Mandatory field not filled
    it('User can not submit form without mandatory fields added', () => {
        cy.get('#name').clear().type('Something')
        cy.get('input[type="submit"]').eq(1).should('be.disabled')

        cy.get('input[type="email"]').type('email@email.com')
        cy.get('input[type="submit"]').eq(1).should('be.disabled')

        cy.get('#country').select('Estonia')
        cy.get('input[type="submit"]').eq(1).should('be.disabled')

        cy.get('#city').select('Tallinn')
        cy.get('input[type="submit"]').eq(1).should('be.disabled')

        cy.get('input[type="radio"]').eq(3).check().should('be.checked')
        cy.get('input[type="submit"]').eq(1).should('be.disabled')

        cy.get('input[type="date"]').eq(1).click().type('1991-01-01')
        cy.get('input[type="submit"]').eq(1).should('be.disabled')

        cy.get('input[type="checkbox"]').eq(0).click()
        cy.get('input[type="submit"]').eq(1).should('be.enabled')
        //Remove data from one mandatory field
        cy.get('input[type="email"]').clear()
        cy.get('#emailAlert').should('be.visible').should('contain', 'Email is required')
        cy.get('input[type="submit"]').eq(1).should('be.disabled')

        cy.get('input[type="email"]').type('email@email.com')
        cy.get('input[type="submit"]').eq(1).should('be.enabled')

        cy.get('input[type="submit"]').eq(1).click()
        cy.get('h1').should('contain', "Submission received")

    })

    //Changing country
    it('Changing country removes previously chosen city', () => {
        cy.get('#name').clear().type('Something')
        cy.get('input[type="email"]').type('email@email.com')
        cy.get('#country').select('Estonia')
        cy.get('#city').select('Tallinn')
        cy.get('input[type="radio"]').eq(3).check().should('be.checked')
        cy.get('input[type="date"]').eq(1).click().type('1991-01-01')
        cy.get('input[type="checkbox"]').eq(0).click()
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')

        cy.get('#country').select('Spain')
        cy.get('#city').find('option').should('be.empty')

        cy.get('input[type="submit"]').eq(1).should('be.disabled')

        cy.get('#city').select('Madrid')
        cy.get('input[type="submit"]').eq(1).should('be.enabled')
        cy.get('input[type="submit"]').eq(1).click()
        cy.get('h1').should('contain', "Submission received")

    })

    //Adding a file
    it('User can add a file', () => {
        cy.get('#myFile').click().selectFile('picture.jpeg')
        cy.get('input[type="submit"]').eq(0).should('be.enabled')
        cy.get('input[type="submit"]').eq(0).click()

    })

})