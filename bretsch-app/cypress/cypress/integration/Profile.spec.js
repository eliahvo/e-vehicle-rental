import { loginBuilder } from '../builder/LoginUser';
import { profileBuilder } from '../builder/profile';

describe("Profile", () => {

const login = loginBuilder({})();
const profile = profileBuilder({})();


it("can change profile values for Personal Settings", () => {
    cy.visit("/");
    cy.findByTestId(/login-button-id/i).click();
    cy.findByLabelText(/E-Mail/i).type(login.email);
    cy.findByLabelText(/Password/i).type(login.password);
    cy.findByText("Sign In").click();
    cy.findByTestId(/Profile-button-id/i).click();
    cy.findByTestId(/profile-edit-personalSettings/i).click();
    cy.findByTestId(/profile-edit-birthDate/i).click();
    cy.findByTestId(/profile-edit-birthDate/i).children().next().children().type('{backspace}');
    cy.findByTestId(/profile-edit-birthDate/i).children().next().children().type(profile.birthdate);
    cy.findByTestId(/profile-edit-adress/i).click();
    cy.findByTestId(/profile-edit-adress/i).children().next().children().clear();
    cy.findByTestId(/profile-edit-adress/i).type(profile.adress);
    cy.findByTestId(/profile-edit-city/i).click();
    cy.findByTestId(/profile-edit-city/i).children().next().children().clear();
    cy.findByTestId(/profile-edit-city/i).type(profile.city);
    cy.findByTestId(/profile-edit-personalSettings/i).click();
    cy.findByTestId(/profile-edit-personalSettings/i).click();
    
})

it("can change profile values for names", () => {
    cy.visit("/");
    cy.findByTestId(/login-button-id/i).click();
    cy.findByLabelText(/E-Mail/i).type(login.email);
    cy.findByLabelText(/Password/i).type(login.password);
    cy.findByText("Sign In").click();
    cy.findByTestId(/Profile-button-id/i).click();
    cy.findByTestId(/profile-edit-name/i).click();
    cy.findByTestId(/profile-edit-firstname1/i).click();
    cy.findByTestId(/profile-edit-firstname1/i).children().next().children().clear();
    cy.findByTestId(/profile-edit-firstname1/i).type(profile.firstname);
    cy.findByTestId(/profile-edit-lastname2/i).click();
    cy.findByTestId(/profile-edit-lastname2/i).children().next().children().clear();
    cy.findByTestId(/profile-edit-lastname2/i).type(profile.lastname);
    cy.findByTestId(/profile-edit-name/i).click();
    cy.findByTestId(/profile-edit-name/i).click();
    expect(cy.findByTestId(/profile-edit-profilename/i).children().should('have.text',`${profile.firstname}`));
    expect(cy.findByTestId(/profile-edit-profilename/i).children().children().next().children().should('have.text',`${profile.lastname}`));
    
})

it("can change profile values for Main Settings", () => {
    cy.visit("/");
    cy.findByTestId(/login-button-id/i).click();
    cy.findByLabelText(/E-Mail/i).type(login.email);
    cy.findByLabelText(/Password/i).type(login.password);
    cy.findByText("Sign In").click();
    cy.findByTestId(/Profile-button-id/i).click();
    cy.findByTestId(/profile-edit-mainSettings1/i).click();
    cy.findByTestId(/profile-edit-email1/i).click();
    cy.findByTestId(/profile-edit-email1/i).children().next().children().clear();
    cy.findByTestId(/profile-edit-email1/i).type(profile.email);
    cy.findByTestId(/profile-edit-password1/i).click();
    cy.findByTestId(/profile-edit-password1/i).children().next().children().clear();
    cy.findByTestId(/profile-edit-password1/i).type(profile.newpassword);
    cy.findByTestId(/profile-edit-password2/i).click();
    cy.findByTestId(/profile-edit-password2/i).children().next().children().clear();
    cy.findByTestId(/profile-edit-password2/i).type(profile.newpassword);
    cy.findByTestId(/profile-edit-password3/i).click();
    cy.findByTestId(/profile-edit-password3/i).children().next().children().clear();
    cy.findByTestId(/profile-edit-password3/i).type(profile.password);
    cy.findByTestId(/profile-edit-mainSettings1/i).click();
    cy.findByTestId(/profile-edit-mainSettings1/i).click();
    
})



});