import { loginBuilder } from '../builder/LoginUser';
import { registerBuilder } from '../builder/RegisterUser';

describe("Dashboard", () => {

const login = loginBuilder({})();
const register = registerBuilder({})();


it("can login to the website", () => {
    cy.visit("/");
    cy.findByTestId(/login-button-id/i).click();
    cy.findByLabelText(/E-Mail/i).type(login.email);
    cy.findByLabelText(/Password/i).type(login.password);
    cy.findByText("Sign In").click();
    cy.findByTestId(/drawer-id/i).click();
    expect(cy.findByTestId(/role-id/i).should('have.text','Role: \'admin\'.'));
});


it("can register new user", () => { 
    cy.visit("/");
    cy.findByTestId(/login-button-id/i).click({ force: true });
    cy.findByTestId(/register-button-id/i).click({ force: true });
    cy.findByLabelText(/Email Address/i).type(register.email);
    cy.findByTestId(/password-id1/i).type(register.password);
    cy.findByTestId(/confpassword-id2/i).type(register.password);
    cy.findByTestId(/next-finish-id/i).click({ force: true });
    cy.findByLabelText(/First name/i).type(register.firstname);
    cy.findByLabelText(/Last name/i).type(register.lastname);
    cy.findByLabelText(/Birthdate/i).type(register.birthdate);
    cy.findByLabelText(/Street and Number/i).type(register.streetAndNumber);
    cy.findByLabelText(/City/i).type(register.city);
    cy.findByTestId(/next-finish-id/i).click({ force: true });
    cy.findByTestId(/next-finish-id/i).click({ force: true });
    cy.findByTestId(/drawer-id/i).click({ force: true });
    expect(cy.findByTestId(/user-name-id/i).should('have.text',`Logged in as ${register.firstname}.`));
    
})





});