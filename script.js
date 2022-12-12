const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

class Platform {
  constructor({ position }) {
    this.position = position;
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 10;
    this.height = 100;
  }
  draw() {
    ctx.fillStyle = "white";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();

    if (
      this.position.y + this.velocity.y > 0 &&
      this.position.y + this.height + this.velocity.y < canvas.height
    )
      this.position.y += this.velocity.y;
  }
}

class Ball {
  constructor({ position }) {
    this.position = position;
    const speed = 2;
    const direction = {
      x: Math.random() - 0.5 >= 0 ? -speed : speed,
      y: Math.random() - 0.5 >= 0 ? -speed : speed,
    };
    this.velocity = {
      x: direction.x,
      y: direction.y,
    };
    this.width = 10;
    this.height = 10;
  }
  draw() {
    ctx.fillStyle = "white";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();
    const rightSide = this.position.x + this.width + this.velocity.x;
    const leftSide = this.position.x + this.velocity.x;
    const bottomSide = this.position.y + this.height;
    const topSide = this.position.y;

    //platform 1 colls
    if (
      leftSide <= platform1.position.x + platform1.width &&
      bottomSide >= platform1.position.y &&
      topSide <= platform1.position.y + platform1.height
    ) {
      this.velocity.x = -this.velocity.x;
    }

    //platform 2 colls
    if (
      rightSide >= platform2.position.x &&
      bottomSide >= platform2.position.y &&
      topSide <= platform2.position.y + platform2.height
    ) {
      this.velocity.y = -this.velocity.x;
    }

    if (
      this.position.y + this.height + this.velocity.y >= canvas.height ||
      this.position.y + this.velocity.y <= 0
    ) {
      this.velocity.y = -this.velocity.y;
    }

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

const platform1 = new Platform({
  position: {
    x: 10,
    y: 100,
  },
});

const platform2 = new Platform({
  position: {
    x: canvas.width - 10 * 2,
    y: 100,
  },
});

const ball = new Ball({
  position: {
    x: canvas.width / 2,
    y: canvas.height / 2,
  },
});

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  platform1.update();
  platform2.update();

  ball.update();
}

animate();

addEventListener("keydown", (e) => {
  const speed = 4;
  switch (e.key) {
    case "w":
      platform1.velocity.y = -speed;
      break;
    case "s":
      platform1.velocity.y = speed;
      break;
    case "ArrowUp":
      platform2.velocity.y = -speed;
      break;
    case "ArrowDown":
      platform2.velocity.y = speed;
      break;
  }
});
