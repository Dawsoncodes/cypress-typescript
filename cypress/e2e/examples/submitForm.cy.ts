describe("Cypress typescript examples", () => {
  beforeEach(() => {
    cy.visit("https://www.lambdatest.com/selenium-playground/input-form-demo")
  })

  it("Should submit the form", () => {
    cy.submitForm({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      company: "Example Company",
      website: "https://example.com",
      country: "United States",
      city: "New York",
      address: "123 Main St",
      address2: "Apt 4B",
      state: "NY",
      zipCode: "10001",
    })
  })
})
