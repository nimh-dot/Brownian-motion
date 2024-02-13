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
    isCollision(x, y, r) {
        return r+this.radius > Math.sqrt(Math.pow(x-this.position.x, 2)+Math.pow(y-this.position.y, 2))  
    }
}