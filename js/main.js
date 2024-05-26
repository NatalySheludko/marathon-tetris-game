/*
- Saas
- Level
- Speed
- btn (пауза, переворот, ліво, право, низ, пробіл-низ)
- restart + your goals
- best goals
- user form
- oops - знайти щось цікавіше
- інструкція
*/
import { countScore } from "./countScore.js";
import { findFilledRows, removeFillRows } from "./filledRows.js";
import { generatePlayfield, playfield } from "./generatePlayfield.js";
import { generatePlayfieldNext } from "./generatePlayfieldNext.js";
import {
  generateTetromino,
  tetromino,
  tetrominoNext,
} from "./generateTetromino.js";
import { stopLoop, startLoop, moveTetrominoDown } from "./moveTetrominoes.js";
import {
  PLAYFIELD_COLUMNS,
  PLAYFIELD_ROWS,
  NEXT_PLAYFIELD_COLUMNS,
  btnRestart,
	NEXT_PLAYFIELD_ROWS,
} from "./utils.js";

let cells = null;
let cellsNext = null;
let isGameOver = false;

init();
//stopLoop(); - для кнопки старт

function init() {
  document.querySelector(".game-over").classList.add("visually-hidden");
  stopLoop();
  isGameOver = false;
  generatePlayfield();
  generateTetromino(true);
  generatePlayfieldNext();
  cells = document.querySelectorAll(".tetris div");
  cellsNext = document.querySelectorAll(".next-tetromino div");
  countScore(null);
  startLoop();
}

const gameOver = () => {
  stopLoop();
};

export const moveDown = () => {
  moveTetrominoDown();
  draw();
  stopLoop();
  startLoop();
  if (isGameOver) {
    gameOver();
    document.querySelector(".game-over").classList.remove("visually-hidden");
  }
};

btnRestart.addEventListener("click", () => {
  init();
});

export const draw = () => {
  //при русі фігури ми її перемальовуємо і видаляємо в моменті атрибут "класс"
  cells.forEach((cell) => {
    cell.removeAttribute("class");
  });
  drawPlayField(playfield, cells, PLAYFIELD_ROWS, PLAYFIELD_COLUMNS);
  drawTetromino();
  drawTetrominoNext();
};

export const isOutsideTopBoard = (row) => {
  return tetromino.row + row < 0;
};

const clearPlayfieldNext = () => {
  cellsNext.forEach((cell) => {
    cell.removeAttribute("class");
  });
};

const getPositionToCellIndex = (row, column) => {
  return row * PLAYFIELD_COLUMNS + column;
};

const drawPlayField = (playfield, cells, PLAYFIELD_ROWS, PLAYFIELD_COLUMNS) => {
  for (let row = 0; row < PLAYFIELD_ROWS; row += 1) {
    for (let column = 0; column < PLAYFIELD_COLUMNS; column += 1) {
      const name = playfield[row][column]; //проходження по всім рядам і колонкам
      const cellIndex = getPositionToCellIndex(row, column, PLAYFIELD_COLUMNS); //по полю проходжусь
      cells[cellIndex].classList.add(name);
    }
  }
};

const getPositionToCellIndexPlayfieldNext = (row, column) => {
  return row * NEXT_PLAYFIELD_COLUMNS + column;
};

function drawTetromino() {
  const name = tetromino.name; //"L"
  const tetrominoMatrixSize = tetromino.matrix.length; //довжина кожного ряду фігури

  //проходимось по рядах знайти фігуру, визначаємо клітинки поля(у поля "класс=0") - де треба малювати фігуру(у фігури "класс=1")
  for (let row = 0; row < tetrominoMatrixSize; row += 1) {
    for (let column = 0; column < tetrominoMatrixSize; column += 1) {
      if (isOutsideTopBoard(row)) {
        continue;
      }
      //перевірка щоб пропустити "класс 0" і не малювати суцільні квадрати замість фігур
      if (!tetromino.matrix[row][column]) {
        continue;
      }

      //cellIndex повертає число (індекс "div" клітинки) у якому знаходиться фігура) (нап-д 44 і 45), всі div інші пропускаємо
      const cellIndex = getPositionToCellIndex(
        //tetromino.row - координати фігури; "+ row" - лічильник
        tetromino.row + row,
        tetromino.column + column,
        PLAYFIELD_COLUMNS
      );
      cells[cellIndex].classList.add(name); //add "L"
    }
  }
}

const drawTetrominoNext = () => {
  //clearPlayfieldNext();
  let extraRow = 2;
  let extraColumn = 1;
  const nameNext = tetrominoNext.name;
  const matrixNext = tetrominoNext.matrix.length;

  for (let row = 0; row < matrixNext; row += 1) {
    for (let column = 0; column < matrixNext; column += 1) {
      if (!tetrominoNext.matrix[row][column]) {
        continue;
      }
      const cellNextIndex = getPositionToCellIndexPlayfieldNext(
        row + extraRow,
        column + extraColumn,
        NEXT_PLAYFIELD_COLUMNS
      );

      cellsNext[cellNextIndex].classList.add(nameNext);
    }
  }
};

//коли фігура торкається низу - створюється наступна
export const placeTetromino = () => {
  const matrixSize = tetromino.matrix.length;
  for (let row = 0; row < matrixSize; row += 1) {
    for (let column = 0; column < matrixSize; column += 1) {
      if (!tetromino.matrix[row][column]) {
        continue; //перевірка
      }
      if (isOutsideTopBoard(row)) {
        isGameOver = true;
        return;
      }
      playfield[tetromino.row + row][tetromino.column + column] =
        tetromino.name;
    }
  }
  const filledRows = findFilledRows();
  //console.log(filledRows);
  removeFillRows(filledRows);
  generateTetromino(false);
  clearPlayfieldNext();
  drawPlayField();
  drawTetrominoNext();
};
