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