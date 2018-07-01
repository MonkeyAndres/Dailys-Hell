
// Change this file!!

var levels = [
    {'title': "Prework", 'enemies': 3},
    {'title': "Week 1", 'enemies': 3},
    {'title': "Week 2", 'enemies': 4},
    {'title': "Week 3", 'enemies': 4},
    {'title': "Week 4", 'enemies': 5},
    {'title': "Week 5", 'enemies': 5},
    {'title': "Week 6", 'enemies': 5},
    {'title': "Week 7", 'enemies': 6},
    {'title': "Week 8", 'enemies': 6},
    {'title': "Week 9", 'enemies': 6}
]

var difficultyLevels = [
    {'enemiesLife': 10, 'playerLife': 50, 'enemyShootingSpeed': 700}, // Hard 
    {'enemiesLife': 15, 'playerLife': 20,'enemyShootingSpeed': 500}, // Very Hard
    {'enemiesLife': 20, 'playerLife': 20, 'enemyShootingSpeed': 300}, // 1vs1
    {'enemiesLife': 25, 'playerLife': 20, 'noHeal': true, 'enemyShootingSpeed': 300}, // Hardcore
    {'enemiesLife': 10, 'playerLife': 99999, 'enemyShootingSpeed': 400}, // God
]

var enemies = [
    ["rover.png", "npm.png"],
    ["html.png", "css.png", "js.png"],
    ["bootstrap.png", "jquery.png", "sass.png", "flappy.png"],
    ["codewars.png"],
    ["node.png", "mongo.png", "express.png", "es6.png"],
    ["passport.png", "googlemaps.png", "ajax.png", "nodemailer.png", "heroku.png"], // Bug
    ["codewars.png", "lodash.png", "git.png"],
    ["typescript.png", "angular.png", "apirest.png"],
    ["codewars.png", "trello.png"],
    ["gabi.png", "beltran.png", "juan.png", "susana.png"]
]

var mlgObjects = ['dorito.png', 'mtndew.png', 'obeycap.png', 'glasses.png', 'illuminati.png', 'airhorn.png', 'doge.png'];

var soundPath = "./sounds/";
var sounds = [
    {id: "gameMenu", src: "titleScreen.mp3"},
    {id: "level1", src: "level1.mp3"},
    {id: "level2", src: "level2.mp3"},
    {id: "level3", src: "level3.mp3"},
    {id: "ending", src: "ending.mp3"}
]