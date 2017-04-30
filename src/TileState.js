const POINT = Symbol("point");
const SPACE = Symbol("space");
function state(type = POINT) {
	return Object.freeze({type})
}

export Object.freeze({
	EMPTY: state(SPACE)
	FILLED: state(POINT),
	CROSSED: state(SPACE),
	MARKED: state(POINT)
});