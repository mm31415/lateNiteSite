let reqAnimFrame = (
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) { window.setTimeout(callback, 1000 / 60) }
);


function canvasDrawer () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const homeSection = document.getElementById("home");

  const home = new Home(canvas, ctx, homeSection);

  window.addEventListener("resize", () => {
    home.resize();
  });
  home.draw();

  homeSection.addEventListener("mouseover", (e) => {
    homeSection.addEventListener("mousemove", (e) => {
      home.stars.forEach((star) => {
        if(Math.abs(e.clientX - star.x) <= 100 && Math.abs(e.clientY - star.y) <= 100) {
          star.change = 0.04;
          star.radius = 2.0;
        } else if (star.change > 0.03) {
          star.change = star.prevChange;
          star.radius = 1;
        }
      });

    });
  });

  canvas.addEventListener("mouseout", (e) => {
    home.stars.forEach((star) => {
        star.change = star.prevChange;
        star.radius = 1;
    });
  });

}


class Home {
  constructor(canvas, ctx, homeSection){
    this.canvas = canvas;
    this.ctx = ctx;
    this.homeSection = homeSection;
    this.canvas.setAttribute("width", this.homeSection.clientWidth);
    this.canvas.setAttribute("height", this.homeSection.clientHeight);

    const numStars = (this.homeSection.clientWidth + this.homeSection.clientHeight) / 6;
    this.stars = [];
    for(let i = 0; i <= numStars; i++) {
      this.stars.push(new Star({ x: this.homeSection.clientWidth, y: this.homeSection.clientHeight }));
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
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);
  }

  drawStars() {
    this.stars.forEach((star) => {
      star.draw(this.ctx);
    });
  }

  resize(){
    this.canvas.setAttribute("width", this.homeSection.clientWidth);
    this.canvas.setAttribute("height", this.homeSection.clientHeight);

    const numStars = (this.homeSection.clientWidth + this.homeSection.clientHeight) / 8;
    this.stars = [];
    for(let i = 0; i <= numStars; i++) {
      this.stars.push(new Star({ x: this.homeSection.clientWidth, y: this.homeSection.clientHeight }));
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
    this.prevChange = this.change;

    this.draw = this.draw.bind(this);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    ctx.closePath();
    ctx.fillStyle = `rgba(255, 255, 0, ${this.brightness})`;
    ctx.fill();
    if(this.brightness > 1.3 && this.radius < 2.0) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius + 0.6, 0, 2*Math.PI);
      ctx.closePath();
      ctx.strokeStyle = "white"
      ctx.stroke();
    }

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
