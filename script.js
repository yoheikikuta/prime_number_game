class PrimeGame {
  constructor() {
    this.startButton = document.getElementById('start-button');
    this.numberDisplay = document.getElementById('number-display');
    this.primeButton = document.getElementById('prime-button');
    this.compositeButton = document.getElementById('composite-button');
    this.timerDisplay = document.getElementById('timer');
    this.factorizationResult = document.getElementById('factorization-result');

    this.totalQuestions = 2;
    this.currentQuestion = 0;
    this.correctAnswers = 0;
    this.timeoutId = null;

    this.setupEventListeners();
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

    const number = parseInt(this.numberDisplay.textContent, 10);
    const factors = this.primeFactorization(number);
    this.factorizationResult.textContent = `${number} = ${factors.join(' × ')}`;

    setTimeout(() => {
      if (button) {
        button.classList.remove('correct', 'incorrect');
      }
      this.factorizationResult.textContent = '';
      this.startNextQuestion();
    }, 1000);
  }

  setupEventListeners() {
    this.primeButton.addEventListener('click', () => {
      const number = parseInt(this.numberDisplay.textContent, 10);
      this.handleButtonClick(this.primeButton, this.isPrime(number));
    });

    this.compositeButton.addEventListener('click', () => {
      const number = parseInt(this.numberDisplay.textContent, 10);
      this.handleButtonClick(this.compositeButton, !this.isPrime(number));
    });

    this.startButton.addEventListener('click', this.startNextQuestion.bind(this));
  }

  showResults() {
    this.numberDisplay.textContent = `結果: ${this.correctAnswers} / ${this.totalQuestions} 問正解`;
    this.startButton.disabled = false;
    this.startButton.textContent = 'もう一度挑戦';
    this.correctAnswers = 0;
    this.currentQuestion = 0;
  }

  startNextQuestion() {
    if (this.currentQuestion < this.totalQuestions) {
      this.currentQuestion++;
      const randomNumber = Math.floor(Math.random() * 9) + 2;
      this.numberDisplay.textContent = randomNumber;
      this.startButton.disabled = true;
      this.primeButton.disabled = false;
      this.compositeButton.disabled = false;

      let timeLeft = 10;
      this.timerDisplay.textContent = timeLeft;

      this.timeoutId = setInterval(() => {
        timeLeft--;
        this.timerDisplay.textContent = timeLeft;

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
