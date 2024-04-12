type coordinates = {
  x: number;
  y: number;
};
interface posvel {
  position: coordinates;
  velocity: coordinates;
}

const canvas = <HTMLCanvasElement>document.querySelector('canvas');
const cc = <CanvasRenderingContext2D>canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

cc.fillRect(0, 0, canvas.width, canvas.height);
const gravity = 0.5;
class Sprite {
  position: coordinates;
  velocity: coordinates;
  width: number;
  height: number;
  lastKey: string;
  hitBox: {
    position: { x: number; y: number };
    width: number;
    height: number;
  };
  constructor({ position, velocity }: posvel) {
    this.position = position;
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey = '';
    this.hitBox = {
      position: this.position,
      width: 100,
      height: 50,
    };
  }

  draw() {
    cc.fillStyle = 'red';
    cc.fillRect(this.position.x, this.position.y, this.width, this.height);

    cc.fillStyle = 'blue';
    cc.fillRect(
      this.hitBox.position.x,
      this.hitBox.position.y,
      this.hitBox.width,
      this.hitBox.height
    );
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Gravity
    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else this.velocity.y += gravity;
  }
}

const player = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

player.draw();

const enemy = new Sprite({
  position: {
    x: 100,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

enemy.draw();

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
};

function animate() {
  window.requestAnimationFrame(animate);
  cc.fillStyle = 'black';
  cc.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -10;
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 10;
  }

  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -10;
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 10;
  }
}

animate();

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = true;
      player.lastKey = 'd';
      break;
    case 'a':
      keys.a.pressed = true;
      player.lastKey = 'a';
      break;
    case 'w':
      player.velocity.y = -10;
      break;

    case 'ArrowRight':
      keys.ArrowRight.pressed = true;
      enemy.lastKey = 'ArrowRight';
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = 'ArrowLeft';
      break;
    case 'ArrowUp':
      enemy.velocity.y = -10;
      break;
  }
  console.log(event);
});

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false;
      break;
    case 'a':
      keys.a.pressed = false;
      break;

    case 'ArrowRight':
      keys.ArrowRight.pressed = false;
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false;
      break;
  }
  console.log(event);
});
