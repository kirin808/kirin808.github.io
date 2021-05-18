export default class GameController {
	players = [];
	currentPlayer;

	constructor(playerCount, PlayerClass, BoardClass, deckObj) {
		this.board = new BoardClass(this);
		this.deck = deckObj;

		this.initPlayers(playerCount, PlayerClass);
		this.board.drawInitialBoard(this.players);

		this.initPlayersButtons();
		
		this.startGame();
	}

	/**
	 * 
	 * @param {Integer} c Le nombre de joueurs
	 * @param {Class} Cla La classe nécessaire à instancier les objets joueurs
	 */
	initPlayers = (c, Cla) => {
		for(let i = 0; i < c; i++) {
			this.players.push(new Cla(i));
		};
	}

	initPlayersButtons = () => {
		for(const player of this.players) {
			const
				panel = player.panelElement,
				btnHitMe = panel.querySelector("[aria-label='Jouer']"),
				btnStopMe = panel.querySelector("[aria-label='Arrêter']");

			btnHitMe.addEventListener('click', (e) => {
				this.hitPlayer(player);
			});
		}
	}

	startGame = () => {
		this.currentPlayer = this.players[0];
		this.board.enablePlayer(this.players[0]);
	}

	hitPlayer = (p) => {
		p.receiveCard(this.deck.getACard());
		this.updatePlayer(p);
		this.moveToNext(p);
	}

	updatePlayer = (p) => {
		this.board.updateScore(p);
				
		if(p.isBusted) {
			this.board.drawBusted(p);
		}

		if(p.isStopped) {
			this.board.drawStopped(p);
		}

		this.board.disablePlayer(p);
	}

	moveToNext = (p) => {
		// Si il reste des joueurs actifs, passé au suivant, sinon, terminer la partie
		const nextPlayer = this.getNextPlayer(p);
		
		if(nextPlayer) {
			this.currentPlayer = nextPlayer
			this.board.enablePlayer(nextPlayer)
		} else {
			this.endGame();
		}
	}

	/**
	 * 
	 * @param {Player object} p Joueur à partir duquel on recherche le prochain joueur
	 */
	getNextPlayer = (p) => {
		let
			index = p.id,
			next;

		if(this.currentPlayer === p && this.currentPlayer.isActive()) {

		}
		if(index < this.players.length - 1) {
			next = ++index;
		} else  {
			return p;
		} else {
			next = 0;
		}

		const nextPlayer = this.players[next];
		
		if(nextPlayer.isActive()) {
			return nextPlayer;
		}

		if(this.currentPlayer === nextPlayer && !this.currentPlayer.isActive()) {
			console.log(this.currentPlayer);
			return false;
		}
		
		this.getNextPlayer(next);
	}

	endGame = () => {
		console.log("Partie terminée");
	}
}