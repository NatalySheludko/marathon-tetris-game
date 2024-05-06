export const getRandom = (array) => {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

export const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
