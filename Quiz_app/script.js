const questions = {
  html: [
    { q: "HTML stands for?", o: ["Hyper Text Markup Language", "High Tool ML", "Home Tool ML"], a: 0 },
    { q: "HTML is a?", o: ["Programming", "Markup", "Database"], a: 1 },
    { q: "Image tag?", o: ["img", "image", "pic"], a: 0 },
    { q: "Link tag?", o: ["a", "href", "url"], a: 0 },
    { q: "List tag?", o: ["ul", "table", "div"], a: 0 }
  ],
  css: [
    { q: "CSS stands for?", o: ["Creative", "Cascading", "Computer"], a: 1 },
    { q: "Used for?", o: ["Logic", "Styling", "Database"], a: 1 },
    { q: "Color property?", o: ["font-color", "color", "fg"], a: 1 },
    { q: "Box model?", o: ["Margin", "Padding", "All"], a: 2 },
    { q: "ID selector?", o: [".", "#", "*"], a: 1 }
  ],
  java: [
    { q: "Java runs on?", o: ["JVM", "Browser", "OS"], a: 0 },
    { q: "Java is?", o: ["Compiled", "Interpreted", "Both"], a: 2 },
    { q: "OOP concept?", o: ["Loop", "Encapsulation", "Array"], a: 1 },
    { q: "Keyword?", o: ["this", "define", "let"], a: 0 },
    { q: "Extension?", o: [".java", ".js", ".py"], a: 0 }
  ],
  python: [
    { q: "Python is?", o: ["Low", "High", "Binary"], a: 1 },
    { q: "Print function?", o: ["print()", "echo()", "log()"], a: 0 },
    { q: "List symbol?", o: ["()", "[]", "{}"], a: 1 },
    { q: "Indentation?", o: ["Optional", "Mandatory", "Ignored"], a: 1 },
    { q: "Type?", o: ["Compiled", "Interpreted", "Both"], a: 2 }
  ]
};

let currentSet = [];
let index = 0;
let score = 0;
let timeLeft = 15;
let timer;

function startQuiz(topic) {
  currentSet = questions[topic];
  index = 0;
  score = 0;

  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("quiz-screen").classList.remove("hidden");
  loadQuestion();
}

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 15;

  document.getElementById("timer").textContent = `⏱ ${timeLeft}`;
  document.getElementById("feedback").textContent = "";
  document.getElementById("options").innerHTML = "";
  document.getElementById("next-btn").style.display = "none";

  const q = currentSet[index];
  document.getElementById("question").textContent = q.q;

  q.o.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(i);
    document.getElementById("options").appendChild(btn);
  });

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `⏱ ${timeLeft}`;

    if (timeLeft === 0) {
      clearInterval(timer);
      document.getElementById("feedback").textContent = "Opps Wrong ☹️";
      document.getElementById("feedback").className = "wrong";
      document.getElementById("next-btn").style.display = "block";
    }
  }, 1000);
}

function checkAnswer(i) {
  clearInterval(timer);
  const correct = currentSet[index].a;
  const feedback = document.getElementById("feedback");

  if (i === correct) {
    score++;
    feedback.textContent = "Well Done 🎉";
    feedback.className = "correct";
  } else {
    feedback.textContent = "Opps Wrong ☹️";
    feedback.className = "wrong";
  }

  document.getElementById("next-btn").style.display = "block";
}

function nextQuestion() {
  index++;
  if (index < currentSet.length) {
    loadQuestion();
  } else {
    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");
    document.getElementById("score-text").textContent =
      `Your Score: ${score} / ${currentSet.length}`;
  }
}

function goBack() {
  document.getElementById("result-screen").classList.add("hidden");
  document.getElementById("start-screen").classList.remove("hidden");
}
