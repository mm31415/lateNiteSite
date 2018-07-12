
document.addEventListener("DOMContentLoaded", () => {
  const home = new Home();
  home.draw();
});

class Home {
  constructor(){
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    const aboutSection = document.getElementById("about");
    canvas.setAttribute("width", aboutSection.clientWidth);
    canvas.setAttribute("height", aboutSection.clientHeight);

    const numStars = (aboutSection.clientWidth + aboutSection.clientHeight) / 8;
    this.stars = [];
    for(let i = 0; i <= numStars; i++) {
      this.stars.push(new Star({ x: aboutSection.clientWidth, y: aboutSection.clientHeight }));
    }

    this.draw = this.draw.bind(this);
  }

  draw() {
    this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
    this.drawBackground();
    this.drawStars();

    requestAnimationFrame(this.draw);
  }

  drawBackground() {
    this.ctx.fillStyle = "rgb(0, 30, 22)";
    this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);
  }

  drawStars() {
    this.stars.forEach((star) => {
      star.draw(this.ctx);
    });
  }

}

class Star {
  constructor(props) {
    this.x = Math.random() * (props.x - 5) + 5;
    this.y = Math.random() * (props.y - 5) + 5;
    this.radius = 1;
    this.brightness = 0;
    this.change = Math.random() * (0.012 - 0.01) + 0.01;

    this.draw = this.draw.bind(this);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);

    //ctx.fillStyle = `rgb(255, 250, 0, ${this.brightness})`;
    ctx.fillStyle = `rgb(255, 255, 0, ${this.brightness})`;
    ctx.fill();

    this.changeBrightness();
  }

  changeBrightness() {
    if (this.brightness + this.change < -0.3) {
      this.change *= -1;
    } else if (this.brightness + this.change > 1.4) {
      this.change *= -1;
    }

    this.brightness += this.change;
  }

  randomX(){

  }

  randomY(){

  }

}
