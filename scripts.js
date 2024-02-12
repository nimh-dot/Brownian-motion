import { getRandomInt } from './utils.js';
import { changeRadius, changeSpeed, setRandomColor, setGradientColor} from './control.js';
import { Canvas } from './Canvas.js';
import { Ball } from './Ball.js';

console.log(window.innerWidth*0.5);

document.getElementById('speed').addEventListener('input', () => changeSpeed(ballList, gradientColorInput.checked));
document.getElementById('radius').addEventListener('input', () => changeRadius(ballList));
document.getElementById('number').addEventListener('input', () => numberOfBalls = Number(numberOfBallsRange.value));
document.getElementById('random').addEventListener('click', () => setRandomColor(ballList));
document.getElementById('gradient').addEventListener('click', () => setGradientColor(ballList));

const radiusRange = document.getElementById('radius'); 
const numberOfBallsRange = document.getElementById('number'); 
const gradientColorInput = document.getElementById('gradient'); 

let radius = Number(radiusRange.value);
let numberOfBalls = Number(numberOfBallsRange.value);

const canvasWrapper = document.getElementById('canvas-wrapper'); 
const canvas = new Canvas(canvasWrapper);

// create balls
let ballList = [];
for (let i=0; i<30; i++){
    ballList[i] = new Ball (
        getRandomInt(radius, window.innerWidth*0.5 - radius), 
        getRandomInt(radius, window.innerHeight*0.5 - radius), 
        radius, 
        getRandomInt(1, 6), 
        getRandomInt(1, 6));
}

// animate balls
const animate = () => {
    requestAnimationFrame(animate);
    canvas.clear();
    for (let i = 0; i <= numberOfBalls; i++ ) {
        ballList[i].update(window.innerWidth <= 768 ? window.innerWidth - 40 : window.innerWidth*0.7, window.innerHeight*0.5);
        canvas.draw(ballList[i]);
    }
}

animate();

// resize window
window.addEventListener('resize', () => {
    canvas.resize(window.innerWidth <= 768 ? window.innerWidth - 40 : window.innerWidth*0.7, window.innerHeight*0.5);
})
