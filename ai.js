let aiPlayers = [];
let xTraveled = 0;
let avgFitness = 0;
let generations = 0;

class AIPlayer {
    constructor(brain) {
        this.x = 0.2;
        this.y = 0.5;
        this.yvel = 0;
        this.radius = 0.05
        this.brain = brain;
    }
    
    draw() {
        gameArea.context.beginPath();
        gameArea.context.arc(this.x * gameArea.canvas.width, this.y * gameArea.canvas.height, this.radius * gameArea.canvas.height, 0, 2 * Math.PI);
        gameArea.context.fillStyle = "#fff017";
        gameArea.context.fill();
        gameArea.context.stroke();
    }

    center() {
        this.y = 0.5;
        this.yvel = 0;
    }

    dead() {
        this.center();
        score = 0;
    }

    update() {
        this.yvel += 0.000002;
        this.y += this.yvel*gameArea.canvas.height;
        
        if (this.y < this.radius || this.y > 1-this.radius) {
            this.dead();
        }
    }

    jump() {
        this.yvel = -0.000015;
    }

    getCircle() {
        return {x:this.x * gameArea.canvas.width, y:this.y * gameArea.canvas.height, r:this.radius * gameArea.canvas.height}
    }
}

function aiUpdateCanvas() {
    xTraveled++;
    gameArea.updateSize();

    gameArea.context.rect(0, 0, gameArea.canvas.width, gameArea.canvas.height);
    gameArea.context.fillStyle = "#3d87ff";
    gameArea.context.fill();

    for (const obs of obstacles) {
        obs.update();
        obs.draw();

        if (obs.x < -obs.width) {
            score++;
            obstacles.splice(0, 1);
        }
    }

    if (obstacles[obstacles.length-1].x <= 0.6) {
        obstacles.push(new Obstacle(1, (Math.random()*0.5)+0.25, 0.25, 0.05, 0.005));
    }

    let obsRects = obstacles[0].getRects();
    for (let aiPlayer of aiPlayers) {
        aiPlayer.update();
        aiPlayer.draw();

        let playerCircle = aiPlayer.getCircle();
        if (rectCircleColliding(playerCircle, obsRects[0]) || rectCircleColliding(playerCircle, obsRects[1])) {
            console.log("collision");
        }
    }

    gameArea.context.fillStyle = "black";
    gameArea.context.font = "50px Arial";
    gameArea.context.fillText(`Score: ${score}`, 10, 50);
}

function generateRandomWeights(len) {
    weights = [];
    
    for (let i = 0; i < len; i++) {
        weights.push(Math.random());
    }
    
    return weights;
}

function aiStart(popSize, mutRate, hiddenLayers) {
    for (let i = 0; i < popSize; i++) {
        hiddenWeights = [];
        for (let j = 0; j < hiddenLayers; j++) {
            hiddenWeights.push(generateRandomWeights(5));
        }

        aiPlayers.push(new AIPlayer(new NeuralNetwork(4, hiddenLayers, hiddenWeights, generateRandomWeights(hiddenLayers+1))));
        aiplayers[i].draw();
    }
    
    obstacles = [new Obstacle(1, (Math.random()*0.5)+0.25, 0.25, 0.05, 0.005)];
    if (updateFunction) {
        clearInterval(updateFunction);
    }

    updateFunction = setInterval(aiUpdateCanvas, 20);
}