import { getColor, getRandomInt } from "./utils.js";

const speedRange = document.getElementById('speed'); 
const radiusRange = document.getElementById('radius'); 

const changeRadius = (ballList) => {
    const newRadius = Number(radiusRange.value);
    for (let ball of ballList) {
        ball.radius = newRadius;
    }
}

const changeSpeed = (ballList, trigger) => {
    const newSpeed = Number(speedRange.value);
    for (let ball of ballList) {
        ball.currentSpeed.dx = Math.sign(ball.currentSpeed.dx)*ball.baseSpeed.dx*(newSpeed/10);
        ball.currentSpeed.dy = Math.sign(ball.currentSpeed.dy)*ball.baseSpeed.dy*(newSpeed/10);

        if (trigger) {
            ball.color = getColor(Math.max(Math.abs(ball.currentSpeed.dx), Math.abs(ball.currentSpeed.dy)));
        }
    }
}

const setRandomColor = (ballList) => {
    for (let ball of ballList) {
        ball.color = `rgb(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)})`;
    }
}

const setGradientColor = (ballList) => {
    for (let ball of ballList) {
        ball.color = getColor(Math.max(Math.abs(ball.currentSpeed.dx), Math.abs(ball.currentSpeed.dy)));
    }
}

export {changeRadius, changeSpeed, setRandomColor, setGradientColor}