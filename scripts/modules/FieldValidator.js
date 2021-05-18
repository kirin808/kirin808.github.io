import { buildTextElement } from "./DOMBuilder.js";

export default class FieldValidator {
	
	fieldBlockClass = ".field-block";
	errorMsgElement;

	constructor(f, cb = null) {
		this.field = f;
		this.fieldBlock = this.field.closest(this.fieldBlockClass);
		
		this.init(cb = null);
	}

	init = () => {
		this.field.addEventListener('invalid', e => {
			this.throwError(e.target);
		});
	}

	throwError = i => {
		let
			errMsg = this.getError(i), // Créer le message d'erreur
			errNode = buildTextNode("small", errMsg);

		this.errorMsgNode = errNode;
		
		// Injecter le message d'erreur
		this.fieldBlock.append(errNode);
		
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
			return `Le nombre de joueur ne doit pas dépasser ${i.getAttribute("max")}`;

		if(i.validity.rangeUnderflow) 
			return `Le nombre de joueur ne doit pas être inférieur à ${i.getAttribute("min")}`;
	}

	cleanErrors = () => {
		this.fieldBlock.classList.toggle("error");
		
		if(this.errorMsgNode)
			this.errorMsgNode.remove();
	}
}