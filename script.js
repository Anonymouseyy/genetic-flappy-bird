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
    },
}

gameArea.updateSize();

document.getElementById("start").addEventListener("click", function() {
    document.getElementById("generations").innerText = "Total Generations: 0";
    if (document.getElementById("ai").checked) {
        cancel = true;

        setTimeout(() => { 
            cancel = false; 
        }, 10);
        
        let popSize = document.getElementById("population").value;
        if (popSize > 5000) {
            popSize = 5000;
        } else if (popSize < 100) {
            popSize = 100;
        }

        let mutRate = document.getElementById("mutationRate").value;
        let hiddenLayerNodes = document.getElementById("hiddenLayerNodes").value;
        aiStart(popSize, mutRate, hiddenLayerNodes);
    } else {
        humanStart();
    }
});

document.getElementById("stop").addEventListener("click", function() {
    cancel = true;

    if (updateFunction) {
        clearInterval(updateFunction);
    }

    updateFunction = setInterval(gameArea.updateSize, 20);
});

gameArea.start();
updateFunction = setInterval(gameArea.updateSize, 20);
