import { adminBuilder } from '../builder/admin';
import { loginBuilder } from '../builder/LoginUser';
import { adminBookingsBuilder } from '../builder/AdminBooking';

describe("Admin User", () => {

const login = loginBuilder({})();
const adminbooking = adminBookingsBuilder({})();

it("can create a Booking", () => {
    cy.visit("/");
    cy.findByTestId(/login-button-id/i).click();
    cy.findByLabelText(/E-Mail/i).type(login.email);
    cy.findByLabelText(/Password/i).type(login.password);
    cy.findByText("Sign In").click();
    cy.findByTestId(/admin-button-id/i).click();
    cy.findByTestId(/admin-createBooking-createButton/i).click();
    cy.findByTestId(/admin-createBooking-PaymentStatus/i).children().children().first().type(adminbooking.bookingPaymentStatus);
    cy.findByTestId(/admin-createBooking-Vehicle/i).children().children().first().click();
    cy.findByTestId(/footer/i).parent().next().next().next().next().next().next().next().children().next().next().children().children().next().next().click();
    cy.findByTestId(/admin-createVehicle-User/i).children().children().first().click();
    cy.findByTestId(/footer/i).parent().next().next().next().next().next().next().next().children().next().next().children().children().next().next().click();
    cy.findByTestId(/admin-createVehicle-createSend/i).click();
    expect(cy.findByTestId(/admin-createBooking-createButton/i).parent().next().children().children().children().children().children().next().children().next().children().children().children().children().should('have.length','4'));
    
})

it("can update a Booking", () => {
    cy.visit("/");
    cy.findByTestId(/login-button-id/i).click();
    cy.findByLabelText(/E-Mail/i).type(login.email);
    cy.findByLabelText(/Password/i).type(login.password);
    cy.findByText("Sign In").click();
    cy.findByTestId(/admin-button-id/i).click();
    cy.findByTestId(/admin-createBooking-createButton/i).parent().next().children().children().children().children().children().next().children().next().children().children().children().children().next().next().next().children().children().first().click();
    cy.findByTestId(/admin-updateBooking-PaymentStatus/i).children().children().first().clear();
    cy.findByTestId(/admin-updateBooking-PaymentStatus/i).children().children().first().type(adminbooking.newbookingPaymentStatus);
    cy.findByTestId(/admin-updateBooking-End/i).children().children().first().clear();
    cy.findByTestId(/admin-updateBooking-End/i).children().children().first().type(adminbooking.newbookingStart);
    cy.findByTestId(/admin-updateBooking-TimePicker/i).children().children().first().clear();
    cy.findByTestId(/admin-updateBooking-TimePicker/i).children().children().first().type(adminbooking.newbookingTimePicker);
    cy.findByTestId(/admin-updateBooking-Price/i).children().children().first().clear();
    cy.findByTestId(/admin-updateBooking-Price/i).children().children().first().type(adminbooking.newbookingPrice);
    cy.findByTestId(/admin-createVehicle-createSend/i).click();
     
})

/*
it("can delete a Booking", () => {
    cy.visit("/");
    cy.findByTestId(/login-button-id/i).click();
    cy.findByLabelText(/E-Mail/i).type(login.email);
    cy.findByLabelText(/Password/i).type(login.password);
    cy.findByText("Sign In").click();
    cy.findByTestId(/admin-button-id/i).click();
    //cy.get('[data-testid="12345"]').last().click();
    cy.findByTestId(/admin-createBooking-createButton/i).parent().next().children().children().children().children().children().next().children().next().children().children().children().children().next().next().next().children().next().next().next().next().next().next().next().children().children().first().click();
    //cy.findByText("Delete").last().click();
    //cy.findAllByText("Delete").last().click();
    expect(cy.findByTestId(/admin-createBooking-createButton/i).parent().next().children().children().children().children().children().next().children().next().children().children().children().children().should('have.length','3'));
    
})
*/
});