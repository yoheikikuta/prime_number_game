const startButton = document.getElementById('start-button');
const numberDisplay = document.getElementById('number-display');
const primeButton = document.getElementById('prime-button');
const compositeButton = document.getElementById('composite-button');

function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function handleButtonClick(button, correct) {
  primeButton.disabled = true;
  compositeButton.disabled = true;
  button.classList.add(correct ? 'correct' : 'incorrect');

  setTimeout(() => {
    button.classList.remove('correct', 'incorrect');
    startButton.disabled = false;
  }, 1000);
}

primeButton.addEventListener('click', () => {
  const number = parseInt(numberDisplay.textContent, 10);
  handleButtonClick(primeButton, isPrime(number));
});

compositeButton.addEventListener('click', () => {
  const number = parseInt(numberDisplay.textContent, 10);
  handleButtonClick(compositeButton, !isPrime(number));
});

startButton.addEventListener('click', () => {
  const randomNumber = Math.floor(Math.random() * 10) + 1; // 1 から 10 までのランダムな整数
  numberDisplay.textContent = randomNumber;
  startButton.disabled = true;
  primeButton.disabled = false;
  compositeButton.disabled = false;
});
