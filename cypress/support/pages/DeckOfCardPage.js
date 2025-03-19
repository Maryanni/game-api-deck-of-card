import PrincipalAPIPage from "./PrincipalAPIPage";

class DeckOfCardPage extends PrincipalAPIPage {
    constructor() {
        super('https://www.deckofcardsapi.com/api');
    }

    newDeck(shuffle = false, deckCount = null, cards = null) {
        const endpoint = shuffle ? '/deck/new/shuffle/' : '/deck/new/';
        const params = {};
        if (deckCount !== null) {
            params.deck_count = deckCount;
        }

        if (cards !== null) {
            params.cards = Array.isArray(cards) ? cards.join(',') : cards;
        }
        return this.createRequest('GET', endpoint, params);
    }

    drawCards(deckId, count = null) {
        const params = {};

        if (count !== null) {
            params.count = count;
        }
        return this.createRequest('GET', `/deck/${deckId}/draw/`, params);
    }

    reshuffleCards(deckId, remaining = null){
        const params = {};
        if (remaining !== null) {
            params.remaining = remaining;
        }
        return this.createRequest('GET', `/deck/${deckId}/shuffle/`, params);
    }
}

export default DeckOfCardPage;
