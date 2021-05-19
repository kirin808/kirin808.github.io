const setMultiAttributes = (e, attrs) => {
	for(const a in attrs) {
		e.setAttribute(a, attrs[a]);
	}
}

const setMultiClasses = (e, classes) => {
	classes.forEach(cl => {
		e.classList.add(cl);
	})
}

export const buildTextElement = (type, text, ...classes) => {
	let e;

	e = document.createElement(type);

	if(classes) {
		setMultiClasses(e, classes);
	}

	e.textContent = text;

	return e;
}

export const buildElement = (type, ...classes) => {
	const e = document.createElement(type);

	if(classes) {
		setMultiClasses(e, classes);
	}

	return e;
}

export const buildButton = (type, label, attrs = null, classes = null) => {
	const b = document.createElement("button");

	b.setAttribute("type", type);

	if(attrs) {
		setMultiAttributes(b, attrs)
	}

	if(classes) {
		setMultiClasses(b, classes);
	}

	b.textContent = label;

	return b;
}

export const cleanElement = (e) => {
	while(e.lastElementChild) {
		e.lastElementChild.remove();
	}
}