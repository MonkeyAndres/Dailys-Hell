var game;
var canvas;
var splashScreen;

function initParticles() {
    particlesJS.load('particles-js', 'particles-config.json', function() {
        console.log('callback - particles.js config loaded');
    });
}

function toggleParticles() {
    var particlesActive = pJSDom[0].pJS.particles.move.enable
    if(particlesActive){
        pJSDom[0].pJS.particles.move.enable = false;
    } else {
        pJSDom[0].pJS.particles.move.enable = true;
        pJSDom[0].pJS.fn.particlesRefresh();
    }
}

function startGame(event){
    var difficulty = event.currentTarget.id;

    splashScreen.style.display = "none";

    game = new Game(canvas, difficulty);
    window.requestAnimationFrame(updateGame);
}

function updateGame(time){
    game.update(time);
    window.requestAnimationFrame(updateGame);
}

window.onload = (event) => {
    canvas = document.getElementById("game-canvas");
    splashScreen = document.getElementById("splash-screen");
    var pressEnterText = document.getElementById("pressEnterText");
    var difficultyContainer = document.getElementById("difficulty-container");

    var difficulties = document.getElementsByTagName('article');
    var difficultiesArr = [].slice.call(difficulties);

    var disableParticles = document.getElementById("disableParticles");

    // var audio = new Audio('sounds/level1.mp3');
    // audio.loop = true;
    // audio.play();

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    initParticles();

    disableParticles.addEventListener('click', (event) => {
        event.preventDefault();
        toggleParticles();
    })

    window.addEventListener('keydown', (event) => {
        if(event.code == "Space") {
            event.preventDefault();
            difficultyContainer.style.display = "flex"
            pressEnterText.style.display = "none";
        }
    })

    for(d of difficultiesArr){
        d.addEventListener('click', startGame);
    }
}