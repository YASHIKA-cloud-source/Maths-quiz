let currentQuestion = {};
let score = 0;
let timeLeft = 10;
let timer;
let correctAnswer;

document.getElementById("start-btn").addEventListener("click", startQuiz);

function startQuiz() {
    document.getElementById("start-btn").style.display = "none";
    document.getElementById("quiz-box").style.display = "block";
    document.getElementById("result-box").classList.add("hide");
    score = 0;
    document.getElementById("points").textContent = score;
    loadQuestion();
}

function loadQuestion() {
    timeLeft = 10;
    document.getElementById("time").textContent = timeLeft;
    clearInterval(timer);
    timer = setInterval(countdown, 1000);

    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    let operations = ['+', '-', '*'];
    let op = operations[Math.floor(Math.random() * operations.length)];

    let questionText = `${num1} ${op} ${num2}`;
    correctAnswer = eval(questionText);

    document.getElementById("question").textContent = "What is " + questionText + "?";

    let options = [correctAnswer];
    while (options.length < 4) {
        let wrong = correctAnswer + Math.floor(Math.random() * 10 - 5);
        if (!options.includes(wrong)) options.push(wrong);
    }

    options.sort(() => Math.random() - 0.5);

    let optionsHTML = "";
    options.forEach(opt => {
        optionsHTML += `<button onclick="checkAnswer(${opt})">${opt}</button>`;
    });

    document.getElementById("options").innerHTML = optionsHTML;
}

function countdown() {
    timeLeft--;
    document.getElementById("time").textContent = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(timer);
        showResult();
    }
}

function checkAnswer(answer) {
    clearInterval(timer);
    if (answer === correctAnswer) {
        score++;
        document.getElementById("points").textContent = score;
    }
    loadQuestion();
}

function showResult() {
    document.getElementById("quiz-box").style.display = "none";
    document.getElementById("result-box").classList.remove("hide");
    document.getElementById("final-score").textContent = score;
}