// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (userInfo) => {
    cy.request({
        url: Cypress.env('url') + '/auth/login.svc',
        method: 'POST',
        body: {
          username: userInfo.user || 'manager',
          password: userInfo.password || 'manager',
          schema: userInfo.schema
        }
    })
})

Cypress.Commands.add("toMatchDomTextSnapShot", {prevSubject: true}, (subject) => {
    cy.wrap({"DomText": subject.text()}).toMatchSnapshot();
})

Cypress.Commands.add("startStep", (message, step) => {
    Cypress.log({
        "name": '[Start ' + step + ']',
        "message": message
    })
})

Cypress.Commands.add("endStep", (message, step) => {
    Cypress.log({
        "name": '[End ' + step + ']',
        "message": message
    })
})

Cypress.Commands.add("subStep", (message, step) => {
    Cypress.log({
        "name": '--' + step,
        "message": message
    })
})

Cypress.Commands.add("step", (index, message) => {
    Cypress.log({
        "name": '[Step ' + index + ']',
        "message": message
    })
});

Cypress.Commands.add('total', (total) => {
    Cypress.log({
        "name": '[Step Total]',
        "message": total
    })
})