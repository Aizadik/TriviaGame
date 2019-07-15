$(document).ready(function() {

    //TODO FIX THE BUG TO NON-DISPLAY ANSERS WHEN NEW GUESTION STARTS!

    // event listeners
    $("#remaining-time").hide();
    $("#start-btn").on('click', triviaGame.startGame);
    $(document).on('click', '.option', triviaGame.guessChecker);

})

var triviaGame = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 12,
    timerOn: false,
    timerId: '',

    // questions options and answers 
    questions: {
        q1: 'In which country 2018 World Cup was placed?',
        q2: 'Which country has won the most World Cups in the history?',
        q3: 'Who is the highest paid soccer player in the world in 2019?',
        q4: 'How many hexagons are on a soccer ball?',
        q5: "If the last Fifa World Cup was organized in 2018, when is the next one going to take place?",
        q6: 'How many players are supposed to be in the game pitch during an official soccer game?',
        q7: "What is the total duration for soccer matches?"
    },
    options: {
        q1: ['Japan', 'China', 'Russia', 'France'],
        q2: ['USA', 'China', 'Brazil', 'Spain'],
        q3: ['Lionel Messi', 'Cristiano Ronaldo', 'Wayne Rooney', 'David Beckham'],
        q4: ['14', '22', '20', '25'],
        q5: ['2020', '2030', '2023', '2022'],
        q6: ['20', '22', '18', '16'],
        q7: ['60min', '90min', '120min', '30min']
    },
    answers: {
        q1: 'Russia',
        q2: 'Brazil',
        q3: 'Lionel Messi',
        q4: '20',
        q5: '2022',
        q6: '22',
        q7: '90min'
    },

    // method to initialize game
    startGame: function() {
        // restarting game results
        triviaGame.currentSet = 0;
        triviaGame.correct = 0;
        triviaGame.incorrect = 0;
        triviaGame.unanswered = 0;
        clearInterval(triviaGame.timerId);

        // show game section
        $('#game').show();

        //  empty last results
        $('#results').html('');

        // show timer
        $('#timer').text(triviaGame.timer);

        // remove start button
        $('#start-btn').hide();

        $('#remaining-time').show();

        // ask first question
        triviaGame.nextQuestion();

    },

    // method to loop through and display questions and options 
    nextQuestion: function() {
        $('#results').empty();
        // set timer to 12 seconds each question
        triviaGame.timer = 12;
        $('#timer').removeClass('last-seconds');
        $('#timer').text(triviaGame.timer);

        // to prevent timer speed up
        if (!triviaGame.timerOn) {
            triviaGame.timerId = setInterval(triviaGame.timerRunning, 1000);
        }

        // gets all the questions then indexes the current questions
        var questionContent = Object.values(triviaGame.questions)[triviaGame.currentSet];
        $('#question').text(questionContent);

        // an array of all the user options for the current question
        var questionOptions = Object.values(triviaGame.options)[triviaGame.currentSet];

        // creates all the triviaGame guess options in the html
        $.each(questionOptions, function(index, key) {
            $('#options').append($('<button class="option btn btn-info btn-lg">' + key + '</button>'));
        })

    },

    // method to decrement counter and count unanswered if timer runs out
    timerRunning: function() {

        // if timer still has time left and there are still questions left to ask
        if (triviaGame.timer > -1 && triviaGame.currentSet < Object.keys(triviaGame.questions).length) {
            $('#timer').text(triviaGame.timer);
            triviaGame.timer--;
            if (triviaGame.timer === 4) {
                $('#timer').addClass('last-seconds');
            }
        }

        // the time has run out and increment unanswered, run result
        else if (triviaGame.timer === -1) {
            triviaGame.unanswered++;
            triviaGame.result = false;
            clearInterval(triviaGame.timerId);
            resultId = setTimeout(triviaGame.guessResult, 1000);
            $('#results').html('<h4>Out of time! The answer was ' + Object.values(triviaGame.answers)[triviaGame.currentSet] + '</h4>');
        }

        // if all the questions have been shown end the game, show results
        else if (triviaGame.currentSet === Object.keys(triviaGame.questions).length) {

            // adds results of game (correct, incorrect, unanswered) to the page
            $('#results')
                .html('<p>Correct: ' + triviaGame.correct + '</p>' +
                    '<p>Incorrect: ' + triviaGame.incorrect + '</p>' +
                    '<p>Unanswered: ' + triviaGame.unanswered + '</p>');

            // hide game sction
            $('#game').hide();

            // show start button to begin a new game
            $('#start-btn').show();
        }

    },

    // method to evaluate the option clicked
    guessChecker: function() {

        // timer ID for gameResult setTimeout
        var resultId;

        // the answer to the current question being asked
        var currentAnswer = Object.values(triviaGame.answers)[triviaGame.currentSet];

        // if the text of the option picked matches the answer of the current question, increment correct
        if ($(this).text() === currentAnswer) {
            // turn button green for correct
            $(this).addClass('btn-success').removeClass('btn-info');

            triviaGame.correct++;
            clearInterval(triviaGame.timerId);
            resultId = setTimeout(triviaGame.guessResult, 1000);
            $('#results').html('<h4>Correct Answer!</h4>');
            $('#results');
        }
        // else the user picked the wrong option, increment incorrect
        else {
            // turn button clicked red for incorrect
            $(this).addClass('btn-danger').removeClass('btn-info');

            triviaGame.incorrect++;
            clearInterval(triviaGame.timerId);
            $('#results').html('<h4>Ups, incorrect answer' + '</h4>');
            resultId = setTimeout(triviaGame.guessResult, 1000);
        }

    },

    // method to remove previous question results and options
    guessResult: function() {

        // increment to next question set
        triviaGame.currentSet++;

        // remove the options and results
        $('.option').remove();
        $('#results h3').remove();

        // begin next question
        triviaGame.nextQuestion();

    }
}