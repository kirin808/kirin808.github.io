import { buildTextElement } from "./DOMBuilder.js";

export default class FieldValidator {
	
	fieldBlockClass = ".field-block";
	errorMsgElement;
	hasError = false;

	constructor(f) {
		this.field = f;
		this.fieldBlock = this.field.closest(this.fieldBlockClass);
		
		this.init();
	}

	init = () => {
		this.field.addEventListener('invalid', e => {
			if(this.hasError)
				this.cleanErrors();
			this.throwError(e.target);
		});
	}

	throwError = i => {
		this.hasError = true;

		let
			// Créer le message d'erreur
			errMsg = this.getError(i), 
			errElement = buildTextElement("small", errMsg);

		this.errorMsgElement = errElement;

		// Injecter le message d'erreur
		this.fieldBlock.append(errElement);
		
		// Basculer la classe d'erreur
		this.fieldBlock.classList.toggle("error");
	}

	getError = (i) => {
		if(i.validity.valueMissing) 
			return `Un nombre de joueur est obligatoire`;

		if(i.validity.typeMismatch) 
			return `Le champ n'est pas du bon format`;
		
		if(i.validity.patternMismatch) 
			return `Le champ n'est pas du bon format`;

		if(i.validity.rangeOverflow) 
			return `Le nombre de joueurs ne doit pas dépasser ${i.getAttribute("max")}`;

		if(i.validity.rangeUnderflow) 
			return `Le nombre de joueurs ne doit pas être inférieur à ${i.getAttribute("min")}`;
	}

	cleanErrors = () => {
		this.fieldBlock.classList.toggle("error");
		console.log(this.errorMsgElement);
		if(this.errorMsgElement)
			this.errorMsgElement.remove();
	}
}