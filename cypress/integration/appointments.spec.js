describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });

  it("should book an appointment", () => {
    //reset the db

    // open a new appointment form on the second slot
    cy.get("[alt=Add]").first().click();

    // enter a name
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    //choose an interviewer
    cy.get("[alt='Sylvia Palmer']").first().click();

    //hit the save button
    cy.get("button").contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("Should edit an appointment", () => {
    cy.get("[alt=Edit]").click({ force: true });

    cy.get("[alt='Tori Malcolm']").first().click();

    cy.get("[data-testid=student-name-input]").clear().type("Mara Raine Gray");

    cy.get("button").contains("Save").click();

    cy.contains(".appointment__card--show", "Mara Raine Gray");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("Should cancel an appointment", () => {
    cy.get("[alt=Delete]").click({ force: true });
    cy.get("button").contains("Confirm").click();
    cy.contains("Deleting...").should("exist");
    cy.contains("Deleting...").should("not.exist");
    cy.contains(".appointment__cars--show", "Archie Cohen").should("not.exist");
  });
});
