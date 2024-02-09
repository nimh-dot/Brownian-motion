let width = window.innerWidth*0.7;
let height = window.innerHeight*0.7;

let getRandomInt = (min, max) => {
    return ~~((max - min + 1)*Math.random()) + min;
}

let getColor = (value) => {
    return `rgb(${~~(value*25)}, ${255 - ~~(value*25)}, 0)`;
}

const speedRange = document.getElementById('speed'); 
const radiusRange = document.getElementById('radius'); 
// const ballCountRange = document.getElementById('number'); 
const randomColorInput = document.getElementById('random'); 
const gradientColorInput = document.getElementById('gradient'); 

class Canvas {
    constructor (parentElement, width, height) {
        this.ctx = document.createElement('canvas');
        this.ctx.width = width;
        this.ctx.height = height;
        this.ctx.classList.add("canvas");
        parentElement.appendChild(this.ctx);
        this.canvas = this.ctx.getContext("2d");
    }

    draw(item) {
        this.canvas.beginPath();
        this.canvas.arc(item.position.x, item.position.y, item.radius + 1, 2*Math.PI, false);
        this.canvas.closePath();
        this.canvas.fillStyle = item.color;
        this.canvas.fill();
    }

    clear() {
        this.canvas.clearRect(0, 0, this.ctx.width, this.ctx.height)
    }
}

const canvasWrapper = document.getElementById('canvas-wrapper'); 
const canvas = new Canvas(canvasWrapper, width, height);

let radius = 10;


class Ball {
    constructor (x, y, radius, dx, dy) {
        this.color = getColor(Math.max(Math.abs(dx), Math.abs(dy)));
        this.radius = radius;
        this.position = { x: x, y: y };
        this.baseSpeed = { dx: dx, dy: dy };
        this.currentSpeed = { dx: this.baseSpeed.dx, dy: this.baseSpeed.dy }
    }

    update() {
        if (this.position.x + radius > width || this.position.x - radius < 0) {
            this.currentSpeed.dx = -this.currentSpeed.dx;
        }
        if (this.position.y + radius > height || this.position.y - radius < 0) {
            this.currentSpeed.dy = -this.currentSpeed.dy;
        }
        this.position = {x: this.position.x + this.currentSpeed.dx, y: this.position.y + this.currentSpeed.dy} ;
    }
}

const ball1  = new Ball(100, 200, radius, 3, 4);
canvas.draw(ball1);

// create balls
let ballList = [];

for (let i=0; i<5; i++){
    ballList[i] = new Ball (
        getRandomInt(radius, width - radius), 
        getRandomInt(radius, height - radius), 
        radius, 
        getRandomInt(1, 10), 
        getRandomInt(1, 10));
}

// animate balls
const animate = () => {
    requestAnimationFrame(animate);
    canvas.clear();
    for (let ball of ballList) {
        ball.update();
        canvas.draw(ball);
    }
}

animate();

const changeRadius = () => {
    const newRadius = Number(radiusRange.value);
    for (let ball of ballList) {
        ball.radius = newRadius;
    }
}

const changeSpeed = () => {
    const newSpeed = Number(speedRange.value);
    for (let ball of ballList) {
        ball.currentSpeed.dx = Math.sign(ball.currentSpeed.dx)*ball.baseSpeed.dx*(newSpeed/10);
        ball.currentSpeed.dy = Math.sign(ball.currentSpeed.dy)*ball.baseSpeed.dy*(newSpeed/10);

        if (gradientColorInput.checked) {
            ball.color = getColor(Math.max(Math.abs(ball.currentSpeed.dx), Math.abs(ball.currentSpeed.dy)));
        }
    }
}

randomColorInput.addEventListener('click', () => {
    for (let ball of ballList) {
        ball.color = `rgb(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)})`;
    }
});

gradientColorInput.addEventListener('click', () => {
    for (let ball of ballList) {
        ball.color = getColor(Math.max(Math.abs(ball.currentSpeed.dx), Math.abs(ball.currentSpeed.dy)));
    }
});
