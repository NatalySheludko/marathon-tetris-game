import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS, tetris } from "./utils.js";

//Функція для створення рядів і колонок
export const generatePlayfield = () => {
	tetris.innerHTML = "";
	let totalRowsColumns = PLAYFIELD_ROWS * PLAYFIELD_COLUMNS;
	//console.log(totalRowsColumns) //374
	for (let i = 0; i < totalRowsColumns; i += 1) {
    const element = document.createElement("div");
    tetris.append(element);
  }
  fillPlayfield();
}

export let playfield = [];

export const fillPlayfield = () => {
  /*робимо матрицю, наповнюємо playfield = [
	[0,0,0,0,0,0,0,0,0] - rows
	[0,0,0,0,0,0,0,0,0]
	...
	]*/
  playfield = new Array(PLAYFIELD_ROWS)
    .fill() //закинути всередину
    .map(() => new Array(PLAYFIELD_COLUMNS).fill(0));
  //console.log(playfield);
}


