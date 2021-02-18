import { adminBuilder } from '../builder/admin';
import { loginBuilder } from '../builder/LoginUser';

describe("Admin VehicleType", () => {

const login = loginBuilder({})();
const admin = adminBuilder({})();

it("can create a new vehicle Type", () => {
    cy.visit("/");
    cy.findByTestId(/login-button-id/i).click();
    cy.findByLabelText(/E-Mail/i).type(login.email);
    cy.findByLabelText(/Password/i).type(login.password);
    cy.findByText("Sign In").click();
    cy.findByTestId(/admin-button-id/i).click();
    cy.findByTestId(/admin-create-button/i).click();
    cy.findByTestId(/admin-createVehicleType-Startprice/i).children().first().clear();
    cy.findByTestId(/admin-createVehicleType-price/i).children().first().clear();
    cy.findByTestId(/admin-createVehicleType-battery/i).children().first().clear();
    cy.findByTestId(/admin-createVehicleType-name/i).children().type(admin.vehicleTypeName);
    cy.findByTestId(/admin-createVehicleType-Startprice/i).children().first().type(admin.vehicleTypeStartPrice);
    cy.findByTestId(/admin-createVehicleType-price/i).children().first().type(admin.vehicleTypePrice);
    cy.findByTestId(/admin-createVehicleType-battery/i).children().first().type(admin.vehicleTypeBattery);
    cy.findByTestId(/admin-createVehicleType-create/i).click();
    expect(cy.findByTestId(/admin-create-button/i).parent().parent().children().should('have.length','4'));
})

it("can update a vehicle Type", () => {
    cy.visit("/");
    cy.findByTestId(/login-button-id/i).click();
    cy.findByLabelText(/E-Mail/i).type(login.email);
    cy.findByLabelText(/Password/i).type(login.password);
    cy.findByText("Sign In").click();
    cy.findByTestId(/admin-button-id/i).click();
    cy.findByTestId(/admin-create-button/i).parent().next().next().next().children().click();
    cy.findByTestId(/admin-createVehicleType-name/i).children().children().first().clear();
    cy.findByTestId(/admin-createVehicleType-name/i).children().type(admin.newVehicleTypeName);
    cy.findByTestId(/admin-createVehicleType-price/i).children().first().type(admin.newVehicleTypePrice);
    cy.findByTestId(/admin-createVehicleType-battery/i).children().first().type(admin.newVehicleTypeBattery);
    cy.findByTestId(/admin-createVehicleType-create/i).click();
    expect(cy.findByTestId(/admin-create-button/i).parent().next().next().next().children().should('have.text',`${admin.newVehicleTypeName}`));
})



it("can delete a vehicle Type", () => {
    cy.visit("/");
    cy.findByTestId(/login-button-id/i).click();
    cy.findByLabelText(/E-Mail/i).type(login.email);
    cy.findByLabelText(/Password/i).type(login.password);
    cy.findByText("Sign In").click();
    cy.findByTestId(/admin-button-id/i).click();
    cy.findByTestId(/admin-create-button/i).parent().next().next().next().children().children().next().first().click();
    cy.findByTestId(/admin-createVehicleType-deleteIrrevocably/i).click();
    expect(cy.findByTestId(/admin-create-button/i).parent().parent().children().should('have.length','3'));
})



});