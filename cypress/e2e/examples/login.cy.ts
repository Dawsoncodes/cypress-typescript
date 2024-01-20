describe("Login", () => {
  it("should log in the user", () => {
    cy.login()

    // Make sure the user is logged in and been redirected to the account page
    cy.url().should("include", "?route=account/account")

    // Write your tests here
  })
})
