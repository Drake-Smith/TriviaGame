//declare variables
var timeLeft = 12; //starts off at 12 seconds
var handler; //var for the timer
var correct = 0; //how many questions guessed correctly
var incorrect = 0; //how many questions guessed incorrectly
var unanswered = 0; //how many ques wrong
var quesNumber = 0; //which question we're currently at
var howMany = 1; //which question # (of 12) we're at to display on the screen

//object containing the questions
var questions = {
	ques: [
			'What House is Cedric Diggory In?',
			'What is the spell to unlock and open a door?',
			'What name did Hagrid give the dragon he was given in Book 1 The Sorcerers Stone?',
			"What is the name of Harry Potter's owl?",
			"What position in Quidditch did Harry play?",
			"What was the name of Albus Dumbledore's phoenix?",
			"What type of pet did Hermione have?",
			"What is the name of the Killing Curse?",
			"What is Voldemort's real name?",
			"Who is the Professor of Dark Arts in Book 2 (Chamber of Secrets)?",
			"What animal does Harry Potter's Patronus form?",
			"Who created the Sorcerer's Stone?"
			],

	choices:[
			['Gryffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff'],
	 		['Wingardium Leviosa', 'Alohomora', 'Expelliarmus', 'Open Seasame'],
	 		['Drogon', 'Norbert', 'Smaug', 'Snuff'],
	 		["Hedwig", "Pigwidgeon", "Olga", "Nyla"],
	 		["Beater", "Keeper", "Seeker", "He rode the bench"],
	 		["Fiero", "Magentus", "Chad", "Fawkes"],
	 		["Cat", "Frog", "Owl", "Mouse"],
	 		["Imperius", "Cruciatus", "Avada Kedavra", "Sectumsempra"],
	 		["John Puzzle", "Tom Riddle", "Jack Stumper", "Rick BrainTeaser"],
	 		["Horace Slughorn", "Remy Lupin", "Gilderoy Lockhart", "Quirinus Quirrell"],
	 		["Otter", "Stag", "Fox", "Dog"],
	 		["Albus Dumbledore", "Rufus Scrimgeour", "Ethan Bradbury", "Nicholas Flamel"]
	 		],

	answer: [
			'Hufflepuff',
			'Alohomora',
			'Norbert',
			"Hedwig",
			"Seeker",
			"Fawkes",
			"Cat",
			"Avada Kedavra",
			"Tom Riddle",
			"Gilderoy Lockhart",
			"Stag",
			"Nicholas Flamel"
			],

	image: [
			'assets/images/hufflepuff.jpeg',
			'assets/images/alohomora.jpeg',
			'assets/images/norbert.jpg',
			'assets/images/hedwig.jpg',
			'assets/images/seeker.jpg',
			'assets/images/fawkes.jpg',
			'assets/images/cat.png',
			'assets/images/avada.jpg',
			'assets/images/tomriddle.jpg',
			'assets/images/lockhart.jpg',
			'assets/images/stag.png',
			'assets/images/stone.jpg'
			]
	}

