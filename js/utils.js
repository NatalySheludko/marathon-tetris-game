export const PLAYFIELD_COLUMNS = 12;
export const PLAYFIELD_ROWS = 20;
export const NEXT_PLAYFIELD_COLUMNS = 4;
export const NEXT_PLAYFIELD_ROWS = 6;

export const TETROMINOES_NAMES = [
  "O",
  "L",
  "I",
  "J",
  "X",
  "T",
  "S",
  "Z",
  "D",
  "R",
  "B",
];

export const TETROMINOES_SHAPES = {
  O: [
    [1, 1],
    [1, 1],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  I: [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  X: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
  T: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  D: [[1]],
  R: [
    [1, 1],
    [0, 1],
  ],
  B: [
    [1, 1],
    [0, 0],
  ],
};

export const showFilledRows = document.getElementById("output");
export const btnRestart = document.querySelector(".restart");
export const showScore = document.querySelector("#score");
export const tetris = document.querySelector(".tetris");
export const imgBam = document.querySelector(".funny-message-bomb");

//*BUTTONS
export const btnReverse = document.querySelector(".btn-reverse");
export const btnLeft = document.querySelector(".btn-left");
export const btnRight = document.querySelector(".btn-right");
export const btnBottom = document.querySelector(".btn-bottom");
export const btnDropBottom = document.querySelector(".btn-drop-bottom");
export const btnPause = document.querySelector(".btn-pause");
export const btnNewGame = document.querySelector(".btn-new-game");
