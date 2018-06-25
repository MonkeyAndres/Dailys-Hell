function Pulse(game, x, y, origin) {
    this.game = game
    
    this.x = x;
    this.y = y;
    this.prevTime = 0;

    this.origin = origin;
    this.fireballs = [];

    this.generateFireballs();
    this.setColor();
}

Pulse.prototype.setColor = function() {
    if(this.origin == "player"){
        this.color = "red";
    } else {
        this.color = "blue";
    }
}

Pulse.prototype.generateFireballs = function() {
    var directions = ["up", "up-right", "right", "down-right", "down", "down-left", "left", "up-left"]
    for(d of directions){
        var fireball = new Fireball(this.game, this.x, this.y, d);
        this.fireballs.push(fireball);
    }
}

Pulse.prototype.draw = function() {
    for(f of this.fireballs){
        f.draw(this.color);
    }
}

Pulse.prototype.expand = function(delta) {
    for(var i = 0; i < this.fireballs.length; i++){
        this.fireballs[i].move(delta);
        if(this.fireballs[i].checkOutRange()){
            this.fireballs.splice(i, 1);
        }
    }
    // console.log(this.fireballs);
}