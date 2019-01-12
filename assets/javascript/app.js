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
	question: "Which film won Pixar's first Academy Award for Best Animated Feature?",
	answerList: ["Toy Story", "Finding Nemo", "Up", "Wall-E"],
	answer: 1
},{
	question: "Who directed Pixar's first three feature films?",
	answerList: ["Peter Docter", "Brad Bird", "John Lasseter", "Peter Sohn"],
	answer: 2
},{
	question: "Who voiced Sadness in 'Inside Out'?",
	answerList: ["Amy Poehler", "Phyllis Smith", "Mindy Kaling", "Phyllis Vance"],
	answer: 1
},{
	question: "Billy Crystal voices Mike Wazowski in 'Monster, Inc.' but what role did he originally turn down from Pixar?",
	answerList: ["Hopper", "Woody", "Marlin", "Buzz Lightyear"],
	answer: 3
},{
	question: "The voice of WALL-E, Ben Burtt, also voiced what other famous robot?",
	answerList: ["R2-D2", "Alpha 5", "C-3PO", "Astro Boy"],
	answer: 0
},{
	question: "Brad Bird directed which animated film prior to taking on 'The Incredibles'?",
	answerList: ["The Brave Little Toaster", "The Iron Giant", "Tarzan", "The Prince of Egypt"],
	answer: 1
},{
	question: "Pixar was originally a division of which studio?",
	answerList: ["Dreamworks", "Industrial Light & Magic", "Disney", "Lucasfilm"],
	answer: 3
},{
	question: "What is the name of the famour explorer from 'Up' that Carl looked up to as a boy?",
	answerList: ["Charles F. Muntz", "Chuck M. James", "Charlie Rose", "Carl Carlton"],
	answer: 0
},{
	question: "'A Bug's Life' was loosely based on what other film?",
	answerList: ["I Live in Fear", "Rashomon", "Seven Samurai", "Magneficent Seven"],
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