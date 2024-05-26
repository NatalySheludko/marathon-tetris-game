import { playfield } from "./generatePlayfield.js";
import { tetromino } from "./generateTetromino.js";
import { PLAYFIELD_COLUMNS } from "./utils.js";

export const isValid = () => {
  const matrixSize = tetromino.matrix.length;
  for (let row = 0; row < matrixSize; row += 1) {
    for (let column = 0; column < matrixSize; column += 1) {
      if (!tetromino.matrix[row][column]) {
        continue; //виправили нижню зайву строку "L"
      }
      if (isOutsideOfGameBoard(row, column)) {
        return true; //якщо фігура впритул до краю - далі рух заборонено
      }
      if (hasCollisions(row, column)) {
        return true;
      }
    }
  }
  return false; //якщо ніякий цикл не спрацював то false
};

//перевірка чи виходимо за межі
export const isOutsideOfGameBoard = (row, column) => {
  return (
    tetromino.column + column < 0 || //перевіряємо чи розміщення фігури = -1
    tetromino.column + column >= PLAYFIELD_COLUMNS ||
    tetromino.row + row >= playfield.length //верхня частина
  );
};

//щоб фігури бачили одна одну, перевірка на 0
export const hasCollisions = (row, column) => {
  return playfield[tetromino.row + row]?.[tetromino.column + column];
};
