let obstacles = [];
let score = 0;
let updateFunction = null;

let gameArea = {
    canvas : document.getElementById("canv"),
    start : function() {
        this.canvas.width = document.documentElement.clientWidth * 0.9;
        this.canvas.height = document.documentElement.clientHeight * 0.8;
        this.context = this.canvas.getContext("2d");
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

gameArea.updateSize();

document.getElementById("start").addEventListener("click", function() {
    if (document.getElementById("ai").checked) {
        console.log("AI stuff");
    } else {
        humanStart();
    }
});

document.getElementById("restart").addEventListener("click", function() {
    if (document.getElementById("ai").checked) {
        console.log("AI stuff");
    } else {
        humanRestart();
    }
});

gameArea.start();