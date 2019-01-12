var triviaQuestions = [{
	question: "In what year was Adventure Time first aired?",
	answerList: ["2000", "2003", "2010", "2014"],
	answer: 2
},{
	question: "What type of animal is Jake?",
	answerList: ["Platypus", "Dog", "Raptor", "Monkey"],
	answer: 1
},{
	question: "What do Finn and Jake live in?",
	answerList: ["A Tree", "A Submarine", "A house", "A Log Cabin"],
	answer: 0
},{
	question: "What kind of baby was Finn?",
	answerList: ["Stubborn", "Fussy", "Adorable", "Buff"],
	answer: 3
},{
	question: "What is the name of Finn's first crush?",
	answerList: ["Princess Candy Cane", "Princess Bubblegum", "Princess Pixie Stick", "Todd Jr."],
	answer: 1
},{
	question: "Who is Jake Going out with?",
	answerList: ["Jessica", "Gunther", "Lady Rainicorn", "The Ice Princess"],
	answer: 2
},{
	question: "Who else lives with Finn and Jake?",
	answerList: ["Thomas", "Peppermint Patty", "Ice King", "B-MO"],
	answer: 3
},{
	question: "Who is the most spoiled princess?",
	answerList: ["Princess Bubblegum", "Flame Princess", "Lumpy Space Princess", "Debra"],
	answer: 2
},{
	question: "Who do Finn and Jake always have to rescue the princesses from?",
	answerList: ["The Ice King", "Handsy Henry", "The Princess Burglar", "The Woodland Monster"],
	answer: 0
},{
	question: "Who is The Ice King's go-to penguin?",
	answerList: ["Jebediah", "Gunther", "Marlin", "Socrates"],
	answer: 1
},{
	question: "Whats the name of the 1000 year old Vampire that Finn befriends?",
	answerList: ["Vladimir", "Drac", "Marceline", "Jimminy"],
	answer: 2
},{
	question: "What is the name of the other Princess that Finn falls in love with later on?",
	answerList: ["Flame Princess", "Oceana Princess", "Lumpy Space Princess", "Princess Bubble Gum"],
	answer: 0
},{
	question: "Who is Heir to the Candy Kingdom?",
	answerList: ["Samantha", "Prince of Candydrop Lane", "Earl of Lemongrab", "Jester of Gingerbreadville"],
	answer: 2
},{
	question: "Who plays Finn in the alternate timeline?",
	answerList: ["Finina", "Cake", "Firtha", "Fiona"],
	answer: 3
},{
	question: "What year did the last episode of Finn and Jake Air?",
	answerList: ["2015", "2016", "2017", "2018"],
	answer: 2
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}