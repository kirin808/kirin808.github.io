export const appendBefore = (e, ref) => {
	return ref.parentNode.insertBefore(e, ref);
}

export const appendAfter = (e, ref) => {
	return ref.parentNode.insertBefore(e, ref.nextElementSibling);
}