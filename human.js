function humanStart() {
    player.center();
    player.draw();
    obstacles = [new Obstacle(1, (Math.random()*0.5)+0.25, 0.25, 0.05, 0.005)];

    if (updateFunction) {
        clearInterval(updateFunction);
    }

    updateFunction = setInterval(humanUpdateCanvas, 20);
}

function humanRestart() {
    player.dead();
    obstacles = [new Obstacle(1, (Math.random()*0.5)+0.25, 0.25, 0.05, 0.005)];

    if (updateFunction) {
        clearInterval(updateFunction);
    }
    updateFunction = setInterval(humanUpdateCanvas, 20);
}

let player = {
    x : 0.2,
    y : 0.5,
    yvel : 0,
    radius: 0.05,
    draw : function() {
        gameArea.context.beginPath();
        gameArea.context.arc(this.x * gameArea.canvas.width, this.y * gameArea.canvas.height, this.radius * gameArea.canvas.height, 0, 2 * Math.PI);
        gameArea.context.fillStyle = "#fff017";
        gameArea.context.fill();
        gameArea.context.stroke();
    },
    center : function() {
        this.y = 0.5;
        this.yvel = 0;
    },
    dead : function() {
        this.yvel = 0;
        this.center();
        score = 0;
    },
    update : function() {
        this.yvel += 0.000001;
        this.y += this.yvel*gameArea.canvas.height;
        
        if (this.y < this.radius || this.y > 1-this.radius) {
            humanRestart();
        }
    },
    jump : function() {
        this.yvel = -0.00002;
    },
    getCircle : function() {
        return {x:this.x * gameArea.canvas.width, y:this.y * gameArea.canvas.height, r:this.radius * gameArea.canvas.height}
    }
}

function humanUpdateCanvas() {
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
        obstacles.push(new Obstacle(1, (Math.random()*0.5)+0.25, 0.25, 0.05, 0.005 + score*0.000000001));
    }

    let obsRects = obstacles[0].getRects();
    let playerCircle = player.getCircle();
    if (rectCircleColliding(playerCircle, obsRects[0]) || rectCircleColliding(playerCircle, obsRects[1])) {
        humanRestart();
    }

    player.update();
    player.draw(); 

    gameArea.context.fillStyle = "black";
    gameArea.context.font = "50px Arial";
    gameArea.context.fillText(`Score: ${score}`, 10, 50);
}
