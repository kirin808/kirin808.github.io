/**
 * 
 * Code emprunter à Walter Guevara
 * https://www.thatsoftwaredude.com/about
 * 
 * Source: https://www.thatsoftwaredude.com/content/6417/how-to-code-blackjack-using-javascript * 
 * 
 */
export default class DeckOfCards {

	suits = ["Pique", "Coeur", "Carreau", "Trèfle"];
	values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
	deck = [];

	constructor() {
		this.buildDeck();
		this.shuffleDeck(1200);
	}

	buildDeck = () => {
		for(const value of this.values) {
			for(const suit of this.suits) {
				let weight = parseInt(value);

				if (value === "J" || value === "Q" || value === "K")
					weight = 10;
				
				if (value === "A")
					weight = 11;

				this.deck.push({
					value: value,
					suit: suit,
					weight: weight
				});
			}
		}
	}

	/**
	 * Permet de mélanger les objets "carte" du tableau "deck"
	 * 
	 * 
	 * @param {integer} t Nombre de fois que l'on inverse la position de deux cartes
	 * 
	 * 
	 */
	shuffleDeck = (t) => {
		for (let i = 0; i < t; i++) {
			let
				location1 = Math.floor((Math.random() * this.deck.length)),
				location2 = Math.floor((Math.random() * this.deck.length)),
				tmp = this.deck[location1];

			this.deck[location1] = this.deck[location2];
			this.deck[location2] = tmp;
		}
	}

	getACard = () => {
		return this.deck.pop();
	}

	getCards = (nb) => {
		let dealt = [];

		for(let i = 0; i < nb; i++) {
			dealt.push(this.deck.pop());
		}

		return dealt;
	}
}