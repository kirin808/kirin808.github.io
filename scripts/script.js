import DeckOfCards from "./modules/DeckOfCards.js";
import Player from "./modules/Player.js";
import Board from "./modules/Board.js";
import GameController from "./modules/GameController.js";
import FieldValidator from "./modules/FieldValidator.js";


const
	deck = new DeckOfCards(),

	playerCountInput  = document.querySelector('input'),
	button = document.querySelector('button'),
	fv = new FieldValidator(playerCountInput);


button.addEventListener('click', (e) => {
	if(playerCountInput.checkValidity()) {
		const gc = new GameController(playerCountInput.value, Player, Board, deck);
	}
});
