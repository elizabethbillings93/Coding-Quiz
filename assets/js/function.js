// variables to keep track of quiz state
var Qindex = 0;
// time is based on how many questions, 5 questions total * 15 seconds-75 seconds total
var time = questions.length * 15;
var timerId;
// variables to reference DOM elements
var questionslist = document.getElementById("questions");
var timerEl = document.getElementById("time");
var answersEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startQbtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var scoreLsEl = document.getElementById("scoreLs");
function startQuiz() {
  // hide start screen after hitting "start quiz"button
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");
  // un-hide questions section after start screen removes
  questionslist.removeAttribute("class");
  // start timer-in milliseconds *1000=seconds
  timerId = setInterval(clockTick, 1000);
  // show starting time
  timerEl.textContent = time;
// begin below function
  startQuestions();
}
function startQuestions() {
  // get questions
  var currentQuestion = questions[Qindex];
  // update title with current question
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;
  // clear out any old question choices
  answersEl.innerHTML = "";
  // pulling question out of array currentQuestion
  currentQuestion.choices.forEach(function(choice, i) {
    // create button for each answer
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);
    choiceNode.textContent = i + 1 + ". " + choice;
    // attach click event listener to each choice
    choiceNode.onclick = questionClick;
    // display on the page
    answersEl.appendChild(choiceNode);
  });
}
function questionClick() {
  // check if user guessed wrong
  if (this.value !== questions[Qindex].answer) {
    // penalize time
    time -= 15;
    if (time < 0) {
      time = 0;
    }
    // display new time on page
    timerEl.textContent = time;
// Display "wrong" if incorrect answer was chosen
    scoreLsEl.textContent = "Wrong!";
  } else {
//    Display "correct" if the correct answer was chosen
    scoreLsEl.textContent = "Correct!";
  }
  // show "correct" or "wrong" for a second
  scoreLsEl.setAttribute("class", "scoreLs");
  setTimeout(function() {
    scoreLsEl.setAttribute("class", "scoreLs hide");
  }, 1000);
  // move to next question
  Qindex++;
  // check if we've run out of questions
  if (Qindex === questions.length) {
    quizEnd();
  } else {
    startQuestions();
  }
}
function quizEnd() {
  // stop timer
  clearInterval(timerId);
  // show end screen
  var endScreenEl = document.getElementById("end-screen");
//   make page visible
  endScreenEl.removeAttribute("class");
  // show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;
  // hide questions section
  questionslist.setAttribute("class", "hide");
}
function clockTick() {
  // update time
  time--;
  timerEl.textContent = time;
  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}
function saveHighscore() {
  // retrieve score
  var initials = initialsEl.value.trim();
  // if initials were empty
  if (initials !== "") {
    // get saved scores from localstorage
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials
    };
    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    // redirect to next page
    window.location.href = "highscores.html";
  }
}
function checkForEnter(event) {
  //after hitting the "submit"button
  if (event.key === "Enter") {
    saveHighscore();
  }
}
// user clicks button to submit initials
submitBtn.onclick = saveHighscore;
// user clicks button to start quiz
startQbtn.onclick = startQuiz;
initialsEl.onkeyup = checkForEnter;
