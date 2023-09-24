//getting all required elements fitst time it apperas in the html with querySelector

const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .timer_sec");

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
};

let que_count = 0;
let que_numb = 1;
let counter; //timer
let timeValue = 15; //timer value

const next_btn = quiz_box.querySelector(".next_btn");

//if nect button is clicked

next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter); //reset timer each question
        startTimer(timeValue); //start time at timer value
    } else {
        console.log("Questions Complete!");
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
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    const allOptions = option_list.children.length;
    if (userAns == correctAns) {
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
}

//timer in game area

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--; //time up or down can choose -- or ++
    }
}








//Bottom counter in question area

function queCounter(index) {
    //creating a new span tag and passing the question number and total question
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQueCounTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}