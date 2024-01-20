describe("template spec", () => {
  beforeEach(() => {
    cy.visit("https://www.lambdatest.com/selenium-playground/simple-form-demo")
  })

  it("should work", () => {
    cy.get("#user-message").first().typeRandom(17)
  })

  it("Should type a random string", () => {
    cy.get("input#user-message").typeRandom(10)
  })
})
