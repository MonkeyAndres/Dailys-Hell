function Game(canvas){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    this.reset();
}

Game.prototype.start = function(time) {
    this.clear();
    this.draw();

    // Create Enemies

    this.delta = time - this.prevTime;
    this.prevTime = time;
    this.moveAll();
    
    window.requestAnimationFrame(this.start.bind(this));
}

Game.prototype.reset = function() {
    /* Define:
    player
    enemies
    */
   this.prevTime = 0;
   this.player = new Player(this);
   this.enemy = new Enemy(this, 1);
}

Game.prototype.clear = function() {
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.draw = function() {
    this.player.draw();
    this.enemy.draw();
}

Game.prototype.moveAll = function() {
    // Execute every object move method
    this.player.move(this.delta)
    this.enemy.move(this.delta);
}