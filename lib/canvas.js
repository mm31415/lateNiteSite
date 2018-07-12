let reqAnimFrame = (
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) { window.setTimeout(callback, 1000 / 60) }
);


document.addEventListener("DOMContentLoaded", () => {
  const home = new Home();

  window.addEventListener("resize", () => {
    home.resize();
  });
  home.draw();
});



class Home {
  constructor(){
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.aboutSection = document.getElementById("about");
    this.canvas.setAttribute("width", this.aboutSection.clientWidth);
    this.canvas.setAttribute("height", this.aboutSection.clientHeight);

    const numStars = (this.aboutSection.clientWidth + this.aboutSection.clientHeight) / 8;
    this.stars = [];
    for(let i = 0; i <= numStars; i++) {
      this.stars.push(new Star({ x: this.aboutSection.clientWidth, y: this.aboutSection.clientHeight }));
    }

    this.draw = this.draw.bind(this);
    this.resize = this.resize.bind(this);
  }

  draw() {
    this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
    this.drawBackground();
    this.drawStars();

    reqAnimFrame(this.draw);
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

  resize(){
    this.canvas.setAttribute("width", this.aboutSection.clientWidth);
    this.canvas.setAttribute("height", this.aboutSection.clientHeight);

    const numStars = (this.aboutSection.clientWidth + this.aboutSection.clientHeight) / 8;
    this.stars = [];
    for(let i = 0; i <= numStars; i++) {
      this.stars.push(new Star({ x: this.aboutSection.clientWidth, y: this.aboutSection.clientHeight }));
    }
  }

}

class Star {
  constructor(props) {
    this.x = Math.random() * (props.x - 5) + 5;
    this.y = Math.random() * (props.y - 5) + 5;
    this.radius = 1;
    this.brightness = 0;
    this.change = Math.random() * (0.015 - 0.005) + 0.005;

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

}
