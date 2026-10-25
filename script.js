const copyButton = document.getElementById("copyCode");
const javaCode = document.getElementById("javaCode");
const runButton = document.getElementById("runDemo");
const output = document.getElementById("output");

// Copy the Java example
copyButton.addEventListener("click", async function () {
  try {
    await navigator.clipboard.writeText(javaCode.textContent);
    copyButton.textContent = "Copied!";
  } catch (error) {
    copyButton.textContent = "Copy unavailable";
  }

  setTimeout(function () {
    copyButton.textContent = "Copy Code";
  }, 2000);
});

// Display the expected Java console output.
// This displays the sample output; it does not compile Java in the browser.
runButton.addEventListener("click", function () {
  output.textContent =
    "Car starts with a key.\n" +
    "Bike starts with a button.\n" +
    "Vehicle stopped.";

  runButton.textContent = "Output Displayed ✓";
});

// Interactive quiz
const questions = [
  {
    question: "Which keyword declares an abstract class in Java?",
    options: ["A. private", "B. abstract", "C. static", "D. final"],
    answer: 1,
    explanation: "Correct! The abstract keyword declares an abstract class.",
  },
  {
    question: "Can we create an object directly from an abstract class?",
    options: [
      "A. Yes, always",
      "B. Only with static",
      "C. No",
      "D. Only with final",
    ],
    answer: 2,
    explanation: "Correct! An abstract class cannot be instantiated directly.",
  },
  {
    question: "Which keyword connects a class to an interface?",
    options: ["A. extends", "B. implements", "C. imports", "D. package"],
    answer: 1,
    explanation: "Correct! A class uses implements to implement an interface.",
  },
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("nextQuestion");
const scoreElement = document.getElementById("score");
const questionCount = document.querySelector(".question-count");

function loadQuestion() {
  const item = questions[currentQuestion];

  answered = false;
  questionElement.textContent = item.question;
  questionCount.textContent =
    "QUESTION " +
    String(currentQuestion + 1).padStart(2, "0") +
    " / " +
    String(questions.length).padStart(2, "0");

  optionsElement.innerHTML = "";
  feedbackElement.textContent = "";
  nextButton.hidden = true;

  item.options.forEach(function (option, index) {
    const button = document.createElement("button");
    button.className = "option";
    button.textContent = option;

    button.addEventListener("click", function () {
      checkAnswer(index, button);
    });

    optionsElement.appendChild(button);
  });

  scoreElement.textContent = "Score: " + score + " / " + questions.length;
}

function checkAnswer(selectedIndex, selectedButton) {
  if (answered) return;

  answered = true;

  const item = questions[currentQuestion];
  const buttons = optionsElement.querySelectorAll(".option");

  buttons.forEach(function (button, index) {
    button.disabled = true;

    if (index === item.answer) {
      button.classList.add("correct");
    }
  });

  if (selectedIndex === item.answer) {
    score++;
    feedbackElement.textContent = item.explanation;
  } else {
    selectedButton.classList.add("wrong");
    feedbackElement.textContent = "Not quite. " + item.explanation;
  }

  scoreElement.textContent = "Score: " + score + " / " + questions.length;
  nextButton.hidden = false;

  if (currentQuestion === questions.length - 1) {
    nextButton.textContent = "See Final Score";
  } else {
    nextButton.textContent = "Next Question →";
  }
}

nextButton.addEventListener("click", function () {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    questionElement.textContent =
      "Quiz completed! Your score is " +
      score +
      " out of " +
      questions.length +
      ".";

    optionsElement.innerHTML = "";
    questionCount.textContent = "COMPLETED";
    feedbackElement.textContent =
      score === questions.length
        ? "Excellent! You understand the basics of abstraction."
        : "Good effort! Review the examples and try again.";

    nextButton.textContent = "Try Again";
    nextButton.hidden = false;

    nextButton.onclick = function () {
      currentQuestion = 0;
      score = 0;
      nextButton.onclick = null;
      loadQuestion();
    };
  }
});

loadQuestion();
