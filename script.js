const car = document.getElementById('car');
const obstacle = document.getElementById('obstacle');
const levelDisplay = document.getElementById('level');
const scoreDisplay = document.getElementById('score');
const backgroundMusic = document.getElementById('backgroundMusic');
const pauseButton = document.getElementById('pauseButton');
const resumeButton = document.getElementById('resumeButton');

let carPositionX = 180;
let carPositionY = 20;
let obstacleSpeed = 2;
let score = 0;
let level = 1;
let gamePaused = false;

backgroundMusic.play();

document.addEventListener('keydown', (e) => {
  if (gamePaused) return;
  if (e.key === 'ArrowLeft' && carPositionX > 0) {
    carPositionX -= 20;
  }
  if (e.key === 'ArrowRight' && carPositionX < 360) {
    carPositionX += 20;
  }
  if (e.key === 'ArrowUp' && carPositionY < 500) {
    carPositionY += 20;
  }
  if (e.key === 'ArrowDown' && carPositionY > 0) {
    carPositionY -= 20;
  }
  car.style.left = `${carPositionX}px`;
  car.style.bottom = `${carPositionY}px`;
});

function moveObstacle() {
  if (gamePaused) return;

  const obstaclePosition = parseInt(window.getComputedStyle(obstacle).top);
  const carRect = car.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  if (obstaclePosition > 600) {
    score += 10;
    scoreDisplay.textContent = score;
    obstacle.style.top = '-80px';
    obstacle.style.left = `${Math.floor(Math.random() * 360)}px`;

    if (score % 50 === 0) {
      level += 1;
      levelDisplay.textContent = level;
      obstacleSpeed += 1;
    }
  } else {
    obstacle.style.top = `${obstaclePosition + obstacleSpeed}px`;
  }

  // Collision detection
  if (
    carRect.left < obstacleRect.right &&
    carRect.right > obstacleRect.left &&
    carRect.top < obstacleRect.bottom &&
    carRect.bottom > obstacleRect.top
  ) {
    alert(`Game Over! Your score: ${score}`);
    resetGame();
  }

  requestAnimationFrame(moveObstacle);
}

function resetGame() {
  carPositionX = 180;
  carPositionY = 20;
  obstacleSpeed = 2;
  score = 0;
  level = 1;
  car.style.left = `${carPositionX}px`;
  car.style.bottom = `${carPositionY}px`;
  obstacle.style.top = '-80px';
  obstacle.style.left = '180px';
  scoreDisplay.textContent = score;
  levelDisplay.textContent = level;
}

pauseButton.addEventListener('click', () => {
  gamePaused = true;
  backgroundMusic.pause();
  pauseButton.disabled = true;
  resumeButton.disabled = false;
});

resumeButton.addEventListener('click', () => {
  gamePaused = false;
  backgroundMusic.play();
  pauseButton.disabled = false;
  resumeButton.disabled = true;
  moveObstacle(); // Resume the game loop
});

moveObstacle();
