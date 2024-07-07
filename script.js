function updateCanvas() {
    gameArea.updateSize();

    gameArea.context.rect(0, 0, gameArea.canvas.width, gameArea.canvas.height);
    gameArea.context.fillStyle = "#3d87ff";
    gameArea.context.fill();

    player.update();
    player.draw();
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
    radius: 0.075,
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
    update : function() {
        this.yvel += 0.000001;
        this.y += this.yvel*gameArea.canvas.height;
        
        if (this.y < this.radius || this.y > 1-this.radius) {
            this.center();
        }
    },
    jump : function() {
        this.yvel = -0.00002;
    },
}

function start() {
    gameArea.start();
    player.center();
    player.draw();
}


start();