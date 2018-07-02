function Enemy(game, life){
    this.game = game;
    this.week = this.game.level;
    
    this.initialLife = life;
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
    this.interval = setInterval(() => this.createPulse(), this.pulseTiming);
}

Enemy.prototype.getRandomSpeed = function() {
    return Math.floor(Math.random() * (100) - 40);
}

Enemy.prototype.getRandomEnemy = function(){
    var enemiesArr = enemies;

    var randomEnemy = Math.floor(Math.random() * (enemiesArr[this.week].length));
    return enemiesArr[this.week][randomEnemy];
}

Enemy.prototype.draw = function() {
    for(p of this.pulseArr){p.draw()}
    this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    this.drawLifeIndicator();
}

Enemy.prototype.drawLifeIndicator = function() {
    if(this.life > 0){
        var percentageOfLife = Math.floor(50*this.life)/this.initialLife;
        this.game.ctx.fillStyle = "green";
        this.game.ctx.strokeRect(this.x, this.y - 15, this.width, 10);
        this.game.ctx.fillRect(this.x, this.y - 15, percentageOfLife, 10);
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
        if(this.x < 0) this.x = 10
        else if(this.y + this.width > window.innerWidth) this.y = window.innerWidth-this.width;
        this.speedX = -this.speedX;
    }
    if(this.y < 0 || this.y + this.height > window.innerHeight){
        if(this.y < 0) this.y = 0;
        else if(this.y + this.height > window.innerHeight) this.y = window.innerHeight-this.height;
        this.speedY = -this.speedY;
    }
}

Enemy.prototype.createPulse = function() {
    if(this.game.pause) {return;}
    var pulseX = this.x+(this.width/2) - 10;
    var pulseY = this.y+(this.height/2) + 10;
    
    var pulse = new Pulse(this.game, pulseX, pulseY, "enemy", this.game.mlgMode);
    this.pulseArr.push(pulse);
}

Enemy.prototype.clearEmptyPulses = function() {
    for(var i = 0; i < this.pulseArr.length; i++){
        if(this.pulseArr[i].fireballs.length == 0){
            this.pulseArr.splice(i, 1);
        }
    }
}