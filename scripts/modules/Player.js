export default class Player {

	id;
	score = 0;
	hand = [];
	isStopped = false;
	isBusted = false;
	panelElement;

	constructor(index) {
		this.id = index;
	}

	receiveCard = (card) => {
		this.score += card.weight;
		this.hand.push(card);

		if(this.score > 21) {
			this.isBusted = true;
		}

		return this.score;
	}

	setPanelElement = (e) => {
		this.panelElement = e;
	}

	isActive = () => {
		return !this.isBusted && !this.isStopped;
	}
}