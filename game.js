const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let move = true;



class Platform {
    constructor() {
        this.x = 550;
        this.y = 600;
        this.width = 300;
        this.height = 20;
    }

    draw() {
        ctx.fillStyle = "cyan";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        if( move ) {
            document.addEventListener("mousemove", (event) => {
                let x = event.clientX;
                this.x = x - this.width / 2;
            });
        }
    }
}

class Obstacle {
    constructor() {
        this.x = 525;
        this.y = 100;
        this.width = 400;
        this.height = 30;
    }

    draw() {
        ctx.fillStyle = "gray";
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}


class Ball {
    constructor() {
        this.x = 700;
        this.y = 300;
        this.width = 30;
        this.height = 30;
    }

    draw() {
        if(this.y < (platform.y - this.width) && move) {
            this.y += 5;
        }
        
        if(this.y >= (platform.y - this.width) && this.y > (wall.y + this.width)) {  
            move = false;
        }
        if(this.y > (wall.y + this.width) && !move) {
            this.y -= 5;
        }

        if(this.y == (wall.y + this.width)) {
            move = true;
        }
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}


function resize() {
    const { innerWidth, innerHeight} = window;

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;
}

function render() {
    ctx.clearRect(0, 0, innerWidth, innerHeight)
    
    platform.draw();
    wall.draw();
    ball.draw();

    requestAnimationFrame(render);
}
requestAnimationFrame(render);

let platform = new Platform();
let wall = new Obstacle();
let ball = new Ball();

window.onload = resize;
window.addEventListener("resize", resize);