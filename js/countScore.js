import { showScore } from "./utils.js";

export let score = 0;

export const countScore = (filledRows) => {
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
  showScore.innerHTML = score;
};
