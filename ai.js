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