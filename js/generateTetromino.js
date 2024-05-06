import { getRandom } from "./functionRandom.js";
import {
  PLAYFIELD_COLUMNS,
  TETROMINOES_NAMES,
  TETROMINOES_SHAPES,
} from "./utils.js";

export let tetromino = {};
export let tetrominoNext = {};

export function generateTetromino(showTetromino) {
  const nameTetro = getRandom(TETROMINOES_NAMES);
  const matrixTetro = TETROMINOES_SHAPES[nameTetro];

  const nameTetroNext = getRandom(TETROMINOES_NAMES);
  const matrixTetroNext = TETROMINOES_SHAPES[nameTetroNext];

  const rowTetro = -2;
  const columnTetro = Math.floor(
    PLAYFIELD_COLUMNS / 2 - matrixTetro.length / 2
	);
	const rowTetroNext = -2;
  const columnTetroNext = Math.floor(
    PLAYFIELD_COLUMNS / 2 - matrixTetroNext.length / 2
  );

  tetromino = {
    name: nameTetro,
    matrix: matrixTetro,
    row: rowTetro,
    column: columnTetro,
  };

  tetromino = showTetromino ? tetromino : tetrominoNext;

  tetrominoNext = {
    name: nameTetroNext,
    matrix: matrixTetroNext,
    row: rowTetroNext,
    column: columnTetroNext,
  };
}