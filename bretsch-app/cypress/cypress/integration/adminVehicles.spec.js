import { adminBuilder } from '../builder/admin';
import { loginBuilder } from '../builder/LoginUser';

describe("Profile", () => {

const login = loginBuilder({})();
const admin = adminBuilder({})();

it("can create a new vehicle Type", () => {
    cy.visit("/");
    cy.findByTestId(/login-button-id/i).click();
    cy.findByLabelText(/E-Mail/i).type(login.email);
    cy.findByLabelText(/Password/i).type(login.password);
    cy.findByText("Sign In").click();
    cy.findByTestId(/admin-button-id/i).click();
    cy.findByTestId(/admin-deleteVehicle-deleteButton/i).click();
    cy.findByTestId(/admin-createVehicleType-name/i).children().type(admin.vehicleTypeName);
    cy.findByTestId(/admin-createVehicleType-price/i).children().first().type(admin.vehicleTypePrice);
    cy.findByTestId(/admin-createVehicleType-battery/i).children().first().type(admin.vehicleTypeBattery);
    cy.findByTestId(/admin-createVehicleType-create/i).click();
    expect(cy.findByTestId(/admin-create-button/i).parent().parent().children().should('have.length','4'));
})



});