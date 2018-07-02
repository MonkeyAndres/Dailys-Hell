function FinalBoss(game) {
    this.game = game;

    this.img = new Image();
    this.img.src = "images/enemies/finalBoss.png";

    this.life = 9999999;

    this.width = 100;
    this.img.onload = () => this.height = (this.width / this.img.width) * this.img.height;

    this.x = -200;
    this.y = -200;
    this.speedX = 200;
    this.speedY = 200;

    this.pulseArr = [];
    this.pulseTiming = 300;
    this.interval = setInterval(() => this.shoot(), this.pulseTiming);
    console.log(this);
}

FinalBoss.prototype.draw = function() {
    for(p of this.pulseArr){p.draw()}
    this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}

FinalBoss.prototype.move = function(delta) {
    this.x += this.speedX * delta/1000;
    this.y += this.speedY * delta/1000;

    this.bounceInLimits();

    for(p of this.pulseArr){
        p.expand(this.game.delta);
    }
}

FinalBoss.prototype.bounceInLimits = function() {
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

FinalBoss.prototype.shoot = function() {
    var pulseX = this.x+(this.width/2) - 10;
    var pulseY = this.y+(this.height/2) + 10;
    
    var pulse = new Pulse(this.game, pulseX, pulseY, "marc", true);
    this.pulseArr.push(pulse);
}