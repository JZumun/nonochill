import Tile from "./Tile"

const sameArrays = (a,b) => a.every((x,i)=>x==b[i]);
const count = n => Array.from(new Array(n),(val,index)=>index+1);

export default class Board {
	constructor({width = 5, height = width, density = 2/3}={}) {
		this.width = width;
		this.height = height;
		this.populateBoard(density);
		this.populateRules();
	}

	populateBoard(density) {
		this.tiles = count(this.height).map(i => {
			return count(this.width).map(j => { 
				return new Tile(Math.random() < density ? 1 : 0)
			})
		})
	}
	populateRules() {
		this.rules = {
			columns: count(this.height).map(i => this.getRuleForColumn(i,false) ),
			rows: count(this.width).map(i => this.getRuleForRow(i,false) )
		}
	}

	getColumn(col) {
		return this.tiles.map(row=>row[col]);
	}
	getRuleForColumn(col,cached=true) {
		return (cached && this.rules.columns[col]) || this.getRuleForArray( this.getColumn(col).map(tile=>tile.isFilled()) );
	}
	getMarksForColumn(col) {
		return this.getRuleForArray( this.getColumn(col).map(tile=>tile.isMarked()) );
	}
	checkColumn(col) {
		return sameArrays( this.getRuleForColumn(col) , this.getMarksForColumn(col) );
	}

	getRow(row) {
		return this.tiles[row];
	}
	getRuleForRow(row,cached=true) {
		return (cached && this.rules.rows[row]) || this.getRuleForArray( this.getRow(row).map(tile=>tile.isFilled()) );
	}
	getMarksForRow(row) {
		return this.getRuleForArray( this.getRow(row).map(tile=>tile.isMarked()) );
	}
	checkRow(row) {
		return sameArrays( this.getRuleForRow(row) , this.getMarksForRow(row) );
	}

	checkWin() {
		return this.rules.columns.every((rule,i)=>this.checkColumn(i)) && this.rules.rows.every((rule,i)=>this.checkRow(i));
	}

	getRuleForArray(arr) {
		return arr.reduce((rule,curr)=>{
			const last = rule.length-1;
			if (curr) {
				rule[last]++;
			} else if (rule[last] > 0) {
				rule.push(0);
			}
			return rule;
		},[0]).filter(x=>x);
	}
}