//getting all required elements fitst time it apperas in the html with querySelector

const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const time_line = quiz_box.querySelector("header .time_line");
const timeOff = quiz_box.querySelector("header .timer_text");

const option_list = document.querySelector(".option_list");

//If start quiz button is clicked

start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); //show rules
};

exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //remove rules
};

continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //remove rules
    quiz_box.classList.add("activeQuiz"); //shows the quiz
    showQuestions(0);
    queCounter(1);
    startTimer(15); //timer start value
    startTimerLine(0); //timer line
};

let que_count = 0;
let que_numb = 1;
let counter; //timer
let counterLine;
let timeValue = 15; //timer value
let widthValue = 0; //timer width value
let userScore = 0; //Users score on results


const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box"); //Results section element
const restart_quiz = result_box.querySelector(".buttons .restart"); //Restart Quiz element selector
const quit_quiz = result_box.querySelector(".buttons .quit"); //quit quiz element selector

// Reload the window on quit button click
quit_quiz.onclick = () => {
    window.location.reload();

};

// Restart button on click reloads the quiz and resets timer and score.
restart_quiz.onclick = () => {
    result_box.classList.remove("activeResult");
    quiz_box.classList.add("activeQuiz");
    let que_count = 0;
    let que_numb = 1;
    let timeValue = 15; //timer value
    let widthValue = 0; //timer width value
    let userScore = 0; //Users score on results
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter); //reset timer each question
    startTimer(timeValue); //start time at timer value
    clearInterval(counterLine); //Counter Line
    startTimerLine(widthValue); //start counter line width
    next_btn.style.display = "none";  //next button hidden until answer selected
    timeOff.textContent = "Time Left"; // Sets timer text to time left on quiz restart.
};

//if next button is clicked

next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter); //reset timer each question
        startTimer(timeValue); //start time at timer value
        clearInterval(counterLine); //Counter Line
        startTimerLine(widthValue); //start counter line width
        next_btn.style.display = "none";  //next button hidden until answer selected
        timeOff.textContent = "Time Left"; // If time hits 0, Time left shown on next click.
    } else { // stops the timer and timeLine when answer selected. 
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("Questions Complete!");
        showResultBox();
    }
};


//getting questions and options from array by <!----> in the HTML

function showQuestions(index) {
    const que_text = document.querySelector(".que_text");

    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '<div class="option"><span> ' + questions[index].options[0] + ' </span></div>'
        + '<div class="option"><span>' + questions[index].options[1] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[2] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[3] + '</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;


    //sececting correct answer

    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }

}


function optionSelected(answer) {
    clearInterval(counter); //stops timer on answer select
    clearInterval(counterLine); //stops timer line on answer select
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;

    if (userAns == correctAns) {
        userScore += 1; //User Score
        console.log(userScore); //Logging user score to console
        answer.classList.add("correct");
        console.log("Answer is Correct");
    } else {
        answer.classList.add("incorrect");
        console.log("Answer is incorrect");

        //if answer is incorrect, show correct answer by selecting it
        for (let i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correctAns) {
                option_list.children[i].setAttribute("class", "option correct");
            }

        }
    }

    //once use has selected one answer disable all options
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }

    next_btn.style.display = "block";  //next button appears when answer selected
}

function showResultBox() {
    info_box.classList.remove("activeInfo"); //remove info
    quiz_box.classList.remove("activeQuiz"); //remove quiz
    result_box.classList.add("activeResult"); //shows the results
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 1) { // if user scored more than 2
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>and congrats! , You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if (userScore > 0) { // if user scored more than 1
        let scoreTag = '<span>and nice , You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else { // if user scored less than 1
        let scoreTag = '<span>and sorry , You got only <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

//timer in game area

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--; //time up or down can choose -- or ++
        if (time < 9) {//Unsure about this code with addZero??
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            timeCount.textContent = "00";

            // Change text on timer if time runs to 0.
            timeOff.textContent = "Time Off";

            // Selects correct answer when timer runs out and stops user selecting an answer.
            let correctAns = questions[que_count].answer;
            let allOptions = option_list.children.length;

            for (let i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correctAns) {
                    option_list.children[i].setAttribute("class", "option correct");
                }

            }
            for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");
            }

            next_btn.style.display = "block";  //next button appears when answer selected
        }
    }
}

//Line count down in game area - code copied from above

function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer() {
        time += 1;
        time_line.style.width = time + "px";
        if (time > 549) {
            clearInterval(counterLine);

        }
    }
}








//Bottom counter in question area

function queCounter(index) {
    //creating a new span tag and passing the question number and total question
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQueCounTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}