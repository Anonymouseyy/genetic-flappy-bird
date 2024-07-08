let obstacles = [];
let score = 0;

function updateCanvas() {
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
        restart();
    }

    player.update();
    player.draw(); 

    gameArea.context.fillStyle = "black";
    gameArea.context.font = "50px Arial";
    gameArea.context.fillText(`Score: ${score}`, 10, 50);
}

let gameArea = {
    canvas : document.getElementById("canv"),
    start : function() {
        this.canvas.width = document.documentElement.clientWidth * 0.9;
        this.canvas.height = document.documentElement.clientHeight * 0.8;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateCanvas, 20);
        document.addEventListener("keydown", function (e) {
            if (e.code === "Space") {
                player.jump();
            }
        });
    },
    updateSize : function() {
        this.canvas.width = document.documentElement.clientWidth * 0.9;
        this.canvas.height = document.documentElement.clientHeight * 0.8;
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
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
        this.center();
        score = 0;
    },
    update : function() {
        this.yvel += 0.000001;
        this.y += this.yvel*gameArea.canvas.height;
        
        if (this.y < this.radius || this.y > 1-this.radius) {
            this.dead();
        }
    },
    jump : function() {
        this.yvel = -0.000015;
    },
    getCircle : function() {
        return {x:this.x * gameArea.canvas.width, y:this.y * gameArea.canvas.height, r:this.radius * gameArea.canvas.height}
    }
}

class Obstacle {
    constructor(x, openingStart, opening, width, speed) {
        this.x = x;
        this.openingStart = openingStart;
        this.opening = opening;
        this.width = width;
        this.speed = speed;
    }

    draw() {
        gameArea.context.beginPath();
        gameArea.context.rect(this.x*gameArea.canvas.width, 0, this.width*gameArea.canvas.width, this.openingStart*gameArea.canvas.height);
        gameArea.context.rect(this.x*gameArea.canvas.width, (this.openingStart+this.opening)*gameArea.canvas.height, this.width*gameArea.canvas.width, gameArea.canvas.height);
        gameArea.context.fillStyle = "#12b300";
        gameArea.context.fill();
        gameArea.context.stroke();
    }

    update() {
        this.x -= this.speed;
    }

    getRects() {
        return [{x:this.x*gameArea.canvas.width, y:0, w:this.width*gameArea.canvas.width, h:this.openingStart*gameArea.canvas.height}, 
            {x:this.x*gameArea.canvas.width, y:(this.openingStart+this.opening)*gameArea.canvas.height, w:this.width*gameArea.canvas.width, h:gameArea.canvas.height}];
    }
}

function rectCircleColliding(circle, rect){
    var distX = Math.abs(circle.x - rect.x-rect.w/2);
    var distY = Math.abs(circle.y - rect.y-rect.h/2);

    if (distX > (rect.w/2 + circle.r)) { return false; }
    if (distY > (rect.h/2 + circle.r)) { return false; }

    if (distX <= (rect.w/2)) { return true; } 
    if (distY <= (rect.h/2)) { return true; }

    var dx=distX-rect.w/2;
    var dy=distY-rect.h/2;
    return (dx*dx+dy*dy<=(circle.r*circle.r));
}

function start() {
    gameArea.start();
    player.center();
    player.draw();
    obstacles.push(new Obstacle(1, (Math.random()*0.5)+0.25, 0.25, 0.05, 0.005));
}

function restart() {
    player.dead();
    obstacles = [new Obstacle(1, (Math.random()*0.5)+0.25, 0.25, 0.05, 0.005)];
}


start();