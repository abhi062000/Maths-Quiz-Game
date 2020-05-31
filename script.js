var playing = false;
var score;
var timeremaining;
var action;
var correctAnswer;

document.getElementsByClassName("startreset")[0].onclick = function () {
    if (playing) {
        // if we are playing then page must reload to start again the game
        location.reload();
    }
    else {
        playing = true;
        score = 0;
        timeremaining = 60;
        hide("gameover");
        document.getElementsByClassName("scorevalue")[0].innerHTML = score;
        show("timeremaining");
        document.getElementsByClassName("startreset")[0].innerHTML = "Reset Game";

        // Countdown

        // show("timeremaining");
        startCountdown();

        // generating question and answers
        generateQA();
    }
}

// when user clicks on box
for (var i = 1; i < 5; i++) {

    document.getElementsByClassName("box" + i)[0].onclick = function () {
        if (playing == true) {
            if (this.innerHTML == correctAnswer) {
                score++;
                document.getElementsByClassName("scorevalue")[0].innerHTML = score;
                hide("tryagain");
                show("correct");

                // show correct box for 1 sec 
                setTimeout(function () {
                    hide("correct");
                }, 1000)

                // generate new QA
                generateQA()

            }
            else {
                hide("correct");
                show("tryagain");

                // show correct box for 1 sec 
                setTimeout(function () {
                    hide("tryagain");
                }, 1000)
            }
        }

    }

}









function startCountdown() {
    action = setInterval(function () {
        timeremaining -= 1;
        document.getElementsByClassName("timeremainingvalue")[0].innerHTML = timeremaining;

        if (timeremaining <= 0) {
            stopCountdown();
            show("gameover");

            document.getElementsByClassName("gameover")[0].innerHTML = "<p>Game Over</p><p>Your Score is " + score + "</p>"

            hide("timeremaining");
            hide("correct");
            hide("tryagain");
            document.getElementsByClassName("startreset")[0].innerHTML = "Start Game";
            playing = false;
        }


    }, 1000)
}

function stopCountdown() {
    clearInterval(action);
}



function hide(className) {
    document.getElementsByClassName(className)[0].style.display = "none";
}
function show(className) {
    document.getElementsByClassName(className)[0].style.display = "block";
}


// QA
function generateQA() {

    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctAnswer = x * y;

    document.getElementsByClassName("question")[0].innerHTML = x + "x" + y;

    var correctPosition = 1 + Math.round(3 * Math.random());

    document.getElementsByClassName("box" + correctPosition)[0].innerHTML = correctAnswer;
    var answer = [correctAnswer];


    // displaying the answers into box
    for (var i = 1; i < 5; i++) {
        if (i != correctPosition) {
            var wrongAnswer;

            // for checking wrong answers are not same and is not equal to correct answer
            do {
                wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));
            } while (answer.indexOf(wrongAnswer) > -1);

            answer.push(wrongAnswer);

            document.getElementsByClassName("box" + i)[0].innerHTML = wrongAnswer;
        }
    }

}