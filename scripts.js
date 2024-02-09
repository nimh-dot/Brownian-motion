import { getRandomInt, getColor } from './utils.js';
import { changeRadius, changeSpeed, setRandomColor, setGradientColor} from './control.js';
import { Canvas } from './Canvas.js';
import { Ball } from './Ball.js';

document.getElementById('speed').addEventListener('input', () => changeSpeed(ballList, gradientColorInput.checked));
document.getElementById('radius').addEventListener('input', () => changeRadius(ballList));
document.getElementById('number').addEventListener('input', () => numberOfBalls = Number(numberOfBallsRange.value));
document.getElementById('random').addEventListener('click', () => setRandomColor(ballList));
document.getElementById('gradient').addEventListener('click', () => setGradientColor(ballList));

const radiusRange = document.getElementById('radius'); 
const numberOfBallsRange = document.getElementById('number'); 
const gradientColorInput = document.getElementById('gradient'); 

let width = window.innerWidth*0.7;
let height = window.innerHeight*0.7;
let radius = Number(radiusRange.value);
let numberOfBalls = Number(numberOfBallsRange.value);

const canvasWrapper = document.getElementById('canvas-wrapper'); 
const canvas = new Canvas(canvasWrapper, width, height);

// create balls
let ballList = [];
for (let i=0; i<30; i++){
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
    for (let i = 0; i <= numberOfBalls; i++ ) {
        ballList[i].update(width, height);
        canvas.draw(ballList[i]);
    }
}

animate();
