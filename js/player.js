function Player(game) {
  this.game = game;
  this.life = 20;

  this.width = 50;
  this.height = 50;

  this.x = window.innerWidth / 2 - this.width;
  this.y = window.innerHeight / 2 - this.height;

  this.sX = 0;
  this.sY = 0;

  this.img = new Image();
  this.img.src = "images/player.png";

  this.setListeners(this);

  this.pulseArr = [];
  this.pulseTiming = 300
  setInterval(this.pulseAttack.bind(this), this.pulseTiming);
}

Player.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  for(p of this.pulseArr){
    p.draw();
  }
};

Player.prototype.move = function() {
  this.x += this.sX * this.game.delta/1000;
  this.y += this.sY * this.game.delta/1000;

  for(p of this.pulseArr){
    p.expand(this.game.delta);
  }  
  // console.log(this.x + " - " + this.y);
}

Player.prototype.makeMove = function(event) {
  switch (event.code) {
	  case "ArrowUp":
      this.sY = -200;
      break;
    case "ArrowDown":
      this.sY = 200;
      break;
    case "ArrowLeft":
      this.sX = -200;
      break;
    case "ArrowRight":
      this.sX = 200;
      break;
    // case "Space":
    //   this.pulseAttack();
  }
};

Player.prototype.pulseAttack = function() {
  this.clearEmptyPulses();

  var pulseX = this.x+(this.width/2) - 10;
  var pulseY = this.y+(this.height/2) + 10;

  var pulse = new Pulse(this.game, pulseX, pulseY, "player");
  this.pulseArr.push(pulse);
}

Player.prototype.clearEmptyPulses = function() {
  for(var i = 0; i < this.pulseArr.length; i++){
    if(this.pulseArr[i].fireballs.length == 0){
      this.pulseArr.splice(i, 1);
    }
  }
}

Player.prototype.stopMove = function(event) {
  switch (event.key) {
	  case "ArrowUp":
      this.sY = 0;
      break;
    case "ArrowDown":
      this.sY = 0;
      break;
    case "ArrowLeft":
      this.sX = 0;
      break;
    case "ArrowRight":
      this.sX = 0;
      break;
  }
}

Player.prototype.setListeners = function(that) {
  window.addEventListener('keydown', function(event){
    that.makeMove(event);
  })

  window.addEventListener('keyup', function(){
    that.stopMove(event);
  });
};
