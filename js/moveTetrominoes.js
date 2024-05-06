import {
  draw,
	placeTetromino,
	moveDown,
} from "./main.js";
import { tetromino } from "./generateTetromino.js";
import { isValid } from "./isValidCollisions.js";

export let timeoutId;
export let requestId;
export let isPaused = false;

//падіння фігури
export const startLoop = () => {
  timeoutId = setTimeout(
    () => (requestId = requestAnimationFrame(moveDown)),
    700
  );
};

export const stopLoop = () => {
  cancelAnimationFrame(requestId);
  timeoutId = clearTimeout(timeoutId);
};

export const togglePauseGame = () => {
  isPaused = !isPaused;
  if (isPaused) {
    stopLoop();
  } else {
    startLoop();
  }
};

export const dropTetrominoDown = () => {
  while (!isValid()) {
    tetromino.row += 1;
  }
  tetromino.row -= 1;
};

export const rotateMatrix = (matrixTetromino) => {
  //ловимо матрицю фігур
  const number = matrixTetromino.length;
  const rotateMatrix = [];
  for (let i = 0; i < number; i += 1) {
    rotateMatrix[i] = [];
    for (let j = 0; j < number; j += 1) {
      rotateMatrix[i][j] = matrixTetromino[number - j - 1][i]; //кожен раз присвоюємо нове значення
    }
  }
  return rotateMatrix;
};

export const rotateTetromino = () => {
  const oldMatrix = tetromino.matrix;
  const rotatedMatrix = rotateMatrix(tetromino.matrix);
  tetromino.matrix = rotatedMatrix;
  if (isValid()) {
    tetromino.matrix = oldMatrix;
  }
};

export const moveTetrominoDown = () => {
  tetromino.row += 1;
  if (isValid()) {
    tetromino.row -= 1; //видаляємо -1 біля краю якщо не проходить перевірка
    placeTetromino();
  }
};

export const moveTetrominoLeft = () => {
  tetromino.column -= 1;
  if (isValid()) {
    tetromino.column += 1;
  }
};

export const moveTetrominoRight = () => {
  tetromino.column += 1;
  if (isValid()) {
    tetromino.column -= 1;
  }
};

//відслідковує клавіатуру
const keyboard = document.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (event.key === "p") {
    togglePauseGame();
  }
  if (isPaused) {
    return;
  }
  switch (event.key) {
    case " ":
      dropTetrominoDown();
      break;
    case "ArrowUp":
      rotateTetromino();
      break;
    case "ArrowDown":
      moveTetrominoDown();
      break;
    case "ArrowLeft":
      moveTetrominoLeft();
      break;
    case "ArrowRight":
      moveTetrominoRight();
      break;
  }
  draw();
});
