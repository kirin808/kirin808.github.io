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

			btnStopMe.addEventListener('click', (e) => {
				this.stopPlayer(player);
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

	stopPlayer = (p) => {
		p.isStopped = true;
		
		this.board.drawStopped(p);
		this.moveToNext(p);
	}

	updatePlayer = (p) => {
		this.board.updateScoreUI(p);
		this.board.updateHandUI(p);
				
		if(p.isBusted) {
			this.board.drawBusted(p);
		}
	}

	moveToNext = (p) => {
		// Désactivé le joueur courant
		this.board.disablePlayer(p);
		
		// Si il reste des joueurs actifs, passé au suivant, sinon, terminer la partie		
		if(this.hasActivePlayers()) {
			this.currentPlayer = this.getNextPlayer(p);
			
			this.board.enablePlayer(this.currentPlayer);
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
			next = (index < this.players.length - 1) ? ++index : 0;
		
		const nextPlayer = this.players[next];
		
		if(nextPlayer.isActive()) {
			return nextPlayer;
		}
		
		// S'il ne reste qu'un joueur et qu'il est actif, le retourner
		if(this.getActivePlayers().length === 1 && this.currentPlayer.isActive()) {
			return p;
		}

		return this.getNextPlayer(nextPlayer);
	}

	hasActivePlayers = () => {
		return this.players.filter(p => !p.isBusted && !p.isStopped).length > 0;
	}

	getActivePlayers = () => {
		return this.players.filter(p => !p.isBusted && !p.isStopped);
	}

	getStoppedPlayers = () => {
		return this.players.filter(p => p.isStopped);
	}

	getWinners = () => {
		// Créer un tableau du / des meilleur.s joueur.s
		return this.getStoppedPlayers().reduce((a, p, i) => {
			if(i === 0) {
				a.push(p);
				return a;
			}

			if(p.score > a[0].score) {
				a[0] = p;
			} else if(p.score === a[0].score) {
				a.push(p);
			}

			return a;
		}, [])
	}
	endGame = () => {
		const winners = this.getWinners();

		for(const winner of winners) {
			this.board.drawWinner(winner);
		}
	}
}