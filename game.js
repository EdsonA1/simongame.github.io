// declare list of colors
var buttonColours = ["red", "blue", "green","yellow"];
// create random pattern list and the click list
var gamePattern = [];
var userClickedPattern = [];
// start leve
var level = 0
// set statrt to false starting out
var start = false;

// initial keypress
$(document).keypress(function() {
  if (!start) {
    // change level 
    $("#level-title").text("Level " + level);
    // get next sequeunce
    nextSequence();
    // change start 
    start = true;

  }
});

// function for click
$(".btn").click(function() {
  // takes in chosen color clicked
  var userChosenColour = $(this).attr('id');
  // addds to list
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1 );

});

// function to check answer
function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success")
    if (userClickedPattern.length == gamePattern.length){
      // waait before next is shown and restart clicked pattern
      setTimeout(nextSequence,1000);
      userClickedPattern = [];
    };
  } else {
    console.log("wrong");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

// function to start over
function startOver(){
    level = 0;
    gamePattern = [];
    start = false;
}

// function to get next sequence 
function nextSequence(){
  level ++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 3);
  randomChosenColour= buttonColours[randomNumber]; 
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

// function to play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// function to animate buttons
function animatePress(currentColour){
  
  header = $("#" + currentColour);
  header.addClass("pressed");
  setTimeout(function () {
    header.removeClass('pressed');
  }, 100);
}


// Created by Edson Augustin 
