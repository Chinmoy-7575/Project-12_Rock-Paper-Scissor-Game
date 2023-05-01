const options = document.querySelectorAll(".option");
const playerScoreEl = document.querySelector("#playerScore");
const computerScoreEl = document.querySelector("#computerScore");
const resultEl = document.querySelector("#result");
const resetEl = document.querySelector("#reset");
const winAudio = new Audio('win.wav');
const tieAudio = new Audio('tie.wav');

let playerScore = 0;
let computerScore = 0;

options.forEach(option => {
  option.addEventListener("click", function() {
    const computerChoice = computerChoose();
    const playerChoice = this.id;
    const result = checkWinner(playerChoice, computerChoice);

    showResult(playerChoice, computerChoice, result);
    updateScore(result);
  });
});

resetEl.addEventListener("click", function() {
  resetGame();
});

function computerChoose() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

function checkWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "tie";
  } else if (playerChoice === "rock" && computerChoice === "scissors" ||
             playerChoice === "paper" && computerChoice === "rock" ||
             playerChoice === "scissors" && computerChoice === "paper") {
    return "win";
  } else {
    return "lose";
  }
}

function showResult(playerChoice, computerChoice, result) {
  resultEl.innerHTML = `You chose <strong>${playerChoice}</strong>. Computer chose <strong>${computerChoice}</strong>. You ${result}.`;
}

function updateScore(result) {
  if (result === "win") {
    playerScore++;
    playerScoreEl.innerHTML = playerScore;
    resultEl.classList.remove("tie");
    resultEl.classList.add("win");
    winAudio.play();
  } else if (result === "lose") {
    computerScore++;
    computerScoreEl.innerHTML = computerScore;
    resultEl.classList.remove("tie");
    resultEl.classList.add("lose");
  } else {
    resultEl.classList.remove("win");
    resultEl.classList.add("tie");
    tieAudio.play();
  }

  if (playerScore === 3) {
    endGame("You Win!");
  } else if (computerScore === 3) {
    endGame("You Lose!");
  }
}

function endGame(message) {
  resultEl.innerHTML = `<strong>${message}</strong> Click Reset Game to play again.`;
  resetEl.style.display = "center";
  options.forEach(option => {
    option.removeEventListener("click", function() {});
  });
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  playerScoreEl.innerHTML = 0;
  computerScoreEl.innerHTML = 0;
  resultEl.innerHTML = "";
  resultEl.classList.remove("win", "lose", "tie");
  resetEl.style.display = "none";
  options.forEach(option => {
    option.addEventListener("click", function() {
      const computerChoice = computerChoose();
      const playerChoice = this.id;
      const result = checkWinner(playerChoice, computerChoice);

      showResult(playerChoice, computerChoice, result);
      updateScore(result);
    });
  });
}
