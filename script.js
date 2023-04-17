class PrimeGame {
  constructor() {
    this.startButton = document.getElementById('start-button');
    this.numberDisplay = document.getElementById('number-display');
    this.primeButton = document.getElementById('prime-button');
    this.compositeButton = document.getElementById('composite-button');
    this.timerDisplay = document.getElementById('timer');
    this.timerProgress = document.getElementById('timer-progress');

    this.totalQuestions = 20;
    this.currentQuestion = 0;
    this.correctAnswers = 0;
    this.timeoutId = null;
    this.usedNumbers = new Set();

    this.startButton.addEventListener('click', () => this.startNextQuestion());
    this.primeButton.addEventListener('click', () => this.handleButtonClick(this.primeButton, this.isPrime(this.currentNumber)));
    this.compositeButton.addEventListener('click', () => this.handleButtonClick(this.compositeButton, !this.isPrime(this.currentNumber)));
  }

  isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
      if (num % i === 0) return false;
    }
    return true;
  }

  primeFactorization(num) {
    const factors = [];
    for (let divisor = 2; num > 1; divisor++) {
      while (num % divisor === 0) {
        factors.push(divisor);
        num /= divisor;
      }
    }
    return factors;
  }

  handleButtonClick(button, correct) {
    clearTimeout(this.timeoutId);
    this.primeButton.disabled = true;
    this.compositeButton.disabled = true;

    if (correct) {
      this.correctAnswers++;
    }

    if (button) {
      button.classList.add(correct ? 'correct' : 'incorrect');
    }

    const factorizationResult = document.getElementById('factorization-result');
    const factors = this.primeFactorization(this.currentNumber);
    factorizationResult.textContent = `${this.currentNumber} = ${factors.join(' × ')}`;

    setTimeout(() => {
      if (button) {
        button.classList.remove('correct', 'incorrect');
      }
      factorizationResult.textContent = '';
      this.startNextQuestion();
    }, 1000);
  }

  showResults() {
    this.numberDisplay.textContent = `結果: ${this.correctAnswers} / ${this.totalQuestions} 問正解`;
    this.startButton.disabled = false;
    this.startButton.textContent = 'もう一度挑戦';
    this.correctAnswers = 0;
    this.currentQuestion = 0;
    this.usedNumbers.clear();
  }

  generateRandomNumber() {
    let randomNumber;
    const lowerBound = this.currentQuestion <= 10 ? 3 : 100;
    const upperBound = this.currentQuestion <= 10 ? 99 : 999;

    do {
      randomNumber = Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
    } while (randomNumber % 2 === 0 || this.usedNumbers.has(randomNumber));

    this.usedNumbers.add(randomNumber);
    return randomNumber;
  }

  startNextQuestion() {
    if (this.currentQuestion < this.totalQuestions) {
      this.currentQuestion++;
      this.currentNumber = this.generateRandomNumber();
      this.numberDisplay.textContent = this.currentNumber;
      this.startButton.disabled = true;
      this.primeButton.disabled = false;
      this.compositeButton.disabled = false;

      let timeLeft = 10;
      this.timerDisplay.textContent = timeLeft;
      this.timerProgress.style.width = '100%';

      this.timeoutId = setInterval(() => {
        timeLeft--;
        this.timerDisplay.textContent = timeLeft;
        this.timerProgress.style.width = `${(timeLeft / 10) * 100}%`;
        if (timeLeft === 0) {
          clearTimeout(this.timeoutId);
          this.handleButtonClick(null, false);
        }
      }, 1000);
    } else {
      this.showResults();
    }
  }
}

const game = new PrimeGame();
