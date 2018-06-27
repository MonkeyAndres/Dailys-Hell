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
    {'minEnemiesLife': 5, 'maxEnemiesLife': 10, 'playerLife': 50},
    {'minEnemiesLife': 10, 'maxEnemiesLife': 15, 'playerLife': 20},
    {'minEnemiesLife': 15, 'maxEnemiesLife': 20, 'playerLife': 20},
]

function getEnemyLife(index) {
    var minLife = difficultyLevels[index].minEnemiesLife;
    var maxLife = difficultyLevels[index].maxEnemiesLife;

    return Math.floor(Math.random() * (maxLife - minLife)) + minLife;
}