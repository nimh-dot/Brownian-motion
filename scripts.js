const can = document.querySelector('canvas');
let width = window.innerWidth*0.7;
let height = window.innerHeight*0.7;
can.width = width;
can.height = height;

const canvas = can.getContext("2d");

const speedRange = document.getElementById('speed'); 
const radiusRange = document.getElementById('radius'); 
const randomColorInput = document.getElementById('random'); 
const gradientColorInput = document.getElementById('gradient'); 

let getRandomInt = (min, max) => {
    return ~~((max - min + 1)*Math.random()) + min;
}

let getColor = (value) => {
    return `rgb(${~~(value*25)}, ${255 - ~~(value*25)}, 0)`;
}

let radius = 10;

// item ball
class Circle {
    constructor (x, y, radius, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.baseDx = dx;
        this.baseDy = dy;
        this.dx = this.baseDx;
        this.dy = this.baseDy;
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
        if (this.y + radius > height || this.y - radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
    }
}

// create balls
let ballList = [];

for (let i=0; i<5; i++){
    ballList[i] = new Circle(
        getRandomInt(radius, width - radius), 
        getRandomInt(radius, height - radius), 
        radius, 
        getRandomInt(1, 10), 
        getRandomInt(1, 10));
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

const changeRadius = () => {
    const newRadius = Number(radiusRange.value);
    for (let ball of ballList) {
        ball.radius = newRadius;
    }
}

const changeSpeed = () => {
    const newSpeed = Number(speedRange.value);
    for (let ball of ballList) {
        ball.dx = Math.sign(ball.dx)*ball.baseDx*(newSpeed/10);
        ball.dy = Math.sign(ball.dy)*ball.baseDy*(newSpeed/10);

        if (gradientColorInput.checked) {
            ball.color = getColor(Math.max(Math.abs(ball.dx), Math.abs(ball.dy)));
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
        ball.color = getColor(Math.max(Math.abs(ball.dx), Math.abs(ball.dy)));
    }
});
