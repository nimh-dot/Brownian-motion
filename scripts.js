const can = document.querySelector('canvas');
let width = window.innerWidth*0.8;
let height = window.innerHeight*0.8;
can.width = width;
can.height = height;

const canvas = can.getContext("2d");

let getRandomInt = (min, max) => {
    return ~~((max - min + 1)*Math.random()) + min;
}

let getColor = (value) => {
    return `rgb(${~~(value*51)}, ${255 - ~~(value*51)}, 0)`;
}

let radius = 15

// item ball
class Circle {
    constructor (x, y, radius, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.color = getColor(Math.max(Math.abs(dx), Math.abs(dy)));
    }
    draw() {
        canvas.beginPath();
        canvas.arc(this.x, this.y, this.radius + 1, 2*Math.PI, false);
        canvas.fillStyle = this.color;
        canvas.fill();
        
        this.update();
    }
    update() {
        if (this.x + radius > width || this.x - radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + radius> height || this.y - radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
    }
}

// create balls
let ballList = [];

for (let i=0; i<55; i++){
    ballList[i] = new Circle(
        getRandomInt(radius, width - radius), 
        getRandomInt(radius, height - radius), 
        radius, 
        getRandomInt(1, 5), 
        getRandomInt(1, 5));
}

// animate balls
const animate = () => {
    requestAnimationFrame(animate);
    canvas.clearRect(0,0,width,height);
    for (let ball of ballList) {
        ball.draw();
    }
}

animate();