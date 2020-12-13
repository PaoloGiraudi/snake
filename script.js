const grid = document.querySelector(".grid");
const startStopBtn = document.querySelector(".btn");
const scoreSpan = document.querySelector(".score");
const root = document.querySelector(":root");
const toggle = document.querySelector(".switch");
const padButtons = document.querySelectorAll(".pad-button");
const gridWidth = 20;
const squares = [];
let snake = [5, 4, 3, 2, 1, 0];
let snakeDirection = 1;
let apple;
let score = 0;
let timeInterval = 500;
let speed = 0.95;
let moveTimer;

function createGrid() {
  for (let i = 0; i < gridWidth * gridWidth; i++) {
    let square = document.createElement("div");
    square.classList.add("square");
    grid.appendChild(square);
    squares.push(square);
  }
}
createGrid();

function drawSnake() {
  for (let piece of snake) {
    squares[piece].classList.add("snake");
  }
}
drawSnake();

function cancelSnakeApple() {
  for (let piece of snake) {
    squares[piece].classList.remove("snake");
  }
  squares[apple].classList.remove("apple");
}

function startGame() {
  cancelSnakeApple();
  clearInterval(moveTimer);
  snake = [5, 4, 3, 2, 1, 0];
  snakeDirection = 1;
  score = 0;
  timeInterval = 500;
  scoreSpan.textContent = score;
  drawSnake();
  generateApple();
  moveTimer = setInterval(moveSnake, timeInterval);
  console.log(timeInterval);
}

function moveSnake() {
  if (
    (snake[0] % gridWidth === gridWidth - 1 && snakeDirection === 1) ||
    (snake[0] % gridWidth === 0 && snakeDirection === -1) ||
    (snake[0] + gridWidth >= gridWidth * gridWidth &&
      snakeDirection === +gridWidth) ||
    (snake[0] - gridWidth < 0 && snakeDirection === -gridWidth) ||
    squares[snake[0] + snakeDirection].classList.contains("snake")
  ) {
    scoreSpan.textContent = "☠️";
    return clearInterval(moveTimer);
  }

  const tail = snake.pop();
  squares[tail].classList.remove("snake");
  snake.unshift(snake[0] + snakeDirection);
  squares[snake[0]].classList.add("snake");

  if (squares[snake[0]].classList.contains("apple")) {
    squares[apple].classList.remove("apple");
    squares[tail].classList.add("snake");
    snake.push(tail);
    drawSnake();
    generateApple();
    score++;
    scoreSpan.textContent = score;
    clearInterval(moveTimer);
    timeInterval = timeInterval * speed;
    moveTimer = setInterval(moveSnake, timeInterval);
  }
}

function generateApple() {
  do {
    apple = Math.floor(Math.random() * (gridWidth * gridWidth));
  } while (squares[apple].classList.contains("snake"));
  squares[apple].classList.add("apple");
}
generateApple();

function controlSnake(e) {
  if (e.keyCode === 37 || e.target.classList.contains("pad-left")) {
    snakeDirection = -1;
  } else if (e.keyCode === 38 || e.target.classList.contains("pad-up")) {
    snakeDirection = -gridWidth;
  } else if (e.keyCode === 39 || e.target.classList.contains("pad-right")) {
    snakeDirection = 1;
  } else if (e.keyCode === 40 || e.target.classList.contains("pad-down")) {
    snakeDirection = +gridWidth;
  }
}

function controlEx(e) {
  console.log(e);
}

function switchTheme() {
  root.classList.toggle("dark-mode");
}

document.addEventListener("keydown", controlSnake);
startStopBtn.addEventListener("click", startGame);
toggle.addEventListener("click", switchTheme);

padButtons.forEach((btn) => {
  btn.addEventListener("click", controlSnake);
});
