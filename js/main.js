window.onload = (event) => {
    var btn = document.getElementById("start-btn");
    var canvas = document.getElementById("game-canvas");

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    btn.addEventListener("click", (event) => {
        var splashScreen = document.getElementById("splash-screen");
        splashScreen.style.display = "none";

        var game = new Game(canvas);
        window.requestAnimationFrame(game.start.bind(game));
    })
}