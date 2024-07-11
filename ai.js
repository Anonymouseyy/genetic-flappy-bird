let aiPlayers = [];
let xTraveled = 0;
let avgFitness = 0;
let generations = 0;
let cancel = false;

class AIPlayer {
    constructor(brain) {
        this.x = 0.2;
        this.y = 0.5;
        this.yvel = 0;
        this.radius = 0.05;
        this.dead = false;
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

    update() {
        this.yvel += 0.000002;
        this.y += this.yvel*gameArea.canvas.height;
    }

    jump() {
        this.yvel = -0.000015;
    }

    getCircle() {
        return {x:this.x * gameArea.canvas.width, y:this.y * gameArea.canvas.height, r:this.radius * gameArea.canvas.height}
    }
}

function generateRandomWeights(len) {
    weights = [];
    
    for (let i = 0; i < len; i++) {
        weights.push(Math.random());
    }
    
    return weights;
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

function testGeneration() {
    let fitnesses = new Array(aiPlayers.length).fill(0);
    xTraveled = 0;

    while (aiPlayers.length > 0) {
        if (cancel) { break; }
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
        for (let i = 0; i < aiPlayers.length; i++) {
            let aiPlayer = aiPlayers[i];
            if (aiPlayer.dead) { continue; }

            aiPlayer.update();
            aiPlayer.draw();

            let playerCircle = aiPlayer.getCircle();
            if (rectCircleColliding(playerCircle, obsRects[0]) || rectCircleColliding(playerCircle, obsRects[1]) || aiPlayer.y < aiPlayer.radius || aiPlayer.y > 1-aiPlayer.radius) {
                aiPlayers.dead = true;
                fitnesses[i] = xTraveled;
            }
        }

        gameArea.context.fillStyle = "black";
        gameArea.context.font = "50px Arial";
        gameArea.context.fillText(`Score: ${xTraveled}`, 10, 50);
        sleep(20);
    }

    return fitnesses;
}

function runSimulation(mutRate) {
    document.getElementById("generations").innerText = `Total Generations: ${totalGenerations}`;
    let fitnesses = testGeneration();

    while(true) {
        if (cancel) { break; }
        generations++;
        document.getElementById("generations").innerText = `Total Generations: ${totalGenerations}`;

        console.log(fitnesses);
        fitnesses = testGeneration();
    }
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

    generations = 1;
    runSimulation(mutRate);
}