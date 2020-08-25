import Card from './models/Card';

class Cards {
    cards: Card[]; 
    NUM_IMAGES: number;

    constructor() {
        this.cards = [];
        this.NUM_IMAGES = 8;
    }
    
    cardGeneration() {
        this.cards = [];
        let id: number = 1;

        for (let i = 1; i <= this.NUM_IMAGES; i++) {
            const card1: Card = {
                id: id,
                image: i,
                imageUp: false,
                matched: false
            };
            id++;
            const card2: Card = {
                id: id,
                image: i,
                imageUp: false,
                matched: false,
            };
            this.cards.push(card1, card2);
            id++;
        }

        // shuffle all cards
        this.cards.sort(() => Math.random() -0.5)        
    }

    getCard(id: number) {
        for (let i = 0; i < 2 * this.NUM_IMAGES; i++) {
            if (this.cards[i].id === id) {
                return this.cards[i];
            }
        };
    }

    flipCard(id: number, imageUp: boolean) {
        this.getCard(id).imageUp = imageUp;
    }

    cardMatched(id: number, matched: boolean) {
        this.getCard(id).matched = matched;
    }

    cardsHaveSameImage(id1: number, id2: number) {
        if (this.getCard(id1).image === this.getCard(id2).image) {
            return true;
        } else {
            return false;
        }
    }
}

export default Cards;