var viewHighScore = document.getElementById("View-HS");
var welcomeContainer = document.getElementById("welcome");
var startButton = document.getElementById("start-quiz");
var questionContainer = document.getElementById("question");
var answersContainer = document.getElementById("answer-choices");
var resultsContainer = document.getElementById("results-display");
var hsContainer = document.getElementById("high-score-container");
var hsHeader = document.getElementById("high-score");
var hsInput = document.getElementById("high-score-input");
var hsSubmit = document.getElementById("high-score-submit");
var secondsLeft = 60;
var timerInterval;
var score = 0;
// this hides the high score page until it is needed.
hsContainer.style.display = "none";

//this function increases the score when the user answers a question correctly. It is called in the render game function.
function incrementScore(){
  score++;
}

//this function starts the timer. It is called in the render game function.
function startTime() {
  timerInterval = setInterval(count, 1000);
}

// this function counts down the timer holds the conditional to end the game if time runs out
function count() {
  secondsLeft--;
  document.querySelector(".timer").textContent = secondsLeft;
  if (secondsLeft < 1) {
// this brings up the high score page
    endGame();

  }
}


//this function reduces time if the user chooses the wrong answer.
function reduceTime() {
  secondsLeft -= 10;

}
// this function when called will hide all other components and display the high score.
function endGame() {
  clearInterval(timerInterval);
  hsContainer.style.display = "block";
  document.querySelector("#question").textContent = "";
  document.querySelector("#answer-choices").textContent = "";
  document.querySelector("#results-display").textContent = "";

  var h1 = document.createElement("h1");
  h1.setAttribute("class", "question");
  h1.textContent = "Your Score: " + score; 
  hsHeader.append(h1);
}
// this is the array of questions answer choices and correct answer.
// I added a fith answer choice because I kept getting an empty button.
var currentStage = 0;
var gameContent = [
  {
    question: "Commonly used data types DO NOT include:",

    answerChoices: [
      "1.strings",
      "2.booleans",
      "3.alerts",
      "4.numbers",
      "5.values",
    ],

    answer: "3.alerts",
  },
  {
    question:
      "The condition in an if / else statement is enclosed within ______.",

    answerChoices: [
      "1.quotes",
      "2.curly brackets",
      "3.parentheses",
      "4.square brackets",
      "5.single quotes",
    ],

    answer: "3.parentheses",
  },
  {
    question: "Arrays in JavaScript can be used to store ______.",

    answerChoices: [
      "1.numbers and strings",
      "2.other arrays",
      "3.booleans",
      "4.all of the above",
      "5.none of the above",
    ],

    answer: "4.all of the above",
  },
  {
    question:
      "String values must be enclosed within ______ when being assigned to variables.",

    answerChoices: [
      "1.commas",
      "2.curly brackets",
      "3.quotes",
      "4.parentheses",
      "5.semi colons",
    ],

    answer: "4.quotes",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",

    answerChoices: [
      "1.JavaScript",
      "2.terminal/bash",
      "3.for loops",
      "4.console log",
      "5.HP Printer",
    ],

    answer: "4.console log",
  },
];
// this function renders the game it is called after the the start button is clicked.
function renderGame() {


  document.querySelector("#question").textContent = "";
  document.querySelector("#answer-choices").textContent = "";
  document.querySelector("#results-display").textContent = "";
  hsContainer.style.display = "none";
// this dynamically generates the questions.
// I put it outside the loop because it kept printing the question five Time.
  var h1 = document.createElement("h1");
  h1.setAttribute("class", "question");
  h1.textContent = gameContent[currentStage].question;
  h1.setAttribute("data-value", gameContent[currentStage].questions);

  questionContainer.append(h1);

  for (var i = 0; i < gameContent.length; i++) {
// this dynamically generates the buttons.
    var button = document.createElement("button");

    button.setAttribute("class", "answerChoices");
    button.textContent = gameContent[currentStage].answerChoices[i];
    button.setAttribute(
      "data-value",
      gameContent[currentStage].answerChoices[i]
    );

    answersContainer.append(button);
  }
//   This is what happens when an answer is selected. it does not quite work properly pageYOffset.
// only four question answer options come to the screen. when you get to the last question the last question just stays there. it is suppose to end the game and display the high ScriptProcessorNode.
  answersContainer.addEventListener("click", function (event) {
    if (event.target.matches("button")) {
      var selectedAnswer = event.target.getAttribute("data-value");

      resultsContainer.textContent = "";
      var answerToDisplay = document.createElement("p");
      if (selectedAnswer === gameContent[currentStage].answer) {
        incrementScore();
        answerToDisplay.textContent = selectedAnswer + ": Correct";
        resultsContainer.append(answerToDisplay);
      } else {
        answerToDisplay.textContent = selectedAnswer + ": Incorrect";
        resultsContainer.append(answerToDisplay);
        reduceTime();
      }
      if (gameContent[currentStage] === gameContent.length) {
        endGame();
      } else {
        currentStage++;
        var gameDisplay = gameContent[currentStage];
        gameDisplay.textContent = "";
        renderGame();
      }
    }
  });
}
// this function starts the game and the counter.
startButton.addEventListener("click", function () {
  welcomeContainer.style.display = "none";
  var gameDisplay = gameContent[currentStage];
  renderGame(gameDisplay);
  startTime();
});
// this function allows you to go to the high score page when you click View Hi Scores in the nav bar
viewHighScore.addEventListener("click", function () {
  welcomeContainer.style.display = "none";
  endGame();
});