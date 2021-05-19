import { buildTextElement, buildElement, buildButton, cleanElement } from "./DOMBuilder.js";

export default class Board {
	boardNode = document.querySelector('.board');

	/**
	 * 
	 * @param {GameController object} c Objet contrôleur qui gouverne cet objet.
	 * 
	 */
	constructor(c) {
		this.gc = c;
	}

	/**
	 * 
	 * @param {Array} players Tableau d'objets Player permettant d'initialiser / dessiner la table initial
	 */
	drawInitialBoard = (players) => {
		cleanElement(this.boardNode);

		this.drawAllPlayers(players);

	}

	drawAllPlayers = (p) => {
		const playersGrid = buildElement("div", "grid-players");

		for(const player of p) {
			playersGrid.append(this.buildPlayer(player));
		}

		this.boardNode.append(playersGrid);
	}

	buildPlayer = (p) => {
		const
			panel = buildElement("div", "player-panel"),
			scoreBlock = this.buildScorePanel(p.score),
			actionsBlock = this.buildActionsPanel(),
			handBlock = this.buildHandPanel();
		
		// Référencer la panneau du joueur à son objet pour facilement lui accéder.
		p.setPanelElement(panel);

		panel.append(scoreBlock, handBlock, actionsBlock);

		return panel;
	}

	buildScorePanel = (s) => {
		const
			scoreBlock = buildElement("div", "score-block"),
			scoreLabel = buildTextElement("span", "Pointage : "),
			score = buildTextElement("span", s, "score-display");

		scoreBlock.append(scoreLabel, score);

		return scoreBlock
	}

	buildHandPanel = () => {
		const
			handBlock = buildElement("ul", "player-hand");

		return handBlock;
	}

	buildActionsPanel = () => {
		const
			actionsBlock = buildElement("div", "actions-block"),
			
			btnHitMe = buildButton(
				"button",
				"Jouer, pardis !",
				{
					disabled : true,
					"aria-label" : "Jouer"
				}
			),
			
			btnStopMe = buildButton(
				"button",
				"Arrêtez-moé !",
				{
					disabled : true,
					"aria-label" : "Arrêter"
				}
			);

		actionsBlock.append(btnHitMe, btnStopMe);

		return actionsBlock;
	}

	enablePlayer = (p) => {
		const panel = p.panelElement;

		panel.setAttribute("aria-current", "player");
		this.enableActions(panel);
	}

	disablePlayer = (p) => {
		const panel = p.panelElement;

		panel.removeAttribute("aria-current");
		this.disableActions(panel);
	}

	enableActions = (p) => {
		for(const b of p.querySelectorAll('button')) {
			b.removeAttribute("disabled");
		}
	}

	disableActions = (p) => {
		for(const b of p.querySelectorAll('button')) {
			b.setAttribute("disabled", "true");
		}
	}

	updateScoreUI = (p) => {
		const
			panel = p.panelElement,
			score = panel.querySelector('.score-display');
		
		score.textContent = p.score;
	}

	updateHandUI = (p) => {
		const
			panel = p.panelElement,
			hand = panel.querySelector('.player-hand'),
			frag = document.createDocumentFragment();
		
		cleanElement(hand);

		for(const card of p.hand) {
			frag.append(
				buildTextElement("li", `${card.value} de ${card.suit}`)
			)
		}

		hand.append(frag);
	}

	drawBusted = (p) => {
		const panel = p.panelElement;
		
		panel.classList.add("busted");
		panel.append(
			buildTextElement("span", "Explosé !", "player-status")
		);
	}

	drawStopped = (p) => {
		p.panelElement.classList.add("stopped");
	}

	drawWinner = (p) => {
		const panel = p.panelElement;
		
		panel.classList.remove("stopped");
		panel.classList.add("winner");
	}
}