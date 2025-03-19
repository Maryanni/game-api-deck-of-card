//Card structure
Cypress.Commands.add("verifyCardStructure", (card) => {
  expect(card).to.have.property("code").and.to.be.a("string");
  expect(card)
    .to.have.property("image")
    .and.to.include("https://deckofcardsapi.com/static/img/");
  expect(card).to.have.property("images").and.to.be.an("object");
  expect(card.images).to.have.property("svg").and.to.include(".svg");
  expect(card.images).to.have.property("png").and.to.include(".png");
  expect(card).to.have.property("value").and.to.be.a("string");
  expect(card).to.have.property("suit").and.to.be.a("string");

  const validSuits = ["HEARTS", "DIAMONDS", "CLUBS", "SPADES"];
  expect(validSuits).to.include(card.suit);
});

//Verify de response reshuffle
Cypress.Commands.add("verifyPartialResponse", (response, deckId = null) => {
  expect(response.status).to.eq(200);
  expect(response.body).to.have.property("success", true);
  expect(response.body).to.have.property("shuffled", true);

  if (deckId) {
    expect(response.body.deck_id).to.eq(deckId);
  }
});

//Verify draw response
Cypress.Commands.add(
  "verifyDrawResponse",
  (response, expectedCardCount, expectedRemaining, deckId = true) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property("success", true);

    if (deckId) {
      expect(response.body).to.have.property("deck_id").and.to.be.a("string");
    }
    expect(response.body)
      .to.have.property("cards")
      .and.to.have.length(expectedCardCount);
    expect(response.body.remaining).to.eq(expectedRemaining);

    response.body.cards.forEach((card) => {
      cy.verifyCardStructure(card);
    });
  }
);
