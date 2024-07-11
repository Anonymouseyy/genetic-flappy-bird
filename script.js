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
    document.getElementById("generations").innerText = "Total Generations: 0";
    document.getElementById("avgFitness").innerText = "Average Fitness: 0%";
    if (document.getElementById("ai").checked) {
        cancel = true;

        setTimeout(() => { 
            cancel = false; 
        }, 10);
        
        let popSize = document.getElementById("population").value;
        let mutRate = document.getElementById("mutationRate").value;
        let hiddenLayerNodes = document.getElementById("hiddenLayerNodes").value;
        aiStart(popSize, mutRate, hiddenLayerNodes);
    } else {
        humanStart();
    }
});

document.getElementById("restart").addEventListener("click", function() {
    if (document.getElementById("ai").checked) {
        cancel = true;

        setTimeout(() => { 
            cancel = false; 
            document.getElementById("generations").innerText = "Total Generations: 0";
            document.getElementById("avgFitness").innerText = "Average Fitness: 0%";
        }, 10);
    } else {
        humanRestart();
    }
});

gameArea.start();