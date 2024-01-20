describe("Clear and type", () => {
  before(() => {
    cy.visit(
      "https://ecommerce-playground.lambdatest.io/index.php?route=account/login"
    )
  })

  it("should clear the input and then type", () => {
    cy.getInputById("input-email").type("jon@doe.com")
    cy.getInputById("input-password").type("112233")

    cy.getInputById("input-password").clearAndType("1111")

    cy.get("input[type=submit]").click()

    cy.url().should("include", "?route=account/account")
  })
})
