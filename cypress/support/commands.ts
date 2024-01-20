/// <reference types="cypress" />
// ***********************************************

// cypress/support/commands.ts
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to type random characters into input elements
       * @example cy.get('input').typeRandom(5)
       */
      typeRandom(
        count?: number,
        options?: Partial<TypeOptions>
      ): Chainable<JQuery<HTMLElement>>

      typeStuff(count: number): string

      getInputById(id: string): Chainable<JQuery<HTMLElement>>

      /**
       * @description Custom command to submit the user address form
       */
      submitForm(args: SubmitFormArgs): Chainable<JQuery<HTMLElement>>

      /**
       * @description Logs in the user
       */
      login(): Chainable<JQuery<HTMLElement>>

      /**
       * @description Clears the input and types
       */
      clearAndType(text: string): Chainable<JQuery<HTMLElement>>
    }
  }
}

Cypress.Commands.add(
  "typeRandom",
  { prevSubject: "element" },
  (subject, count = 5, options?) => {
    return cy.wrap(subject).type(generateRandomCharacters(count), options)
  }
)

Cypress.Commands.add("typeStuff", (count: number) =>
  generateRandomCharacters(count)
)

export const generateRandomCharacters = (count: number) => {
  let text = ""
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

  for (let i = 0; i < count; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}

interface TypeOptions extends Cypress.TypeOptions {
  sensitive: boolean
}

Cypress.Commands.overwrite<"type", "element">(
  "type",
  (originalFn, element, text, options?: Partial<TypeOptions>) => {
    // Do some custom logic

    return originalFn(element, text, options)
  }
)

Cypress.Commands.add("getInputById", (id: string) => {
  return cy.get(`input#${id}`).first()
})

interface SubmitFormArgs {
  name: string
  email: string
  password: string
  company: string
  website: string
  country: string
  city: string
  address: string
  address2: string
  state: string
  zipCode: string
}

const mappingFormIds: Record<keyof Omit<SubmitFormArgs, "country">, string> = {
  name: "name",
  email: "inputEmail4",
  password: "inputPassword4",
  company: "company",
  website: "websitename",
  city: "inputCity",
  address: "inputAddress1",
  address2: "inputAddress2",
  state: "inputState",
  zipCode: "inputZip",
}

// Command to submit the form
Cypress.Commands.add("submitForm", (args) => {
  const entries = Object.entries(args) as [
    keyof SubmitFormArgs | keyof Omit<SubmitFormArgs, "country">,
    string
  ][]

  for (const [key, value] of entries) {
    if (key !== "country") {
      cy.getInputById(mappingFormIds[key]).type(value)
    } else {
      cy.get("select[name=country]").select(value)
    }
  }

  cy.get("button").contains("Submit").click()
})

Cypress.Commands.add("login", () => {
  cy.visit(
    "https://ecommerce-playground.lambdatest.io/index.php?route=account/login"
  )

  cy.getInputById("input-email").type("jon@doe.com")
  cy.getInputById("input-password").type("1111")

  cy.get("input[type=submit]").click()
})

Cypress.Commands.add(
  "clearAndType",
  { prevSubject: "element" },
  (subject, text) => {
    cy.wrap(subject).clear().type(text)
  }
)
