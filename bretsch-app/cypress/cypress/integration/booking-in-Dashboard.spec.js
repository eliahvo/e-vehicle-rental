import { loginBuilder } from '../builder/LoginUser';
import { profileBuilder } from '../builder/profile';

describe("Dashboard-filter", () => {

const login = loginBuilder({})();


it("can filter a car ", () => {
    cy.visit("/");
    cy.findByTestId(/login-button-id/i).click();
    cy.findByLabelText(/E-Mail/i).type(login.email);
    cy.findByLabelText(/Password/i).type(login.password);
    cy.findByText("Sign In").click();
    cy.findByTestId(/Dashboard-button-id/i).click();
    cy.findByTestId(/dashboard-filterButton1/i).click();
    cy.findByTestId(/dashboard-filterButtonOption2/i).children().children().children().first().click();
    cy.findByTestId(/dashboard-filterButtonOption2/i).click();
    expect(cy.findByTestId(/dashboard-filterButton1/i).next().next().children().children().children().children().next().next().children().children().next().next().children().should('have.length', 4));
})

});
//cy.findByTestId(/dashboard-filterButton1/i).next().next().children().children().children().children().next().next().children().children().next().next().children().first().click();
