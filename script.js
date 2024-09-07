const questions = [
  {
    question: "Which is largest animal in the world?",
    answers: [
      {
        text: "Shark",
        correct: false,
      },
      {
        text: "Blue whale",
        correct: true,
      },
      {
        text: "Elephant",
        correct: false,
      },
      {
        text: "Giraffe",
        correct: false,
      },
    ],
  },

  {
    question: "Which is the smallest country in the world?",
    answers: [
      {
        text: "Vatican",
        correct: true,
      },
      {
        text: "Bhutan",
        correct: false,
      },
      {
        text: "Nepal",
        correct: false,
      },
      {
        text: "Shri Lanka",
        correct: false,
      },
    ],
  },
  {
    question: "Which is the largest desert in the world?",
    answers: [
      {
        text: "Kalahari",
        correct: false,
      },
      {
        text: "Gobi",
        correct: false,
      },
      {
        text: "Sahara",
        correct: false,
      },
      {
        text: "Antarctic Desert",
        correct: true,
      },
    ],
  },
  {
    question: "Which is smallest continent in the world",
    answers: [
      {
        text: "Asia",
        correct: false,
      },
      {
        text: "Australia",
        correct: true,
      },
      {
        text: "Arctic",
        correct: false,
      },
      {
        text: "Africa",
        correct: false,
      },
    ],
  },
];

const questionElement = document.querySelector("#question");
const answerBtns = document.querySelector("#answers");
const NextBtn = document.querySelector("#next_btn");

let currentQuesIndex = 0;
let score = 0;

function startQuiz() {
  currentQuesIndex = 0;
  score = 0;
  NextBtn.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuest = questions[currentQuesIndex];
  let questionNo = currentQuesIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuest.question;

  currentQuest.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn_answer");
    answerBtns.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  NextBtn.style.display = "none";
  while (answerBtns.firstChild) {
    answerBtns.removeChild(answerBtns.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerBtns.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  NextBtn.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  NextBtn.innerHTML = "Play again";
  NextBtn.style.display = "block";
}

function handleNextBtn() {
  currentQuesIndex++;
  if (currentQuesIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

NextBtn.addEventListener("click", () => {
  if (currentQuesIndex < questions.length) {
    handleNextBtn();
  } else {
    startQuiz();
  }
});

startQuiz();
