import DeckOfCardPage from "../support/pages/DeckOfCardPage";
import { Faker } from "@faker-js/faker";
import "../support/commands";
import 'cypress-mochawesome-reporter/register';


describe("Deck of Cards API", () => {
  const deckOfCardPage = new DeckOfCardPage();
  let deckId;
  const { faker } = require("@faker-js/faker");

  //Test case 1: shuffle the cards
  it("Should create a new shuffled deck", () => {
    deckOfCardPage.newDeck(true).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("success", true);
      expect(response.body).to.have.property("deck_id");
      expect(response.body).to.have.property("remaining", 52);
      expect(response.body).to.have.property("shuffled", true);
      deckId = response.body.deck_id;
    });
  });

  //Test case 2: shuffle the cards with a specific value "deck_count"
  it("Should create a new shuffled deck with a specific value", () => {
    const deckCount = 3;
    deckOfCardPage.newDeck(true, deckCount).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("success", true);
      expect(response.body).to.have.property("deck_id");
      expect(response.body).to.have.property("remaining", 52 * deckCount);
      expect(response.body).to.have.property("shuffled", true);
    });
  });

  //Test case 3: creacte a brancd new deck
  it("Should create a brand New Deck", () => {
    //It could be better and add ramdom cards :|
    const cards = ["AS", "2S", "KS", "AD"];
    deckOfCardPage.newDeck(true, null, cards).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("success", true);
      expect(response.body).to.have.property("deck_id");
      expect(response.body).to.have.property("remaining", cards.length);
      expect(response.body).to.have.property("shuffled", true);
    });
  });

  //Test case 4: draw a card with count
  it("Should draw a selected amount of cards", () => {
    const randomCount = faker.number.int({ min: 1, max: 10 });

    deckOfCardPage.drawCards(deckId, randomCount).then((response) => {
      cy.verifyDrawResponse(response, randomCount, 52 - randomCount);
    });
  });

  //Test case 5: draw a card without count
  it("Should draw a card without specifying the amount", () => {
    deckOfCardPage.newDeck(true).then((deckResponse) => {
      const deckId = deckResponse.body.deck_id;

      deckOfCardPage.drawCards(deckId).then((response) => {
        cy.verifyDrawResponse(response, 1, 51);
      });
    });
  });

  //Test case 6: Reshuffle cards
  it("Should reshuffle the deck", () => {
    deckOfCardPage.reshuffleCards(deckId).then((response) => {
      cy.verifyPartialResponse(response, deckId);
      expect(response.body.deck_id).to.eq(deckId);
    });
  });

  //Test case 7: Reshuffle cards with remaining
  it("Should reshuffle the deck with remaining", () => {
    deckOfCardPage.drawCards(deckId, 5).then((drawResponse) => {
      const remainingAfterDraw = drawResponse.body.remaining;
      const randomRemaining = faker.datatype.boolean();

      deckOfCardPage
        .reshuffleCards(deckId, randomRemaining)
        .then((response) => {
          cy.verifyPartialResponse(response, deckId);
          if (randomRemaining === true) {
            expect(response.body.remaining).to.eq(remainingAfterDraw);
            cy.log(
              `Verified: remaining=true keeps the same number of cards: ${response.body.remaining}`
            );
          } else {
            expect(response.body.remaining).to.eq(52);
            cy.log(
              `Verified: remaining=false returns all cards to deck: ${response.body.remaining}`
            );
          }
        });
    });
  });
});
