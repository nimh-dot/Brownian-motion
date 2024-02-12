export class Canvas {
    constructor (parentElement) {
        console.log(window.innerWidth*0.5)
        this.ctx = document.createElement('canvas');
        this.ctx.width = window.innerWidth <= 768 ? window.innerWidth - 40 : window.innerWidth*0.7;
        this.ctx.height = window.innerHeight*0.5;
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
    resize(width, height) {
        this.ctx.width = width;
        this.ctx.height = height;
        this.clear()
    }
}