$(document).ready(function(){

	//click event for picking your choice
	function attachEvents() {
		$('.choices').on('click', function() {
			var yourAnswer = $(this).attr('data-name');
			console.log("i clicked: " + yourAnswer);

			if (yourAnswer === questions.answer[quesNumber]) {
				correctAnswer();

			} else {
				wrongAnswer();
			}
		});
	};
	attachEvents();

	//clicking start button starts Game
	$('#start').on('click', startGame);

	//start game, removes start button and displays timer + question
	function startGame() {
		$("#start").attr("style","display:none");
		reset();
		$("#timeLeft").html("Time Remaining: " + timeLeft + " seconds");
		$("#howMany").html("Question: " + howMany + " of 12")
		$("#final-results").empty();
		question(quesNumber);
	}

	//set the timer interval
	function timer(){	
		handler = setInterval(decrement, 1000);
	}

	//stops the timer but does not do anything else
	function pause() {
		clearInterval(handler);
	}

	//stops the timer and also calls the timeRunOut message
	function stop() {
		clearInterval(handler);
		timeRunOut(handler);
	}

	//reset timer to 12 seconds
	function reset() {
		timeLeft = 12;
		$("#timeLeft").html("Time Remaining: " + timeLeft + " seconds");
	}

	//decrease timer by 1
	function decrement() {
		timeLeft--;
		$("#timeLeft").html("Time Remaining: " + timeLeft + " seconds");
		if (timeLeft === 0){
			stop();
		}
	}

	//one question turn
	function question(num) {

		console.log(questions.ques[num]);
		console.log(questions.choices[num]);
		console.log(questions.answer[num]);

		//reset and initialize timer
		reset();
		timer();

		//empty the previous question info
		$("#answer").empty();
		$('.photo').empty();

		$(".question").html("<h2>"+ questions.ques[num]+"</h2>");
		
		$('.choices').show();

		//show questions on screen + create hover effect 
		$("#choice1").html(questions.choices[num][0]).hover(function(){
    		$(this).css("background-color", "red");
   		 	}, function(){
    			$(this).css("background-color", "transparent");
				});

		$("#choice2").html(questions.choices[num][1]).hover(function(){
    		$(this).css("background-color", "red");
   		 	}, function(){
    			$(this).css("background-color", "transparent");
				});
		$("#choice3").html(questions.choices[num][2]).hover(function(){
    		$(this).css("background-color", "red");
   		 	}, function(){
    			$(this).css("background-color", "transparent");
				});
		$("#choice4").html(questions.choices[num][3]).hover(function(){
    		$(this).css("background-color", "red");
   		 	}, function(){
    			$(this).css("background-color", "transparent");
				});

		//attribute question choice data to each choice 
		$('#choice1').attr('data-name', questions.choices[num][0]);
		$('#choice2').attr('data-name', questions.choices[num][1]);
		$('#choice3').attr('data-name', questions.choices[num][2]);
		$('#choice4').attr('data-name', questions.choices[num][3]);
		
		$("#howMany").html("Question: " + howMany + " of 12")
	}

	//if question is correct
	function correctAnswer() {
		$('.choices').empty().hide(); //hide() prevents hover effect from still working even when choices arent visibile
		$('.question').empty();

		$('#answer').html("<h2> Correct!");
		$('.photo').html('<img src="' + questions.image[quesNumber] + '" />');

		//increments
		howMany++;
		correct++;
		quesNumber++;
		console.log("correct: " + correct);
		console.log("quesNum: " + quesNumber);
		pause();

		//check if we're at the last question
		if (checkQuestions(quesNumber)){
			setTimeout(function(){
				gameOver();}, 4000);
		}
		else {
			setTimeout(function(){
				question(quesNumber);}, 4000);
		}
	}

	//if wrong answer
	function wrongAnswer() {
	
		$('.choices').empty().hide();
		$('.question').empty();
		$('#answer').html("<h2>Wrong! The correct answer is " + questions.answer[quesNumber] + ".");
		$('.photo').html('<img src="' + questions.image[quesNumber] + '" />');

		howMany++;
		incorrect++;
		quesNumber++;
		console.log("incorrect: " + incorrect);
		console.log("quesNum: " + quesNumber);

		pause();

		if (checkQuestions(quesNumber)){
			setTimeout(function(){
				gameOver();}, 4000);
		}
		else {
			setTimeout(function(){
				question(quesNumber);}, 4000);
		}	
	}

	//if user does not answer and timer runs out
	function timeRunOut() {
	
		$('.choices').empty().hide();
		$('.question').empty();
		$('#answer').html("<h2>Time's up! The correct answer is " + questions.answer[quesNumber] + ".");
		$('.photo').html('<img src="' + questions.image[quesNumber] + '" />');
	
		howMany++;
		unanswered++;
		quesNumber++;

		console.log("unanswered: " + unanswered);
		console.log("quesNum: " + quesNumber);
		
		pause();
	
		if (checkQuestions(quesNumber)){
			setTimeout(function(){
				gameOver();}, 4000);
		}
		else {
			setTimeout(function(){
				question(quesNumber);}, 4000);
		}
	}

	//function for if question is the last one 
	function checkQuestions(number){
		if (number >= questions.ques.length){
			return true;
		}
		else {
			return false;
		}
	}

	//game over empties everything, resets integer counter variables, and shows final stats
	function gameOver() {
		$('.choices').empty();
		$('.question').empty();
		$('#answer').empty();
		$("#timeLeft").empty();
		$("#howMany").empty();
		$('.photo').empty();

		$("#start").attr("style","display:inline");
		$(".question").append("<h2> Thanks for playing. Here's how you did.");
		$(".question").append("<h3> Correct: " + correct);
		$(".question").append("<h3> Incorrect: " + incorrect);
		$(".question").append("<h3> Unanswered: " + unanswered);
		$("#final-results").append("<h2> Play again? Press start!");
		quesNumber = 0;
		correct = 0;
		incorrect = 0;
		unanswered = 0;
		howMany = 1;
	}
});

