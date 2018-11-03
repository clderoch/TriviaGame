$(document).ready(function () {
var options = [
	{
		question: "Boy, these pretzels are makin' me thirsty.", 
		choice: ["Jerry", "Elaine", "George", "Kramer", "Newman"],
		answer: 3,
		photo: "assets/images/kramer.jpeg"
	 },
	 {
	 	question: "It became very clear to me sitting out there today that every decision I've made in my entire life has been wrong. My life is the complete opposite of everything I want it to be. Every instinct I have, in every aspect of life, be it something to wear, something to eat - it's all been wrong.", 
		choice: ["Jerry", "Elaine", "George", "Kramer", "Newman"],
		answer: 2,
		photo: "assets/images/george.jpeg"
	 }, 
	 {
	 	question: "The cat - mrrreeeooowww - is out of the bag!", 
		choice: ["Jerry", "Elaine", "George", "Kramer", "Newman"],
		answer: 3,
		photo: "assets/images/kramer.jpeg"
	}, 
	{
		question: "I had a dream last night that a hamburger was eating me.", 
		choice: ["Jerry", "Elaine", "George", "Kramer", "Newman"],
		answer: 0,
		photo: "assets/images/jerry.jpeg"
	}, 
	{
		question: "Just remember, when you control the mail, you control... information.", 
		choice: ["Jerry", "Elaine", "George", "Kramer", "Newman"],
		answer: 4,
		photo: "assets/images/newman.jpeg"
	}, 
	{
		question: "I'm not a lesbian. I hate men, but I'm not a lesbian.", 
		choice: ["Jerry", "Elaine", "George", "Kramer", "Newman"],
		answer: 1,
		photo: "assets/images/elaine.jpeg"
	}, 
	{
		question: "Jerry, just remember, it's not a lie if you believe it.", 
		choice: ["Jerry", "Elaine", "George", "Kramer", "Newman"],
		answer: 2,
		photo: "assets/images/george.jpeg"
	}, 
	{
		question: "See, this is what the holidays are all about. Three buddies sitting around chewing gum.", 
		choice: ["Jerry", "Elaine", "George", "Kramer", "Newman"],
		answer: 3,
		photo: "assets/images/kramer.jpeg"
	},
	{
		question: "We have to break up.", 
		choice: ["Jerry", "Elaine", "George", "Kramer", "Newman"],
		answer: 1,
		photo: "assets/images/elaine.jpeg"
	}];

var correctCount = 0;
var wrongCount = 0;
var unanswerCount = 0;
var timer = 20;
var intervalId;
var userGuess ="";
var running = false;
var qCount = options.length;
var pick;
var index;
var newArray = [];
var holder = [];



$("#reset").hide();
//click start button to start game
$("#start").on("click", function () {
		$("#start").hide();
		displayQuestion();
		runTimer();
		for(var i = 0; i < options.length; i++) {
	holder.push(options[i]);
}
	})
//timer start
function runTimer(){
	if (!running) {
	intervalId = setInterval(decrement, 1000); 
	running = true;
	}
}
//timer countdown
function decrement() {
	$("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
	timer --;

	//stop timer if reach 0
	if (timer === 0) {
		unanswerCount++;
		stop();
		$("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}	
}

//timer stop
function stop() {
	running = false;
	clearInterval(intervalId);
}
//randomly pick question in array if not already shown
//display question and loop though and display possible answers
function displayQuestion() {
	//generate random index in array
	index = Math.floor(Math.random()*options.length);
	pick = options[index];

//	if (pick.shown) {
//		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
//		displayQuestion();
//	} else {
//		console.log(pick.question);
		//iterate through answer array and display
		$("#questionblock").html("<h2>" + pick.question + "</h2>");
		for(var i = 0; i < pick.choice.length; i++) {
			var userChoice = $("<div>");
			userChoice.addClass("answerchoice");
			userChoice.html(pick.choice[i]);
			//assign array position to it so can check answer
			userChoice.attr("data-guessvalue", i);
			$("#answerblock").append(userChoice);
//		}
}



//click function to select answer and outcomes
$(".answerchoice").on("click", function () {
	//grab array position from userGuess
	userGuess = parseInt($(this).attr("data-guessvalue"));

	//correct guess or wrong guess outcomes
	if (userGuess === pick.answer) {
		stop();
		correctCount++;
		userGuess="";
		$("#answerblock").html("<p>Correct!</p>");
		hidepicture();

	} else {
		stop();
		wrongCount++;
		userGuess="";
		$("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}
})
}


function hidepicture () {
	$("#answerblock").append("<img src=" + pick.photo + ">");
	newArray.push(pick);
	options.splice(index,1);

	var hidpic = setTimeout(function() {
		$("#answerblock").empty();
		timer= 20;

	//run the score screen if all questions answered
	if ((wrongCount + correctCount + unanswerCount) === qCount) {
		$("#questionblock").empty();
		$("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
		$("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
		$("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
		$("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
		$("#reset").show();
		correctCount = 0;
		wrongCount = 0;
		unanswerCount = 0;

	} else {
		runTimer();
		displayQuestion();

	}
	}, 3000);


}

$("#reset").on("click", function() {
	$("#reset").hide();
	$("#answerblock").empty();
	$("#questionblock").empty();
	for(var i = 0; i < holder.length; i++) {
		options.push(holder[i]);
	}
	runTimer();
	displayQuestion();

})

})