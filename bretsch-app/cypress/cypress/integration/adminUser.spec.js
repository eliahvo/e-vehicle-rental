import { adminBuilder } from '../builder/admin';
import { loginBuilder } from '../builder/LoginUser';
import { adminVehicleBuilder } from '../builder/adminVehicle';
import { adminUserBuilder } from '../builder/AdminUser';

describe("Admin User", () => {

const login = loginBuilder({})();
const admin = adminBuilder({})();
const adminvehicle = adminVehicleBuilder({})();
const adminUser = adminUserBuilder({})();

it("can create a User", () => {
    cy.visit("/");
    cy.findByTestId(/login-button-id/i).click();
    cy.findByLabelText(/E-Mail/i).type(login.email);
    cy.findByLabelText(/Password/i).type(login.password);
    cy.findByText("Sign In").click();
    cy.findByTestId(/admin-button-id/i).click();
    cy.findByTestId(/admin-createUser-button/i).click();
    cy.findByTestId(/admin-createUser-Email/i).children().children().first().type(adminUser.userEmail);
    cy.findByTestId(/admin-createUser-Password/i).children().children().first().type(adminUser.userPassword);
    cy.findByTestId(/admin-createUser-Firstname/i).children().children().first().type(adminUser.userFirstname);
    cy.findByTestId(/admin-createUser-Lastname/i).children().children().first().type(adminUser.userLastname);
    cy.findByTestId(/admin-createUser-Bday/i).children().children().first().clear();
    cy.findByTestId(/admin-createUser-Bday/i).children().children().first().type(adminUser.userBday);
    cy.findByTestId(/admin-createUser-PreferedPayment/i).children().children().first().clear();
    cy.findByTestId(/admin-createUser-PreferedPayment/i).children().children().first().type(adminUser.userPreferedPayment);
    cy.findByTestId(/admin-createUser-Street/i).children().children().first().clear();
    cy.findByTestId(/admin-createUser-street/i).children().children().first().type(adminUser.userStreet);
    cy.findByTestId(/admin-createUser-City/i).children().children().first().clear();
    cy.findByTestId(/admin-createUser-City/i).children().children().first().type(adminUser.userCity);
    cy.findByTestId(/admin-createVehicle-createSend/i).click();
    expect(cy.findByTestId(/admin-createUser-button/i).parent().next().children().children().children().children().children().next().children().next().children().children().children().children().should('have.length','4'));
    
})

it("can update a User", () => {
    cy.visit("/");
    cy.findByTestId(/login-button-id/i).click();
    cy.findByLabelText(/E-Mail/i).type(login.email);
    cy.findByLabelText(/Password/i).type(login.password);
    cy.findByText("Sign In").click();
    cy.findByTestId(/admin-button-id/i).click();
    cy.findByTestId(/admin-createUser-button/i).parent().next().children().children().children().children().children().next().children().next().children().children().children().children().next().next().next().children().children().first().click();
    cy.findByTestId(/admin-createUser-Email/i).children().children().first().clear();
    cy.findByTestId(/admin-createUser-Email/i).children().children().first().type(adminUser.userEmail);
    cy.findByTestId(/admin-createUser-Password/i).children().children().first().clear();
    cy.findByTestId(/admin-createUser-Password/i).children().children().first().type(adminUser.userPassword);
    cy.findByTestId(/admin-createUser-Firstname/i).children().children().first().clear();
    cy.findByTestId(/admin-createUser-Firstname/i).children().children().first().type(adminUser.userFirstname);
    cy.findByTestId(/admin-createUser-Lastname/i).children().children().first().clear();
    cy.findByTestId(/admin-createUser-Lastname/i).children().children().first().type(adminUser.userLastname);
    cy.findByTestId(/admin-createUser-Bday/i).children().children().first().clear();
    cy.findByTestId(/admin-createUser-Bday/i).children().children().first().type(adminUser.userBday);
    cy.findByTestId(/admin-createUser-PreferedPayment/i).children().children().first().clear();
    cy.findByTestId(/admin-createUser-PreferedPayment/i).children().children().first().type(adminUser.userPreferedPayment);
    cy.findByTestId(/admin-createUser-Street/i).children().children().first().clear();
    cy.findByTestId(/admin-createUser-street/i).children().children().first().type(adminUser.userStreet);
    cy.findByTestId(/admin-createUser-City/i).children().children().first().clear();
    cy.findByTestId(/admin-createUser-City/i).children().children().first().type(adminUser.userCity);
    cy.findByTestId(/admin-createVehicle-createSend/i).click();
    expect(cy.findByTestId(/admin-createUser-button/i).parent().next().children().children().children().children().children().next().children().next().children().children().children().children().should('have.length','4'));
    
})

it("can delete a User", () => {
    cy.visit("/");
    cy.findByTestId(/login-button-id/i).click();
    cy.findByLabelText(/E-Mail/i).type(login.email);
    cy.findByLabelText(/Password/i).type(login.password);
    cy.findByText("Sign In").click();
    cy.findByTestId(/admin-button-id/i).click();
    cy.findByTestId(/admin-createUser-button/i).parent().next().children().children().children().children().children().next().children().next().children().children().children().children().next().next().next().children().next().next().next().next().next().children().children().first().click();
    cy.findByTestId(/admin-deleteVehicle-deleteIrrevocably/i).click();
    expect(cy.findByTestId(/admin-createUser-button/i).parent().next().children().children().children().children().children().next().children().next().children().children().children().children().should('have.length','3'));
    
})

});