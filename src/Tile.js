export default class Tile {
	constructor(value=0) {
		this.__value = value;
		this.__marking = 0;
		this.__certainty = 1;
	}

	toggleMarking(reverse=false) {
		/*
			0 EMPTY
			1 FILLED
			2 CROSSED
		*/
		this.__marking += (reverse ? -1 : 1) % 4;
	}

	isFilled() {
		return this.__value > 0;
	}

	isMarked() {
		return this.__marking == 1;
	}

	isCertain() {
		return this.__certainty == 1;
	}
}