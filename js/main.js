import {
  TETRISFIELD_COLUMNS,
  TETRISFIELD_ROWS,
  TETRISFIGURES_NAMES,
  TETRISFIGURES_SHAPES,
  NEXT_FIGURE_ROWS,
  NEXT_FIGURE_COLUMNS,
  btnRestart,
} from "./utils.js";

let playfield = [];
let smallPlayfield = [];
let tetrisFigures = {};
let cells = null;
let timeoutId;
let requestId;
let deleteFullRows = 0;
let score = 0;
let isPaused = false;
let isGameOver = false;

init();

function init() {
  document.querySelector(".game-over").classList.add("visually-hidden");
  isGameOver = false;
  generatePlayfield();
  generateFigures();
  generateSmallPlayfield();
  startLoop();
  cells = document.querySelectorAll(".tetris div");
  deleteFullRows = 0;
  score = 0;
  countScore(null);
}

//================USEFUL FUNC===================//
function getRandom(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

//================GENERATE PLAYFIELD & FIGURES===================//
function getPositionToCellNumber(row, column) {
  return row * TETRISFIELD_COLUMNS + column;
}

function getPositionToCellSmallField(row, column) {
  return row * NEXT_FIGURE_COLUMNS + column;
}

function generatePlayfield() {
  document.querySelector(".tetris").innerHTML = "";
  for (let i = 0; i < TETRISFIELD_ROWS * TETRISFIELD_COLUMNS; i += 1) {
    const element = document.createElement("div");
    document.querySelector(".tetris").append(element);
  }
  playfield = new Array(TETRISFIELD_ROWS)
    .fill()
    .map(() => new Array(TETRISFIELD_COLUMNS).fill(0));
  console.log(playfield);
}

function generateSmallPlayfield() {
  document.querySelector(".next-tetromino").innerHTML = "";
  for (let i = 0; i < NEXT_FIGURE_ROWS * NEXT_FIGURE_COLUMNS; i += 1) {
    const element = document.createElement("div");
    document.querySelector(".next-tetromino").append(element);
  }
  smallPlayfield = new Array(NEXT_FIGURE_ROWS)
    .fill()
    .map(() => new Array(NEXT_FIGURE_COLUMNS).fill(0));
  console.log(smallPlayfield);
}

function generateFigures() {
  const figuresName = getRandom(TETRISFIGURES_NAMES);
  const matrixTetro = TETRISFIGURES_SHAPES[figuresName];
  const rowTetro = -2;
  const columnTetro = Math.floor(
    TETRISFIELD_COLUMNS / 2 - Math.floor(matrixTetro.length / 2)
  );
  tetrisFigures = {
    name: figuresName,
    matrix: matrixTetro,
    row: rowTetro,
    column: columnTetro,
  };
}

//================DRAW PLAYFIELD & FIGURES===================//
function drawPlayField() {
  for (let row = 0; row < TETRISFIELD_ROWS; row += 1) {
    for (let column = 0; column < TETRISFIELD_COLUMNS; column += 1) {
      const name = playfield[row][column];
      const tetrisCellNumber = getPositionToCellNumber(row, column);
      cells[tetrisCellNumber].classList.add(name);
    }
  }
}

function drawSmallPlayField() {
  for (let row = 0; row < NEXT_FIGURE_ROWS; row += 1) {
    for (let column = 0; column < NEXT_FIGURE_COLUMNS; column += 1) {
      const name = smallPlayfield[row][column];
      const tetrisCellSmallIndex = getPositionToCellSmallField(row, column);
      cells[tetrisCellSmallIndex].classList.add(name);
    }
  }
}

function drawTetrisFigures() {
  const name = tetrisFigures.name;
  const tetrominoMatrixSize = tetrisFigures.matrix.length;

  for (let row = 0; row < tetrominoMatrixSize; row += 1) {
    for (let column = 0; column < tetrominoMatrixSize; column += 1) {
      if (isOutsideTopBoard(row)) {
        continue;
      }
      if (!tetrisFigures.matrix[row][column]) {
        continue; //малюємо фігуру,пропускаємо 0 щоб не малювались всі фігури у вигляді квадратів
      }
      const tetrisCellNumber = getPositionToCellNumber(
        tetrisFigures.row + row,
        tetrisFigures.column + column
      );
      cells[tetrisCellNumber].classList.add(name);
    }
  }
}

function draw() {
  cells.forEach((cell) => {
    cell.removeAttribute("class");
  });
  drawPlayField();
  drawTetrisFigures();
  drawSmallPlayField();
  //console.table(playfield);
}

function isOutsideTopBoard(row) {
  return tetrisFigures.row + row < 0;
}
function placeTetromino() {
  const matrixSize = tetrisFigures.matrix.length;
  for (let row = 0; row < matrixSize; row += 1) {
    for (let column = 0; column < matrixSize; column += 1) {
      if (!tetrisFigures.matrix[row][column]) {
        continue;
      }
      if (isOutsideTopBoard(row)) {
        isGameOver = true;
        return;
      }
      playfield[tetrisFigures.row + row][tetrisFigures.column + column] =
        tetrisFigures.name;
    }
  }
  const filledRows = findFilledRows();
  removeFillRows(filledRows);
  generateFigures();
}

//================SCORE, SPEED, LEVEL===================//
function countScore(filledRows) {
  switch (filledRows) {
    case 1:
      score += 10;
      break;
    case 2:
      score += 30;
      break;
    case 3:
      score += 60;
      break;
    case 4:
      score += 100;
      break;
    default:
      score += 0;
  }
  document.querySelector("#score").innerHTML = score;
}

//================REMOVE FILLED ROWS===================//
function removeFillRows(filledRows) {
  filledRows.forEach((row) => {
    dropRowsAbove(row);
    document.querySelector(".tetris").style.backgroundColor =
      getRandomHexColor();
    countScore(filledRows.length);
  });
}

function dropRowsAbove(rowDelete) {
  for (let row = rowDelete; row > 0; row -= 1) {
    playfield[row] = playfield[row - 1];
  }
  playfield[0] = new Array(TETRISFIELD_COLUMNS).fill(0);
}

function findFilledRows() {
  const filledRows = [];
  for (let row = 0; row < TETRISFIELD_ROWS; row += 1) {
    let filledColumns = 0;
    for (let column = 0; column < TETRISFIELD_COLUMNS; column += 1) {
      if (playfield[row][column]) {
        filledColumns += 1;
      }
    }
    if (TETRISFIELD_COLUMNS === filledColumns) {
      filledRows.push(row);
      deleteFullRows += 1;
      document.getElementById("output").innerHTML = deleteFullRows;
    }
  }
  return filledRows;
}

//================GAME OVER===================//
function moveDown() {
  moveTetrominoDown();
  draw();
  stopLoop();
  startLoop();
  if (isGameOver) {
    gameOver();
    document.querySelector(".game-over").classList.remove("visually-hidden");
  }
}

function gameOver() {
  stopLoop();
}

function startLoop() {
  timeoutId = setTimeout(
    () => (requestId = requestAnimationFrame(moveDown)),
    700
  );
}

function stopLoop() {
  cancelAnimationFrame(requestId);
  timeoutId = clearTimeout(timeoutId);
}

//================ROTATE FIGURES===================//
function rotateTetromino() {
  const oldMatrix = tetrisFigures.matrix;
  const rotatedMatrix = rotateMatrix(tetrisFigures.matrix);
  tetrisFigures.matrix = rotatedMatrix;
  if (isValid()) {
    tetrisFigures.matrix = oldMatrix;
  }
}

function rotateMatrix(matrixTetromino) {
  const N = matrixTetromino.length;
  const rotateMatrix = [];
  for (let i = 0; i < N; i += 1) {
    rotateMatrix[i] = [];
    for (let j = 0; j < N; j += 1) {
      rotateMatrix[i][j] = matrixTetromino[N - j - 1][i];
    }
  }
  return rotateMatrix;
}

btnRestart.addEventListener("click", function () {
  init();
});

//================MOVE FIGURES===================//
function togglePauseGame() {
  isPaused = !isPaused;
  if (isPaused) {
    stopLoop();
  } else {
    startLoop();
  }
}

const onKeyDown = (event) => {
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
};

document.addEventListener("keydown", onKeyDown);

function dropTetrominoDown() {
  while (!isValid()) {
    tetrisFigures.row += 1;
  }
  tetrisFigures.row -= 1;
}

function moveTetrominoDown() {
  tetrisFigures.row += 1;
  if (isValid()) {
    tetrisFigures.row -= 1;
    placeTetromino();
  }
}

function moveTetrominoLeft() {
  tetrisFigures.column -= 1;
  if (isValid()) {
    tetrisFigures.column += 1;
  }
}

function moveTetrominoRight() {
  tetrisFigures.column += 1;
  if (isValid()) {
    tetrisFigures.column -= 1;
  }
}

//===============CHECK COLLISIONS====================//
function isValid() {
  const matrixSize = tetrisFigures.matrix.length;
  for (let row = 0; row < matrixSize; row += 1) {
    for (let column = 0; column < matrixSize; column += 1) {
      if (!tetrisFigures.matrix[row][column]) {
        continue; //виправили нижню зайву строку "L"
      }
      if (isOutsideOfGameBoard(row, column)) {
        return true;
      }
      if (hasCollisions(row, column)) {
        return true;
      }
    }
  }
  return false;
}

function isOutsideOfGameBoard(row, column) {
  return (
    tetrisFigures.column + column < 0 ||
    tetrisFigures.column + column >= TETRISFIELD_COLUMNS ||
    tetrisFigures.row + row >= playfield.length
  );
}

function hasCollisions(row, column) {
  return playfield[tetrisFigures.row + row]?.[tetrisFigures.column + column];
}
