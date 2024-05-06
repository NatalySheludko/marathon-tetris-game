import {
  NEXT_PLAYFIELD_ROWS,
  NEXT_PLAYFIELD_COLUMNS,
} from "./utils.js";

export const generatePlayfieldNext = () => {
  document.querySelector(".next-tetromino").innerHTML = "";
  for (let i = 0; i < NEXT_PLAYFIELD_ROWS * NEXT_PLAYFIELD_COLUMNS; i += 1) {
    const element = document.createElement("div");
    document.querySelector(".next-tetromino").append(element);
	}
	fillPlayfieldNext();
};

export let playfieldNext = [];

export const fillPlayfieldNext = () => {
  playfieldNext = new Array(NEXT_PLAYFIELD_ROWS)
    .fill() 
    .map(() => new Array(NEXT_PLAYFIELD_COLUMNS).fill(0));
};
