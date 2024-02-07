const can = document.querySelector('canvas');
let width = window.innerWidth;
let height = window.innerHeight;
can.width = window.innerWidth;
can.height = height;

const canvas = can.getContext("2d");

let randomInt = (min, max) => {
    return ~~((max - min + 1)*Math.random()) + min;
}

let radius = 3

// item ball
class Circle {
    constructor (x, y, radius, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
    }
    draw() {
        canvas.beginPath();
        canvas.arc(this.x, this.y, 2*this.radius + 1, 2*Math.PI, false);
        canvas.strokeStyle ="red";
        canvas.stroke();
        
        this.update();
    }
    update() {
        if (this.x + radius > width || this.x - radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y > height || this.y < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
    }
}

// create balls
let ballList = [];

for (let i=0; i<25; i++){
    ballList[i] = new Circle(randomInt(radius, width), randomInt(radius, height), radius, randomInt(1, 15), randomInt(1, 15));
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