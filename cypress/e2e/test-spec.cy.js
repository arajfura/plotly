const { beforeEach } = require('mocha')
import 'cypress-real-events'
import * as constants from '../support/constants'
import mainPage from '../support/mainPage'

describe('Plotly test spec', () => {
  beforeEach(() => {
    /**
     * Set up intercepts to wait for an API response to get a few elements.
     * This will ensure the page is ready and loaded!
     */
    cy.intercept({
      method: 'GET',
      url: constants.endpoint.installModalButon,
    }).as('installButtonLoaded')

    cy.intercept({
      method: 'GET',
      url: constants.endpoint.editorFileTree,
    }).as('editorFileTreeLoaded')

    // Visit the starting page
    cy.visit(constants.url.main)
  })

  it('can see the weekly downloads number', () => {
    // Scroll the page until the text is visible
    cy.contains(constants.text.lovedAndTrusted).scrollIntoView()
    // Verify the number of downloads by checking the parent element of "Weekly downloads"
    cy.contains(constants.text.weeklyDownloads)
      .parent()
      .should('contain', constants.text.numberOfDownloads)
  })

  it('can navigate to Company, then About Cypress', () => {
    // Using a mouseover event, navigate to About Cypress from the top menu
    cy.get(mainPage.mainMenu).within(() => {
      cy.get(mainPage.mainMenuCompany).trigger('mouseover')
    })
    cy.contains('a', constants.text.aboutCypress).click()
    // Verify the page is loaded
    cy.url().should('include', constants.url.aboutUs)
    cy.contains(constants.text.aboutUs).should('be.visible')
  })

  it('can copy text when pressing "npm install cypress"', { browser: 'chrome' }, () => {
    // Allow Cypress to read/write from the clipboard
    mainPage.enableClipboardReadWrite()
    /**
     * Wait for API responses, then click "npm install cypress" button to open the popup.
     * Note: I found that without the forced wait time the button will not open the popup when clicked.
     * It seems the page has to "settle" before it can be interacted with and Cypress is just too fast.
     */
    cy.wait('@installButtonLoaded')
      .wait('@editorFileTreeLoaded')
      .then(() => {
        cy.contains(constants.text.npmInstallCypress)
          .click()
          .then(() => {
            cy.get(mainPage.modalLabel).should('contain', constants.text.installingCypress)
            /**
             * Copy the text using the button on the "Installing Cypress" pop-up.
             * Use realClick function from cypress-real-events repo,
             * because regular click does not work.
             */
            cy.get(mainPage.copyToClipboardButton).realClick()
          })
      })

    // Verify the copied text is correct
    cy.window().then((win) => {
      win.navigator.clipboard.readText().then((text) => {
        expect(text).to.eq(constants.text.npmInstallSaveDev)
      })
    })
  })

  it('can navigate to Product, then Visual Review', () => {
    // Using a mouseover event, navigate to Product from the top menu
    cy.get(mainPage.mainMenu).within(() => {
      cy.get(mainPage.mainMenuProduct).trigger('mouseover')
    })
    cy.contains('a', constants.text.visualReviews).click()
    // Verify the page is loaded
    cy.contains(constants.text.reviewAndDebug).should('be.visible')
  })

  it('can verify green border around "Test Analytics" after scrolling', () => {
    // Using a mouseover event, navigate to Product from the top menu
    cy.get(mainPage.mainMenu).within(() => {
      cy.get(mainPage.mainMenuProduct).trigger('mouseover')
    })
    cy.contains('a', constants.text.smartOrchestration).click()
    // Verify the page is loaded
    cy.contains(constants.text.optimizeRuns).should('be.visible')
    // Scroll to just below Test Analytics
    cy.contains('button', constants.text.projectHealth).scrollIntoView()
    cy.url().should('include', constants.url.testAnalytics)
    // Verify the class name of the round green border around anchor button
    cy.get(mainPage.testAnalyticsAnchor).should('have.class', constants.borderColourJade200)
  })
})
