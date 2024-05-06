import { countScore } from "./countScore.js";
import { getRandomHexColor } from "./functionRandom.js";
import { playfield } from "./generatePlayfield.js";
import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS, tetris } from "./utils.js";

let deleteFullRows = 0;

const shaking = () => {
  setTimeout(() => {
    tetris.classList.remove("shaking");
  }, 500);
};

export const findFilledRows = () => {
  const filledRows = [];
  //проходимо по кожному ряду
  for (let row = 0; row < PLAYFIELD_ROWS; row += 1) {
    //кількість заповнених колонок, фільтрую щоб знайти заповнені ряди
    const filledColumns = playfield[row].filter(
      (column) => column !== 0
    ).length;
    if (PLAYFIELD_COLUMNS === filledColumns) {
      //пушимо номер ряду
      filledRows.push(row);
      deleteFullRows += 1;
      document.getElementById("output").innerHTML = deleteFullRows;
    }
  }
  return filledRows;
};

//приходить по ряду що треба видалити
const dropRowsAbove = (rowDelete) => {
  //присвоюємо значення з ряду яке хочемо виділити
  //поки лічильник > 0 то віднімаємо ряд
  for (let row = rowDelete; row > 0; row -= 1) {
    playfield[row] = playfield[row - 1];
  }
  //додаємо вгорі новий ряд масиву на місце того що видалили
  playfield[0] = new Array(PLAYFIELD_COLUMNS).fill(0);
  tetris.classList.add("shaking");
  shaking();
};

export const removeFillRows = (filledRows) => {
  filledRows.forEach((row) => {
    //видаляє по одному ряду (навіть якщо дек.одразу то по черзі)
    dropRowsAbove(row);
    document.querySelector(".tetris").style.backgroundColor =
      getRandomHexColor();
    countScore(filledRows.length);
  });
};
