import { getColor } from "./utils.js";

export class Ball {
    constructor (x, y, radius, dx, dy) {
        this.color = getColor(Math.max(Math.abs(dx), Math.abs(dy)));
        this.radius = radius;
        this.position = { x: x, y: y };
        this.baseSpeed = { dx: dx, dy: dy };
        this.currentSpeed = { dx: this.baseSpeed.dx, dy: this.baseSpeed.dy }
    }

    update(width, height) {
        if (this.position.x + this.radius > width || this.position.x - this.radius < 0) {
            this.currentSpeed.dx = -this.currentSpeed.dx;
        }
        if (this.position.y + this.radius > height || this.position.y - this.radius < 0) {
            this.currentSpeed.dy = -this.currentSpeed.dy;
        }
        this.position = {
                            x: this.position.x + this.currentSpeed.dx, 
                            y: this.position.y + this.currentSpeed.dy
                        };
    }

    checkAndResolve(ball) {
        if (Math.abs(ball.position.x - this.position.x) < ball.radius + this.radius &&
            Math.abs(ball.position.y - this.position.y) < ball.radius + this.radius) {
                const tempSpeed = ball.currentSpeed;
                ball.currentSpeed = this.currentSpeed;
                this.currentSpeed = tempSpeed;
        }
    }
}