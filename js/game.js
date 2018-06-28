function Game(canvas, difficulty){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    
    this.levels = levels;
    this.difficultyParams = difficultyLevels[difficulty];

    this.startStatus();
}

/**
 * TODO
 * Difficulties Speed Pulse
 * Music and Fancy stuff
 */

Game.prototype.update = function(time) {
    if(this.pause == false){
        this.clear();

        this.draw();

        this.delta = time - this.prevTime;
        this.prevTime = time;
        this.moveAll();
        
        this.clearEnemies();

        this.printStatus();
    }
}

Game.prototype.startStatus = function() {
    this.prevTime = 0;
    this.player = new Player(this);
    this.enemies = [];
    this.enemyCounter = 0;
    this.level = 0;
    this.pause = true;
    
    this.setLevel(this.level);
}

Game.prototype.clear = function() {
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.draw = function() {
    this.player.draw();
    for(e of this.enemies){
        e.draw();
    }
}

Game.prototype.moveAll = function() {
    this.player.move(this.delta)
    for(e of this.enemies){
        e.move(this.delta);
    }
}

Game.prototype.createEnemies = function(n) {
    for(var i = 0; i < n; i++){
        var life = getEnemyLife(this.difficultyParams);
        this.enemies.push(new Enemy(this, life));
    }
    this.enemyCounter = n;
}

Game.prototype.clearEnemies = function() {
    if(this.pause == true) return;
    for(var i = 0; i < this.enemies.length; i++){
        if(this.enemies[i].pulseArr.length == 0 && this.enemies[i].life == 0){
            this.enemies.splice(i, 1);
            this.enemyCounter--;
        }
    }

    if(this.enemies.length == 1 && this.enemies[0].life == 0) {
        this.player.stopPulse(); // Stop Player pulse
        this.enemyCounter = 0;
    };
    if(this.enemies.length == 0) this.nextLevel(); // Change Level
}

Game.prototype.printStatus = function() {
    var lifeStatus = "Life = "+this.player.life;
    this.ctx.fillStyle = "white";
    this.ctx.font = "30px Arcade Font";
    this.ctx.textAlign = "right";

    this.ctx.fillText(lifeStatus, this.canvas.width-10, 40);

    var lifeStatus = "Enemies = "+this.enemyCounter;
    this.ctx.fillText(lifeStatus, this.canvas.width-10, 80);
}

Game.prototype.nextLevel = function() {
    this.pause = true;
    this.clear();

    this.level++;
    this.setLevel();
}

Game.prototype.setLevel = function() {
    var level = this.levels[this.level];
    
    this.printText(level.title);
    this.createEnemies(level.enemies);

    this.setEnemyShootingSpeed();

    var playerLife = this.difficultyParams.playerLife; // Get life
    
    if(this.difficultyParams.noHeal && this.level != 0){ // No Heal Mode
        playerLife = this.player.life;
    } 
    this.player = new Player(this, playerLife); 
    

    setTimeout(() => {this.pause = false}, 2000);
}

Game.prototype.printText = function(text, subtext) {
    this.ctx.fillStyle = "white";
    this.ctx.font = "70px Arcade Font";
    this.ctx.textAlign = "center";
    this.ctx.fillText(text, this.canvas.width/2, this.canvas.height/2);

    if(subtext){
        this.ctx.font = "30px Arcade Font";
        this.ctx.fillText(subtext, this.canvas.width/2, this.canvas.height/2 + 70);
    }
}

Game.prototype.setEnemyShootingSpeed = function() {
    for(enemy of this.enemies){
        enemy.pulseTiming = this.difficultyParams.enemyShootingSpeed;
    }
}

Game.prototype.gameOver = function() { 
    this.pause = true;
    this.clear();
    this.enemies = [];
    this.level = 0;

    this.printText("GAME OVER", "Press Enter to Restart");
    this.addResetEvent();
}

Game.prototype.addResetEvent = function() {
    window.addEventListener('keypress', (event) => {
        if(event.key=="Enter"){
            window.location.reload();
        }
    });
}