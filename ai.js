let aiPlayers = [];
let xTraveled = 0;
let avgFitness = 0;
let generations = 0;
let cancel = false;
let aiLastObs = null;

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
    
    for (let i = 0; i < len-1; i++) {
        weights.push(Math.random());
    }
    
    weights.push(Math.random()*0.5)
    return weights;
}

async function testGeneration() {
    let fitnesses = new Array(aiPlayers.length).fill(0);
    xTraveled = 0;

    while (aiPlayers.length > 0) {
        if (cancel) { break; }
        xTraveled++;
        gameArea.updateSize();

        gameArea.context.rect(0, 0, gameArea.canvas.width, gameArea.canvas.height);
        gameArea.context.fillStyle = "#3d87ff";
        gameArea.context.fill();

        if (aiLastObs) {
            aiLastObs.update();
            aiLastObs.draw();
        }

        for (const obs of obstacles) {
            obs.update();
            obs.draw();

            if (obs.x < 0.15) {
                score++;
                aiLastObs = obstacles.splice(0, 1)[0];
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

            let curY = aiPlayer.y;
            let xToNext = obstacles[0].x - aiPlayer.x;
            let obsTop = obstacles[0].openingStart;
            let yVel = aiPlayer.yvel;

            let inf = aiPlayer.brain.inference([curY, xToNext, obsTop, yVel]);
            console.log([curY, xToNext, obsTop, yVel])

            if (inf === 1) {
                aiPlayer.jump();
            }
        }

        gameArea.context.fillStyle = "black";
        gameArea.context.font = "50px Arial";
        gameArea.context.fillText(`Score: ${xTraveled}`, 10, 50);

        await new Promise(resolve => setTimeout(resolve, 20));
    }

    return fitnesses;
}

async function runSimulation(mutRate) {
    document.getElementById("generations").innerText = `Total Generations: ${xTraveled}`;
    let fitnesses = await testGeneration();

    while(true) {
        if (cancel) { break; }
        generations++;
        document.getElementById("generations").innerText = `Total Generations: ${xTraveled}`;

        console.log(fitnesses);
        fitnesses = testGeneration();
    }
}

function aiStart(popSize, mutRate, hiddenLayers) {
    hiddenLayers = parseInt(hiddenLayers);
    popSize = parseInt(popSize);
    cancel = false;

    for (let i = 0; i < popSize; i++) {
        hiddenWeights = [];
        for (let j = 0; j < hiddenLayers; j++) {
            hiddenWeights.push(generateRandomWeights(5));
        }

        aiPlayers.push(new AIPlayer(new NeuralNetwork(4, hiddenLayers, hiddenWeights, generateRandomWeights(hiddenLayers+1))));
        aiPlayers[i].draw();
    }
    
    obstacles = [new Obstacle(1, (Math.random()*0.5)+0.25, 0.25, 0.05, 0.005)];
    if (updateFunction) {
        clearInterval(updateFunction);
    }

    generations = 1;
    runSimulation(mutRate);
}