function initParticles() {
}

window.onload = (event) => {
    var btn = document.getElementById("start-btn");
    var canvas = document.getElementById("game-canvas");

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    particlesJS.load('particles-js', 'particles-config.json', function() {
        console.log('callback - particles.js config loaded');
    });

    btn.addEventListener("click", (event) => {
        var splashScreen = document.getElementById("splash-screen");
        splashScreen.style.display = "none";

        var game = new Game(canvas);
        
        function update (time){
            game.update(time)
            window.requestAnimationFrame(update)
        };
        
        window.requestAnimationFrame(update)
    })
}