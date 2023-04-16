const startButton = document.getElementById('start-button');
const numberDisplay = document.getElementById('number-display');
const primeButton = document.getElementById('prime-button');
const compositeButton = document.getElementById('composite-button');
const timerDisplay = document.getElementById('timer');
const factorizationResult = document.getElementById('factorization-result');

const totalQuestions = 2;
let currentQuestion = 0;
let correctAnswers = 0;
let timeoutId;

function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function getPrimeFactors(num) {
  const factors = [];
  for (let divisor = 2; num > 1; divisor++) {
    while (num % divisor === 0) {
      factors.push(divisor);
      num /= divisor;
    }
  }
  return factors;
}

function handleButtonClick(button, correct) {
  clearTimeout(timeoutId);
  primeButton.disabled = true;
  compositeButton.disabled = true;

  if (correct) {
    correctAnswers++;
  }

  if (button) {
    button.classList.add(correct ? 'correct' : 'incorrect');
  }

  // Display prime factorization result
  const number = parseInt(numberDisplay.textContent, 10);
  const factors = getPrimeFactors(number);
  factorizationResult.textContent = `${number} = ${factors.join(' × ')}`;

  setTimeout(() => {
    if (button) {
      button.classList.remove('correct', 'incorrect');
    }
    factorizationResult.textContent = ''; // Clear prime factorization result display
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

function showResults() {
  numberDisplay.textContent = `結果: ${correctAnswers} / ${totalQuestions} 問正解`;
  startButton.disabled = false;
  startButton.textContent = 'もう一度挑戦';
  correctAnswers = 0;
  currentQuestion = 0;
}

function startNextQuestion() {
  if (currentQuestion < totalQuestions) {
    currentQuestion++;
    const randomNumber = Math.floor(Math.random() * 9) + 2; // Random integer between 2 and 10
    numberDisplay.textContent = randomNumber;
    startButton.disabled = true;
    primeButton.disabled = false;
    compositeButton.disabled = false;

    let timeLeft = 10;
    timerDisplay.textContent = timeLeft;

    // Update timer
    timeoutId = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = timeLeft;

      if (timeLeft === 0) {
        clearTimeout(timeoutId);
        handleButtonClick(null, false); // Treat as incorrect answer when time runs out
      }
    }, 1000);
  } else {
    showResults();
  }
}

startButton.addEventListener('click', startNextQuestion);
