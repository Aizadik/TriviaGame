// pseudo code
// shows only one question until the player answers it or their time runs out.
// If the player selects the correct answer, show a screen congratulating them for choosing the right option. After a few seconds, display the next question -- do this without user input.

// The scenario is similar for wrong answers and time-outs.


// If the player runs out of time, tell the player that time's up and display the correct answer. Wait a few seconds, then show the next question.
// If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. Wait a few seconds, then show the next question.


// On the final screen, show the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page).

var triviaGame = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 12,
    timerOn: false,
    timerId: '',
    // questions options and answers data
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
    }
}

//TO DO FUNCTION I NEED
// WRITE ALL