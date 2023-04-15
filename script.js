const startButton = document.getElementById('start-button');
const numberDisplay = document.getElementById('number-display');

startButton.addEventListener('click', () => {
  const randomNumber = Math.floor(Math.random() * 10) + 1; // 1 から 10 までのランダムな整数
  numberDisplay.textContent = randomNumber;
});
