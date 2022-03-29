function printHighscores() {
    // Pulling scores from local storage
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    // Make highscores in decending order
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
    // Make a function for each score input
highscores.forEach(function(score) {
// Put them in a list
    var hslist = document.createElement("li");
    // show users initials - the score they received
    hslist.textContent = score.initials + " - " + score.score;
      // display on page
      var displayhslist = document.getElementById("highscores");
      displayhslist.appendChild(hslist);
    });
  }
// Make a function to reload screen to show all high scores
  function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }
//   clear high scores
  document.getElementById("clear").onclick = clearHighscores;
  // show highscores
  printHighscores();