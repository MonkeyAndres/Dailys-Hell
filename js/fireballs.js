function Fireball (game, x, y, direction, mlg) {
    this.game = game;
    
    this.x = x;
    this.y = y;
    this.sX = 0;
    this.sY = 0;
    this.spinSpeed = 2.5;

    this.radius = 7;
    this.width = this.radius*2;
    this.height = this.radius*2;
    this.direction = direction;

    this.up = -100;
    this.left = -100;
    this.right = 100;
    this.down = 100;

    this.mlg = mlg;
    this.setMlgImg();

    this.setDirection();
}

Fireball.prototype.setMlgImg = function() {
    this.mlgImg = new Image();
    this.mlgImg.src = "images/mlgObjects/" + this.randomMlgObject();
    this.mlgImg.onload = () => this.mlgHeight = (this.width*3 / this.mlgImg.width) * this.mlgImg.height;
}

Fireball.prototype.setDirection = function() {
    switch(this.direction){
        case "up":
            this.sY = this.up;
            break;
        case "up-right":
            this.sY = this.up;
            this.sX = this.right;
            break;
        case "right":
            this.sX = this.right;
            break;
        case "down-right":
            this.sY = this.down;
            this.sX = this.right;
            break;
        case "down":
            this.sY = this.down;
            break;
        case "down-left":
            this.sY = this.down;
            this.sX = this.left;
            break;
        case "left":
            this.sX = this.left;
            break;
        case "up-left":
            this.sY = this.up;
            this.sX = this.left;
    }
}

Fireball.prototype.draw = function(color) {
    if(this.mlg){
        this.mlgMode(color);
    } else {
        this.game.ctx.beginPath();
        this.game.ctx.fillStyle = color;
        this.game.ctx.arc(this.x + this.radius, this.y - this.radius, this.radius, 0, Math.PI*2);
        this.game.ctx.fill();
    }
}

Fireball.prototype.mlgMode = function(mode) {
    this.game.ctx.drawImage(this.mlgImg, this.x, this.y, this.width*3, this.mlgHeight);
}

Fireball.prototype.randomMlgObject = function() {
    var randObject = Math.floor(Math.random() * (mlgObjects.length));
    return mlgObjects[randObject];
}

Fireball.prototype.move = function(delta) {
    this.spinMe();
    this.x += this.sX * delta/1000;
    this.y += this.sY * delta/1000;
}

Fireball.prototype.spinMe = function() {
    switch(this.direction){
        case "up":
            this.sX += this.spinSpeed;
            break;
        case "up-right":
            this.sY += this.spinSpeed;
            this.sX += this.spinSpeed;
            break;
        case "right":
            this.sY += this.spinSpeed;
            break;
        case "down-right":
            this.sY += this.spinSpeed;
            this.sX -= this.spinSpeed;
            break;
        case "down":
            this.sX -= this.spinSpeed;
            break;
        case "down-left":
            this.sY -= this.spinSpeed;
            this.sX -= this.spinSpeed;
            break;
        case "left":
            this.sY -= this.spinSpeed;
            break;
        case "up-left":
            this.sY -= this.spinSpeed;
            this.sX += this.spinSpeed;
    }
}

Fireball.prototype.checkOutRange = function() {
    if(this.x < 0 || this.x > window.innerWidth){
        return true;
    }
    if(this.y < 0 || this.y > window.innerHeight){
        return true;
    }
}

Fireball.prototype.checkCollisions = function(origin){
    if(origin == "player"){
        this.checkCollisionsEnemies();
    } else {
        this.checkCollisionsPlayer();
    }
}

Fireball.prototype.checkCollisionsEnemies = function(){
    var enemies = this.game.enemies;

    for(var i = 0; i < enemies.length; i++){
        if (this.x < enemies[i].x + enemies[i].width && this.x + this.width > enemies[i].x &&
            this.y < enemies[i].y + enemies[i].height && this.height + this.y > enemies[i].y) {
            
            if(enemies[i].life <= 0){
                clearInterval(enemies[i].interval); // Stop Pulses
                enemies[i].img.src = ""; // Delete IMG
            } else {
                enemies[i].life--;
            }

            // Delete fireball
            this.x = -10;
            this.y = -10;
        } else {
            if(enemies[i].life <= 0){
                clearInterval(enemies[i].interval); // Stop Pulses
                enemies[i].img.src = ""; // Delete IMG
            }
        }
    }     
}

Fireball.prototype.checkCollisionsPlayer = function(){
    var player = this.game.player;

    if (this.x < player.x + player.width && this.x + this.width > player.x &&
        this.y < player.y + player.height && this.height + this.y > player.y) {
        
        // Delete fireball
        this.x = -10;
        this.y = -10;

        this.game.player.life--;
        if(this.game.player.life <= 0) this.game.gameOver();
    }
}