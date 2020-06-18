// / <reference types="Cypress" />

const loginPath = 'http://testing.coe.com:30022/en/account/login/';

function requestFactory(apiType) {
    const baseURL = 'http://testing.coe.com:30022/en';
    switch (apiType) {
        case 'search':
            return `${baseURL}/search/?q=`;
        default:
            throw new TypeError('Unknown api')
    }
}
const searchRequest = (searchTerm) => requestFactory('search') + searchTerm;

describe('Cypress demo', () => {
    beforeEach(() => {
        cy.visit('http://testing.coe.com:30022');
    });

    Cypress.Commands.add('loginByCSRF', (csrfToken) => {
        cy.request({
            method: 'POST',
            url: '/en/account/login/',
            failOnStatusCode: false, // dont fail so we can make assertions
            form: true, // we are submitting a regular form body
            body: {
                username: 'novaci@gmail.com',
                password: '123456',
                _csrf: csrfToken, // insert this as part of form body
            },
        })
    });

    it('Failed before reaching steps', () => {
        cy.contains('Accessories').click();
        cy.get('.product-image').should.have.lenth(10);
    });

    it.skip('REST API', () => {
        const request = searchRequest('Red');

        cy.request({
            method: 'GET',
            url: request,
        }).then((response) => {
            expect(response.status).to.equal(200);
            cy.log(response);
        });
    });
});
