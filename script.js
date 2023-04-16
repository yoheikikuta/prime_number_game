const startButton = document.getElementById('start-button');
const numberDisplay = document.getElementById('number-display');
const primeButton = document.getElementById('prime-button');
const compositeButton = document.getElementById('composite-button');
const timerDisplay = document.getElementById('timer');

const totalQuestions = 2;
let currentQuestion = 0;
let timeoutId;

function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function handleButtonClick(button, correct) {
  clearTimeout(timeoutId);
  primeButton.disabled = true;
  compositeButton.disabled = true;
  if (button) {
    button.classList.add(correct ? 'correct' : 'incorrect');
  }

  setTimeout(() => {
    if (button) {
      button.classList.remove('correct', 'incorrect');
    }
    startNextQuestion();
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

function startNextQuestion() {
  if (currentQuestion < totalQuestions) {
    currentQuestion++;
    const randomNumber = Math.floor(Math.random() * 9) + 2; // 2 から 10 までのランダムな整数
    numberDisplay.textContent = randomNumber;
    startButton.disabled = true;
    primeButton.disabled = false;
    compositeButton.disabled = false;

    let timeLeft = 10;
    timerDisplay.textContent = timeLeft;

    // タイマーの更新
    timeoutId = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = timeLeft;

      if (timeLeft === 0) {
        clearTimeout(timeoutId);
        handleButtonClick(null, false); // 時間切れの場合は不正解として扱う
      }
    }, 1000);
  } else {
    // ゲーム終了処理（後ほど実装）
  }
}

startButton.addEventListener('click', startNextQuestion);
