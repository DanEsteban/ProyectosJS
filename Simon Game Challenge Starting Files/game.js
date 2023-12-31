var gamePattern=[];
var userClickedPattern=[];
var buttonColours =["red","blue","green","yellow"];


$( ".btn" ).click(function () {

  var userChosenColour =$(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});



var started =false;
var level = 0;

$(document).keypress(function(){
  if (!started) {
    $("#level-title").text("Level "+level);
    nextSequence();
     started = true;
  }
});


function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }
    } else {
      $(document.body).addClass("game-over");
      var audio2 = new Audio('sounds/wrong.mp3');
      audio2.play();
      setTimeout(function(){
        $(document.body).removeClass("game-over");
      }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
         startOver();
         $(document).keypress(function(){
           if (!started) {
             $("#level-title").text("Level "+level);
             nextSequence();
              started = true;
           }
         });

    }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber= Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function startOver(){
    gamePattern=[];
    level=0;
    started =false;

}

function playSound(name){
  var audio = new Audio('sounds/'+name+'.mp3');
  audio.play();
}

function animatePress(currentColour){

  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  }, 100);

}
