function Fireball (game, x, y, direction) {
    this.game = game;
    
    this.x = x;
    this.y = y;
    this.sX = 0;
    this.sY = 0;

    this.radius = 8;
    this.direction = direction;

    this.up = -150;
    this.left = -150;
    this.right = 150;
    this.down = 150;

    this.setDirection();
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
    this.game.ctx.beginPath();
    this.game.ctx.fillStyle = color;
    this.game.ctx.arc(this.x + this.radius, this.y - this.radius, this.radius, 0, Math.PI*2);
    this.game.ctx.fill();
}

Fireball.prototype.move = function(delta) {
    // console.log(this.x +" - "+this.y);
    this.x += this.sX * delta/1000;
    this.y += this.sY * delta/1000;
}

Fireball.prototype.checkOutRange = function() {
    if(this.x < 0 || this.x > window.innerWidth){
        return true;
    }
    if(this.y < 0 || this.y > window.innerHeight){
        return true;
    }
}