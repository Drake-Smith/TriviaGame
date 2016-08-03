var timeLeft = 10;
var handler;
var inbetweenQues;
var userAnswer;

var questions = {
	ques: ["What should hardwell say",
			"What's best school",
			"Whats best food"],
	choices:[["1-2-3 lets go", "drake", "LA i fuckin love u", "heyyy we want some pussaaay"],
	 		["ucla", "dickface", "usc", "dumb"],
	 		["poop", "sushi", "kid", "bro"]],
	answer: ["1-2-3 lets go",
			"usc",
			"sushi"],
	}
var answerKey;


$(document).ready(function(){


$('#start').on('click', startGame);

function startGame() {
	$("#start").attr("style","display:none");
	gameBegin()
}

function gameBegin() {
	//timeLeft = 5;
	//$("#clockWords").html("Time Remaining: ");
	$("#timeLeft").html("Time Remaining: " + timeLeft + " seconds");
	//setInterval(function(){timer()}, 1000);
	timer(timeLeft);
	question(0);
}

function timer(time){	
		handler = setInterval(decrement, 1000);

	}
function timesUp() {
	clearInterval(handler);
}

function decrement() {
		timeLeft--;
		$("#timeLeft").html("Time Remaining: " + timeLeft + " seconds");
		if (timeLeft == 0){
			timesUp();
		}

		}

function question(i) {

console.log(questions.ques[i]);
console.log(questions.choices[i]);
console.log(questions.answer[i]);
$("#answer").empty();
 // var a = $('#choice1');
 // var b = $('#choice2');
 // var c = $('#choice3');
 // var d = $('#choice4');
$(".question").html("<h3>"+ questions.ques[i]+"</h3>");
$("#choice1").html(questions.choices[i][0]);
$("#choice2").html(questions.choices[i][1]);
$("#choice3").html(questions.choices[i][2]);
$("#choice4").html(questions.choices[i][3]);

// $('#choice1').removeData('data-name', questions.choices[i-1][0]);
// $('#choice2').removeData('data-name', questions.choices[i-1][1]);
// $('#choice3').removeData('data-name', questions.choices[i-1][2]);
// $('#choice4').removeData('data-name', questions.choices[i-1][3]);


$('#choice1').attr('data-name', questions.choices[i][0]);
$('#choice2').attr('data-name', questions.choices[i][1]);
$('#choice3').attr('data-name', questions.choices[i][2]);
$('#choice4').attr('data-name', questions.choices[i][3]);


$('.choices').on('click', function(){
	userAnswer = $(this).attr('data-name');
	if (userAnswer === questions.answer[i]) {
	correctAnswer(i);
}
else if (userAnswer !== questions.answer[i]) {
	wrongAnswer(i);
}
else if (timesUp()){
	timeRunOut(i);
}
});
// $('#choice2').on('click', checkIfRight(i));
// $('#choice3').on('click', checkIfRight(i));
// $('#choice4').on('click', checkIfRight(i));
}

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

function correctAnswer(i) {
	$('.choices').empty();
	$('#answer').text("Correct answer!");
	setTimeout(function(){
		i++;
		question(i);}, 4000);


}
function wrongAnswer(i) {
	$('.choices').empty();
	$('#answer').text("Wrong answer!");
	setTimeout(function(){
		i++;
		question(i);}, 4000);
	
}
function timeRunOut(i) {
	$('.choices').empty();
	$('#answer').text("Time ran up!");
	setTimeout(function(){
		i++;
		question(i);}, 4000);
}




//need some sort of setTimeout in between questions too , create a function for setTimeout to call
//need attr data to attribute the answer to each div. then, can use that to compare later on

	
	


});

