import { adminBuilder } from '../builder/admin';
import { loginBuilder } from '../builder/LoginUser';
import { adminVehicleBuilder } from '../builder/adminVehicle';

describe("Profile", () => {

const login = loginBuilder({})();
const admin = adminBuilder({})();
const adminvehicle = adminVehicleBuilder({})();

it("can create a vehicle", () => {
    cy.visit("/");
    cy.findByTestId(/login-button-id/i).click();
    cy.findByLabelText(/E-Mail/i).type(login.email);
    cy.findByLabelText(/Password/i).type(login.password);
    cy.findByText("Sign In").click();
    cy.findByTestId(/admin-button-id/i).click();
    cy.findByTestId(/admin-createVehicle-createButton/i).click();
    cy.findByTestId(/admin-createVehicle-licensePlate/i).children().children().first().type(adminvehicle.licensePlate);
    cy.findByTestId(/admin-createVehicle-vehicleType/i).children().children().first().click();
    cy.findByTestId(/footer/i).parent().parent().children().next().next().next().next().next().next().next().children().next().next().children().children().first().click();
    cy.findByTestId(/admin-createVehicle-longitude/i).children().first().type(adminvehicle.longitude);
    cy.findByTestId(/admin-createVehicle-latitude/i).children().first().type(adminvehicle.latitude);
    cy.findByTestId(/admin-createVehicle-createSend/i).click();
    expect(cy.findByTestId(/admin-Vehicle-allVehicles/i).children().children().children().next().children().next().children().children().children().children().should('have.length','3'));
    

})

it("can delete a vehicle", () => {
    cy.visit("/");
    cy.findByTestId(/login-button-id/i).click();
    cy.findByLabelText(/E-Mail/i).type(login.email);
    cy.findByLabelText(/Password/i).type(login.password);
    cy.findByText("Sign In").click();
    cy.findByTestId(/admin-button-id/i).click();
    cy.findByTestId(/admin-Vehicle-allVehicles/i).children().children().children().next().children().next().children().children().children().children().next().next().children().next().next().next().next().children().children().first().click();
    expect(cy.findByTestId(/admin-Vehicle-allVehicles/i).children().children().children().next().children().next().children().children().children().children().should('have.length','2'));
    
})



});