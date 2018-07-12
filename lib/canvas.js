let reqAnimFrame = (
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) { window.setTimeout(callback, 1000 / 60) }
);


document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const home = new Home(canvas, ctx);
  const shootingStar = new ShootingStar();

  window.addEventListener("resize", () => {
    home.resize();
  });
  home.draw();

  canvas.addEventListener("mouseover", (e) => {
    canvas.addEventListener("mousemove", (e) => {
      // if (shootingStar.empty()) {
      //   shootingStar.draw(e.clientX, e.clientY);
      // }
      home.stars.forEach((star) => {
        if(Math.abs(e.clientX - star.x) <= 100 && Math.abs(e.clientY - star.y) <= 100) {
          star.change = 0.06;
          star.radius = 1.9;
        } else if (star.change > 0.04) {
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

});




class Home {
  constructor(canvas, ctx){
    //this.canvas = document.getElementById("canvas");
    //this.ctx = this.canvas.getContext("2d");
    this.canvas = canvas;
    this.ctx = ctx;
    this.aboutSection = document.getElementById("about");
    this.canvas.setAttribute("width", this.aboutSection.clientWidth);
    this.canvas.setAttribute("height", this.aboutSection.clientHeight);

    const numStars = (this.aboutSection.clientWidth + this.aboutSection.clientHeight) / 6;
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
    //this.ctx.fillStyle = "rgb(0, 30, 22)";
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);
  }

  drawStars() {
    this.stars.forEach((star) => {
      star.draw(this.ctx);
    });
  }

  // drawText() {
  //   const textX = this.aboutSection.clientWidth / 2;
  //   const textY = (this.aboutSection.clientHeight - this.aboutSection.clientHeight * .3) / 2;
  //
  //   this.ctx.font = "68px Arial";
  //   this.ctx.textAlign = "center";
  //   this.ctx.fillStyle = "white";
  //
  //   this.ctx.fillText("Mark Martinez", textX, textY);
  //
  //   this.ctx.font = "38px Arial";
  //   this.ctx.fillText("Software Developer && Musician", textX, textY + 60);
  //
  //   this.ctx.font = "18px Arial";
  //   this.ctx.fillText(
  //     "Laying down phat algoRHYTHMic beats. Pencil to paper code as DRY as my trashcan lid cymbal.",
  //      textX,
  //      textY + 100
  //   );

  // }

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
    this.prevChange = this.change;

    this.draw = this.draw.bind(this);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    ctx.closePath();
    ctx.fillStyle = `rgba(255, 255, 0, ${this.brightness})`;
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

class ShootingStar {
  constructor() {
    this.shootingStar = [];
    this.dx

    this.empty.bind(this);
    this.draw.bind(this);
  }

  empty() {
    return this.shootingStar.length;
  }

  draw(x, y) {

  }
}
