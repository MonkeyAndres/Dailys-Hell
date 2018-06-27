function Enemy(game, life){
    this.game = game;
    this.week = this.game.level;
    this.life = life;

    this.x = Math.floor(Math.random() * ((window.innerWidth-200) - 200)) + 200;
    this.y = 100;
    this.speedX = this.getRandomSpeed();
    this.speedY = this.getRandomSpeed();

    this.pulseArr = [];

    this.img = new Image();
    this.img.src = "images/enemies/"+this.getRandomEnemy();
    
    this.width = 50;
    this.img.onload = () => this.height = (this.width / this.img.width) * this.img.height;

    this.pulseTiming = 700;
    this.interval = setInterval(this.createPulse.bind(this), this.pulseTiming);
}

Enemy.prototype.getRandomSpeed = function() {
    return Math.floor(Math.random() * (100) - 40);
}

Enemy.prototype.getRandomEnemy = function(){
    var enemies = [
        ["rover.png", "npm.png"],
        ["html.png", "css.png", "js.png"],
        ["bootstrap.png", "jquery.png", "sass.png", "flappy.png"],
        ["codewars.png"],
        ["node.png", "mongo.png", "express.png", "es6.png"],
        ["passport.png", "googlemaps.png", "ajax.png", "nodemailer.png", "heroku.png"],
        ["codewars.png", "lodash.png", "git.png"],
        ["typescript.png", "angular.png", "apirest.png"],
        ["codewars.png", "trello.png"],
        ["gabi.png", "beltran.png", "juan.png", "susana.png"]
    ]

    var randomEnemy = Math.floor(Math.random() * (enemies[this.week].length));
    return enemies[this.week][randomEnemy];
}

Enemy.prototype.draw = function() {
    this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    
    for(p of this.pulseArr){
        p.draw();
    }
}

Enemy.prototype.move = function(delta) {
    this.x += this.speedX * delta/1000;
    this.y += this.speedY * delta/1000;

    this.bounceInLimits();

    for(p of this.pulseArr){
        p.expand(this.game.delta);
        this.clearEmptyPulses();
    }
}

Enemy.prototype.bounceInLimits = function() {
    if(this.x < 0 || this.x + this.width > window.innerWidth){
        this.speedX = -this.speedX;
    }
    if(this.y < 0 || this.y + this.height > window.innerHeight){
        this.speedY = -this.speedY;
    }
}

Enemy.prototype.createPulse = function() {
    var pulseX = this.x+(this.width/2) - 10;
    var pulseY = this.y+(this.height/2) + 10;
    
    var pulse = new Pulse(this.game, pulseX, pulseY, "enemy");
    this.pulseArr.push(pulse);
}

Enemy.prototype.clearEmptyPulses = function() {
    for(var i = 0; i < this.pulseArr.length; i++){
        if(this.pulseArr[i].fireballs.length == 0){
            this.pulseArr.splice(i, 1);
        }
    }
}