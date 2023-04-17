const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("start-btn");

// Taille d'une cellule
const cellSize = 20;

// Initialisation du jeu
let snake, fruit, gameInterval;

function startGame() {
  snake = new Snake();
  fruit = new Fruit();
  fruit.pickLocation();
  gameInterval = setInterval(gameLoop, 150);
}

// Fonction principale du jeu
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fruit.draw();
  snake.update();
  snake.draw();

  if (snake.eatFruit(fruit)) {
    fruit.pickLocation();
  }

  if (snake.checkCollision()) {
    clearInterval(gameInterval);
    alert("Game Over!");
  }
}

// Classe Snake
class Snake {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.xSpeed = cellSize
    this.ySpeed = 0;
    this.total = 0;
    this.tail = [];

  }

  update() {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    if (this.total > 0) {
      this.tail[this.total - 1] = { x: this.x, y: this.y };
    }
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x < 0) {
      this.x = canvas.width - cellSize;
    } else if (this.x > canvas.width - cellSize) {
      this.x = 0;
    }

    if (this.y < 0) {
      this.y = canvas.height - cellSize;
    } else if (this.y > canvas.height - cellSize) {
      this.y = 0;
    }
    if (
      this.x < 0 ||
      this.x > canvas.width - cellSize ||
      this.y < 0 ||
      this.y > canvas.height - cellSize
    ) {
      return true;
    }
  }

  draw() {
    
    // Dessiner la queue du serpent avec des couleurs dégradées
    for (let i = 0; i < this.tail.length; i++) {
      let gradient = ctx.createLinearGradient(
        this.tail[i].x,
        this.tail[i].y,
        this.tail[i].x + cellSize,
        this.tail[i].y + cellSize
      );
      gradient.addColorStop(0, "white");
      gradient.addColorStop(1, "black");
      for (let i = 0; i < this.tail.length; i++) {
        ctx.beginPath();
        ctx.arc(this.tail[i].x + cellSize/2, this.tail[i].y + cellSize/2, cellSize/2, 0, 2*Math.PI);
        ctx.fillStyle = "grey";
        ctx.fill();
      }
      (this.tail[i].x, this.tail[i].y, cellSize, cellSize);
    }

    // Dessiner la tête du serpent avec une couleur dégradée
    let headGradient = ctx.createLinearGradient(
      this.x,
      this.y,
      this.x + cellSize,
      this.y + cellSize
    );
    headGradient.addColorStop(0, "white");
    headGradient.addColorStop(1, "black");
    ctx.beginPath();
    ctx.arc(this.x + cellSize/2, this.y + cellSize/2, cellSize/2, 0, 2*Math.PI);
    ctx.fillStyle = "black";
    ctx.fill(); 

            // Dessiner les yeux du serpent
            ctx.fillStyle = "white";
            ctx.fillRect(this.x + cellSize / 5, this.y + cellSize / 5, cellSize / 5, cellSize / 5);
            ctx.fillRect(this.x + 3 * cellSize / 5, this.y + cellSize / 5, cellSize / 5, cellSize / 5);
            ;}

            
  changeDirection(direction) {
    switch (direction) {
      case "Up":
        if (this.ySpeed === 0) {
          this.xSpeed = 0;
          this.ySpeed = -cellSize;
        }
        break;
      case "Down":
        if (this.ySpeed === 0) {
          this.xSpeed = 0;
          this.ySpeed = cellSize;
        }
        break;
      case "Left":
        if (this.xSpeed === 0) {
          this.xSpeed = -cellSize;
          this.ySpeed = 0;
        }
        break;
      case "Right":
        if (this.xSpeed === 0) {
          this.xSpeed = cellSize;
          this.ySpeed = 0;
        }
        break;
    }
  }

  eatFruit(fruit) {
    if (this.x === fruit.x && this.y === fruit.y) {
      this.total++;
      return true;
    }
    return false;
  }

  checkCollision() {
    for (let i = 0; i < this.tail.length; i++) {
      if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
        return true;
      }
    }
    return false;
  }
}

// Classe Fruit
class Fruit {
  constructor() {
    this.x;
    this.y;
  }

  pickLocation() {
    this.x = Math.floor(Math.random() * (canvas.width / cellSize)) * cellSize;
    this.y = Math.floor(Math.random() * (canvas.height / cellSize)) * cellSize;
  }

  draw() {
    // Dessiner la pomme avec des coins arrondis
ctx.beginPath();
ctx.arc(fruit.x + cellSize/2, fruit.y + cellSize/2, cellSize/2, 0, 2*Math.PI);
ctx.fillStyle = "red";
ctx.fill();
  }
}

// Contrôle du clavier
window.addEventListener("keydown", (event) => {
  const direction = event.key.replace("Arrow", "");
  snake.changeDirection(direction);
});

// Bouton pour démarrer le jeu
startBtn.addEventListener("click", () => {
  if (gameInterval) {
    clearInterval(gameInterval);
  }
  startGame();
});
