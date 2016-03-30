var playersLives = 3;
var score = 0;
var allEnemies = [];

var renderScore = function() {
  ctx.fillStyle = "#ffffff";
  ctx.font = "20px Arial";
  var text = "Score: " + score + " " + "Lives: " + playersLives;
  ctx.fillText(text, 20, 80);

  if (playersLives === 0){
    ctx.fillStyle = 'red';
    ctx.font = "200px Arial";
    var text = "You DED!!!";
    ctx.fillText(text, 500, 600);
  }
}



// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png'; //, [0,0],[39,39],16,[0,1]);
    //this.x = 100;
    //this.y = 100;
  this.speed =  Math.floor(Math.random() *200);
  // Throw the monster somewhere on the screen randomly
  this.x =  Math.floor((Math.random() * 4) * 83);
  this.y = Math.floor((Math.random()  * 3 ) * 101);

  allEnemies.push(this);


};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
  if (this.x <= 550) {
    this.x += this.speed * dt;
  }else{
    this.x = -2;
  }

  if (
    player.x <= (this.x + 32)
    && this.x <= (player.x + 32)
    && player.y <= (this.y + 32)
    && this.y <= (player.y + 32)
  ) {
    --playersLives;
  }
    //reset();
    if ((playersLives) > 0 && (playersLives)< 3) {
      console.log('you have ' + playersLives + 'lives left');
    }
   else if ((playersLives) === 0){
      //Engine.reset();
      player.x = 200;
      player.y= 410;
     // console.log('GAME OVER!!!');
    }
  if ((playersLives) > 0 && (player.y <= 40)){
    ++score;
    player.y = 410;
    player.x = 200;
    //console.log(score);
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var bug = new Enemy();

//bug.update();
var bug2 = new Enemy();

//bug2.update();
var bug3 = new Enemy();
//bug3.update();


////player


var Player = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/char-boy.png';

  this.x = 200;
  this.y = 410;
  this.speed = 500;
};

//canvas.width = 505;
//canvas.height = 606;

//if (this.x <= 550) {
//  this.x += this.speed * dt;
//}else{
//  this.x = -2;
//}
Player.prototype.update = function(dt) {

    if((this.Mkey === 'down') && // Player holding down
      (this.y <= 550)) {
      this.y += this.speed * dt;
    }
    else {
        this.y = 500;
    }


    if  (this.Mkey === 'up'){  // Player holding up
        this.y -= this.speed * dt;

    }

    if (this.Mkey ==='left'){ // Player holding left
      this.x -= this.speed * dt;

    }
     if (this.Mkey === 'right') { // Player holding right
      this.x += this.speed * dt;

    }
    this.Mkey = 'kangaroo';

};

Player.prototype.handleInput = function(e){
  this.Mkey = e;
}


// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var player = new Player();
player.update();

 //This listens for key presses and sends the keys to your
 //Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);

},false);
document.addEventListener('keydown', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);

},false);
////http://stackoverflow.com/questions/12888584/is-there-a-way-to-tell-chrome-web-debugger-to-show-the-current-mouse-position-in
//javascript:document.onmousemove = function(e){var x = e.pageX;var y = e.pageY;e.target.title = "X is "+x+" and Y is "+y;};