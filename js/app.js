// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  this.sprite = "images/enemy-bug.png";
  this.x = x;
  this.y = y;
  this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // Multiplies any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x = this.x + this.speed * dt;

  if (this.x > 500) {
    this.x = -50;
    this.respawn();
  }
  this.checkCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Spawn the enemies with random speed after the first spawn
Enemy.prototype.respawn = function() {
  let randomSpeed = Math.random() * (4 - 2) + 2;
  this.speed = randomSpeed * 100;
};

// Check if the enemy has collided with the player
Enemy.prototype.checkCollision = function() {
  let yd = this.y - player.y;
  let xd = this.x - player.x;

  if (yd > -20 && yd < 20 && (xd > -50 && xd < 50)) {
    player.die();
  }
};

// The constructor for the player class
var Player = function(x, y) {
  this.sprite = "images/char-princess-girl.png";
  this.x = x;
  this.y = y;

  this.score = 0;
  this.renderScore();
};

// Draw the player on the screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update the game
Player.prototype.update = function(dt) {};

// Add score and respawn when the player reaches the river
Player.prototype.win = function() {
  this.score += 5;
  this.respawn();
  this.renderScore();
};

// Reduce score and respawn when the player collide with the enemies
Player.prototype.die = function() {
  this.score -= 5;
  this.respawn();
  this.renderScore();
};

// Respawn the player in a specific location
Player.prototype.respawn = function() {
  this.x = 200;
  this.y = 400;
};

// Show the score of the player
Player.prototype.renderScore = function() {
  let scoreString = "Your score: " + this.score.toString();
  document.querySelector("#score").innerHTML = scoreString;
};

// Handles the movement of the player 
Player.prototype.handleInput = function(key) {

  // Set the boundaries of the game
  const leftBorder = 0;
  const rightBorder = 400;
  const topBorder = 70;
  const bottomBorder = 400;

  if (key === "up") {
    if (this.y <= topBorder) this.win();
    else this.y -= 85;
  }
  if (key === "down") {
    if (this.y >= bottomBorder) this.y = this.y;
    else this.y += 85;
  }
  if (key === "left") {
    if (this.x <= leftBorder) this.x = this.x;
    else this.x -= 105;
  }
  if (key === "right") {
    if (this.x >= rightBorder) this.x = this.x;
    else this.x += 105;
  }
};

//Spawn enemies
let allEnemies = [];
let enemy;
for (let i = 0; i < 3; i++) {
  let x = 0;
  let y = 60;
  let speed = Math.floor(100 * (Math.random() * (8 - 2) + 2));
  enemy = new Enemy(x, y + 83 * i, speed);
  allEnemies.push(enemy);
}

// Create player
const player = new Player(200, 400);

// This listens for key presses and sends the keys to
// Player.handleInput() method
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
