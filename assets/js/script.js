const questions = [
    {
        question: "testing questions",
        answers: [
            { text: "shark", correct: false },
            { text: "test answer", correct: true },
            { text: "bear", correct: false },
            { text: "panda", correct: false },

        ]
    },
    {
        question: "testing questions 2 big animal with fur",
        answers: [
            { text: "shark", correct: false },
            { text: "test answer", correct: false },
            { text: "bear", correct: true },
            { text: "panda", correct: false },

        ]
    }
];

const questionElement = document.getElementById("questions");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
    });
}

startQuiz();
