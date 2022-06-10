var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var playerPattern = [];
var playerSelection;
var level = 0;
var prevLevel = 0;
var prevColour;

$(".rules1").hide();
$(".rules2").hide();
$(".rules3").hide();
$(".rules4").hide();
$(".reset").hide();

$(document).keydown(function () {
   if (level === 0) {
      nextSequence();
      $(".reset").animate({ opacity: '0' }, 500);
   }
   else {
      alert("wrong command");
   }
});


function presser(colour) {
   $("#" + colour).addClass("pressed");
   setTimeout(() => { $("#" + colour).removeClass("pressed") }, 200);
   var audio = new Audio("sounds/" + colour + ".mp3");
   audio.play();
}


$(".btn").click(function () {
   if (level === 0) {
      nextSequence();
   }
   else {
      playerSelection = $(this).attr("id");
      playerPattern.push(playerSelection);
      presser($(this).attr("id"));
      if (playerSelection === gamePattern[playerPattern.length - 1]) {
         if (playerPattern.length === level) {
            setTimeout(function () { nextSequence() }, 1000);
         }
      }
      else {
         alert("GAME OVER");
         var audio = new Audio("sounds/wrong.mp3");
         audio.play();
         $(".reset").show();
         $(".reset").animate({ opacity: '1' }, 500);
      }
   }

});


function nextSequence() {
   playerPattern = [];
   level++;
   $("h1").text("Level " + level);
   var randomNumber = Math.floor(Math.random() * 4);
   var randomColour = buttonColours[randomNumber];
   gamePattern.push(randomColour);
   presser(randomColour);
}


var hide = 0;
$(".rules-button").click(() => {
   if (hide === 0) {
      $(".rules").animate({ opacity: '1' }, "fast");
      hide = 1;
   }
   else if (hide === 1) {
      $(".rules").animate({ opacity: '0' }, 2500);
      hide = 0;
   }

   $(".rules1").toggle("slow", () => {
      $(".rules2").toggle("slow", () => {
         $(".rules3").toggle("slow", () => {
            $(".rules4").toggle("slow")
         });
      });
   });
});

$(".reset").click(() => {
   if (level > prevLevel) {
      $(".high-score span .hs").text(level);
      prevLevel = level;
   }
   gamePattern = [];
   playerPattern = [];
   level = 0;
   nextSequence();
   $("h1").text("Level " + level);
   $(".reset").animate({ opacity: '0' }, 400);
   setTimeout(function () { $(".reset").hide(), 400 });
});





