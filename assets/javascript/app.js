//declare variables
var timeLeft = 10;
var handler;
var inbetweenQues;
var userAnswer;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var quesNumber=0;
var i;
var answerKey;

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
	 		['Wingardium Leviosa', 'Alohomora', 'Expelliarmus', 'Lumos'],
	 		['Drogon', 'Norbert', 'Smaug', 'Snuff'],
	 		["Hedwig", "Pigwidgeon", "Errol", "Nyla"],
	 		["Beater", "Keeper", "Seeker", "He rode the bench"],
	 		["Fiero", "Magentus", "Ashner", "Fawkes"],
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
			]
	}

$(document).ready(function(){

	function attachEvents() {
		$('.choices').on('click', function() {
			var yourAnswer = $(this).data('name');

			if (yourAnswer === questions.answer[quesNumber]) {
				correctAnswer();
			} else {
				wrongAnswer();
			}
		});

		// //clicking start button starts Game
		// $('#start').on('click', startGame);
	};
	attachEvents();



		// //clicking start button starts Game
		// $('#start').on('click', startGame);
	// };

	//clicking start button starts Game
	$('#start').on('click', startGame);

	//start game, removes start button and displays timer + question
	function startGame() {
		$("#start").attr("style","display:none");
		reset();
		$("#timeLeft").html("Time Remaining: " + timeLeft + " seconds");
		$("#final-results").empty();
		//i++;
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

	function reset() {
		timeLeft = 10;
		$("#timeLeft").html("Time Remaining: " + timeLeft + " seconds");
	}

	function decrement() {
		timeLeft--;
		$("#timeLeft").html("Time Remaining: " + timeLeft + " seconds");
		if (timeLeft === 0){
			stop();
		}
	}

	function question(num) {

		console.log(questions.ques[num]);
		console.log(questions.choices[num]);
		console.log(questions.answer[num]);
		reset();
		timer();

		$("#answer").empty();
 
		$(".question").html("<h3>"+ questions.ques[num]+"</h3>");
		$("#choice1").html(questions.choices[num][0]);
		$("#choice2").html(questions.choices[num][1]);
		$("#choice3").html(questions.choices[num][2]);
		$("#choice4").html(questions.choices[num][3]);

		// $('#choice1').removeData('data-name', questions.choices[i-1][0]);
		// $('#choice2').removeData('data-name', questions.choices[i-1][1]);
		// $('#choice3').removeData('data-name', questions.choices[i-1][2]);
		// $('#choice4').removeData('data-name', questions.choices[i-1][3]);


		$('#choice1').attr('data-name', questions.choices[num][0]);
		$('#choice2').attr('data-name', questions.choices[num][1]);
		$('#choice3').attr('data-name', questions.choices[num][2]);
		$('#choice4').attr('data-name', questions.choices[num][3]);
		
		//answerKey = questions.answer[quesNumber];

		// $('.choices').on('click', function(){
		// 	userAnswer = $(this).attr('data-name');
			
		// 	if (userAnswer === answerKey) {
		// 		correctAnswer(i);
		// 	}
			
		// 	if (userAnswer !== answerKey){
		// 		wrongAnswer(i);
		// 	}
		// });

		// if (timeLeft === 0){
		// 	timeRunOut(i);
		// }	
	}


// $('#choice2').on('click', checkIfRight(i));
// $('#choice3').on('click', checkIfRight(i));
// $('#choice4').on('click', checkIfRight(i));


//$('#choice1').on('click', correctAnswer);
// function checkIfRight(i) {
// 	userAnswer = $(this).attr('data-name');
// 	if (userAnswer === questions.answer[i]) {
// 	correctAnswer();
// }
// else {
// 	wrongAnswer();
// }

// }

	function correctAnswer() {
		$('.choices').empty();
		$('.question').empty();
		$('#answer').text("Correct answer!");

		correct++;
		console.log("correct: " + correct);
		quesNumber++;
		console.log("quesNum: " + quesNumber);
		pause();
		
	
		if (checkQuestions(quesNumber)){
			setTimeout(function(){
				gameOver();}, 4000);
		}
		
		else {
			setTimeout(function(){
				question(quesNumber);}, 4000);
			// reset();
		}
	}

	function wrongAnswer() {
	
		$('.choices').empty();
		$('.question').empty();
		$('#answer').text("Wrong answer!");
	
		incorrect++;
		console.log("incorrect: " + incorrect);
		quesNumber++;

		console.log("quesNum: " + quesNumber);
		pause();

		if (checkQuestions(quesNumber)){
			setTimeout(function(){
				gameOver();}, 4000);
		}
		
		else {
			setTimeout(function(){
				question(quesNumber);}, 4000);
			// reset();
		}	
	}

	function timeRunOut() {
	
		$('.choices').empty();
		$('.question').empty();
		$('#answer').text("Time ran up!");
	
		unanswered++;
		console.log("unanswered: " + unanswered);
		quesNumber++;

		console.log("quesNum: " + quesNumber);
			pause();
	
		if (checkQuestions(quesNumber)){
			setTimeout(function(){
				gameOver();}, 4000);
		}
		
		else {
			setTimeout(function(){
				question(quesNumber);}, 4000);
			// reset();
		}
	}

	function checkQuestions(number){
		if (number >= questions.ques.length){
			return true;
		}
		else {
			return false;
		}
	}

	function gameOver() {
		$('.choices').empty();
		$('.question').empty();
		$('#answer').empty();
		$("#timeLeft").empty();
		$("#start").attr("style","display:inline");
		$(".question").append("<h3> Correct: " + correct);
		$(".question").append("<h3> Incorrect: " + incorrect);
		$(".question").append("<h3> Unanswered: " + unanswered);
		$("#final-results").append("<h4> Play again? Press start!");
		// $("#final-results").append("<button>Play again?");
		quesNumber = 0;
		correct = 0;
		incorrect = 0;
		unanswered = 0;


	}

//need some sort of setTimeout in between questions too , create a function for setTimeout to call
//need attr data to attribute the answer to each div. then, can use that to compare later on
});

