// Closing the rules section
const closeRules = () => {
  const gameRule = document.getElementById("gameRules");

  if (gameRule.style.display === "flex") {
    gameRule.style.display = "none";
  } else {
    gameRule.style.display = "flex";
  }
};

// Load Score from Local Storage
window.onload = () => {
  if (localStorage.getItem("userScore")) {
    var userScore = localStorage.getItem("userScore");
    var pcScore = localStorage.getItem("pcScore");
  } else {
    var userScore = 0;
    var pcScore = 0;
  }

  document.getElementById("myScore").innerHTML = userScore;
  document.getElementById("compScore").innerHTML = pcScore;
};

// Dont't reset if reloded
const refresh = () => {
  localStorage.setItem("userScore", 0);
  localStorage.setItem("pcScore", 0);
  location.reload();
};

// Playing Game
const playagain = () => {
  document.getElementById("choose").style.display = "flex";
  document.getElementById("results").style.display = "none";
};

if (localStorage.getItem("userScore")) {
  var userScore = localStorage.getItem("userScore");
  var pcScore = localStorage.getItem("pcScore");
} else {
  var userScore = 0;
  var pcScore = 0;
}

// Starting to result
const start = (userChoice) => {
  localStorage.setItem("userScore", userScore);
  localStorage.setItem("pcScore", pcScore);
  // generating the Result
  const resultLoad = document.createElement("div");
  resultLoad.classList.add("winner");
  if (userChoice === "rock") {
    document.getElementById("iClicked").style.border = "20px solid #0074b6";
    document.getElementById("userChoosed").src = "./vectors/stone.svg";
  } else if (userChoice === "paper") {
    document.getElementById("iClicked").style.border = "20px solid #ffa943";
    document.getElementById("userChoosed").src = "./vectors/paper.svg";
  } else if (userChoice === "scissor") {
    document.getElementById("iClicked").style.border = "20px solid #bd00ff";
    document.getElementById("userChoosed").src = "./vectors/scissor.svg";
  }

  document.getElementById("choose").style.display = "none";
  document.getElementById("results").style.display = "flex";
  document.getElementById("result").style.transform = "scale(0)";
  document.getElementById("loadingDone").style.display = "none";
  document.getElementById("loading").style.display = "inherit";

  const elements = document.querySelectorAll(`.winner`);
  elements.forEach((element) => {
    element.remove();
  });

  interval = setInterval(() => {
    clearInterval(interval);
    play(userChoice);
  }, 1500);
};

// Playing the Game on clicking the button
const play = (userChoice) => {
  document.getElementById("result").style.transform = "scale(1)";
  document.getElementById("loadingDone").style.display = "inherit";
  document.getElementById("loading").style.display = "none";

  const choices = ["rock", "paper", "scissor"];
  const randomIndex = Math.floor(Math.random() * 3);
  const computerChoice = choices[randomIndex];

  // Setting User Choicices
  const resultLoad = document.createElement("div");
  resultLoad.classList.add("winner");

  // Setting Computer Choices
  if (computerChoice === "rock") {
    document.getElementById("compChoose").style.border = "20px solid #0074b6";
    document.getElementById("loadingDone").src = "./vectors/stone.svg";
  } else if (computerChoice === "paper") {
    document.getElementById("compChoose").style.border = "20px solid #ffa943";
    document.getElementById("loadingDone").src = "./vectors/paper.svg";
  } else if (computerChoice === "scissor") {
    document.getElementById("compChoose").style.border = "20px solid #bd00ff";
    document.getElementById("loadingDone").src = "./vectors/scissor.svg";
  }

  let result = "";
  if (userChoice === computerChoice) {
    result = "It's a tie!";
    document.getElementById("win").innerHTML = "TIE UP";
    document.getElementById("tie").innerHTML = "";
  } else if (
    (userChoice === "rock" && computerChoice === "scissor") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissor" && computerChoice === "paper")
  ) {
    result = "YOU WIN!";
    userScore++;
    localStorage.setItem("userScore", userScore);
    localUserScore = localStorage.getItem("userScore");

    document.getElementById("myScore").innerHTML = localUserScore;
    document.getElementById("win").innerHTML = "YOU WIN";
    document.getElementById("tie").innerHTML = "AGAINST PC";
    document.getElementById("iClicked").appendChild(resultLoad);
  } else {
    result = "YOU LOSE!";
    pcScore++;
    localStorage.setItem("pcScore", pcScore);
    localPCScore = localStorage.getItem("pcScore");

    document.getElementById("compScore").innerHTML = localPCScore;
    document.getElementById("win").innerHTML = "YOU LOST";
    document.getElementById("tie").innerHTML = "AGAINST PC";
    document.getElementById("compChoose").appendChild(resultLoad);
  }

  if (result === "YOU WIN!") {
    document.getElementById("next").style.display = "inherit";
  } else {
    document.getElementById("next").style.display = "none";
  }
};
