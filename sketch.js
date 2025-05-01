let girl, boy;
let groundY;
let letterShown = false;
let energy = 0;
let hearts = [];
let letter;

let keys = {
  left: false,
  right: false
};

function setup() {
  createCanvas(800, 400);
  textAlign(CENTER, CENTER);
  textFont("Apple Color Emoji");
  groundY = height - 50;

  girl = new Player(100, '👩‍🦰');
  boy = new Player(140, '👨‍🦱');

  // 하트 생성
  for (let i = 0; i < 5; i++) {
    hearts.push(new Heart(random(200, 700), random(groundY - 100, groundY - 60)));
  }

  // 편지 생성
  letter = new Letter(700, groundY - 80);
}

function draw() {
  background('#fff0f5');

  // 땅
  fill('#ffb6c1');
  rect(0, groundY, width, 50);

  if (!letterShown) {
    if (keys.left) {
      girl.move(-5);
      boy.move(-5);
    }
    if (keys.right) {
      girl.move(5);
      boy.move(5);
    }

    girl.update();
    boy.update();

    girl.show();
    boy.show();

    // 하트 처리
    for (let i = hearts.length - 1; i >= 0; i--) {
      hearts[i].show();
      if (hearts[i].hits(girl) || hearts[i].hits(boy)) {
        hearts.splice(i, 1);
        energy += 20;
        if (energy > 100) energy = 100;
      }
    }

    // 편지 보여주기
    letter.show();
    if (letter.hits(girl) || letter.hits(boy)) {
      letterShown = true;
    }

    // 에너지 바
    fill('#ff69b4');
    rect(20, 20, energy * 2, 20);
    noFill();
    stroke('#333');
    rect(20, 20, 200, 20);
  } else {
    showLoveLetter();
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) keys.left = true;
  if (keyCode === RIGHT_ARROW) keys.right = true;
  if (keyCode === UP_ARROW) {
    girl.jump();
    boy.jump();
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW) keys.left = false;
  if (keyCode === RIGHT_ARROW) keys.right = false;
}

class Player {
  constructor(x, emoji) {
    this.x = x;
    this.y = groundY - 50;
    this.vy = 0;
    this.gravity = 1.2;
    this.emoji = emoji;
  }

  move(step) {
    this.x += step;
  }

  jump() {
    if (this.y >= groundY - 50) {
      this.vy = -15;
    }
  }

  update() {
    this.y += this.vy;
    this.vy += this.gravity;

    if (this.y > groundY - 50) {
      this.y = groundY - 50;
      this.vy = 0;
    }
  }

  show() {
    textSize(48);
    text(this.emoji, this.x + 20, this.y + 40);
  }
}

class Heart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 24;
    this.collected = false;
  }

  show() {
    if (!this.collected) {
      textSize(this.size);
      text("💖", this.x, this.y);
    }
  }

  hits(player) {
    if (
      !this.collected &&
      player.x + 40 > this.x - 10 &&
      player.x < this.x + 10 &&
      player.y + 50 > this.y - 10
    ) {
      this.collected = true;
      return true;
    }
    return false;
  }
}

class Letter {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 32;
    this.collected = false;
  }

  show() {
    if (!this.collected) {
      textSize(this.size);
      text("💌", this.x, this.y);
    }
  }

  hits(player) {
    if (
      !this.collected &&
      player.x + 40 > this.x - 10 &&
      player.x < this.x + 10 &&
      player.y + 50 > this.y - 10
    ) {
      this.collected = true;
      return true;
    }
    return false;
  }
}

function showLoveLetter() {
  background('#fffafc');
  textAlign(CENTER, CENTER);
  fill('#ff69b4');
  textSize(28);
  text("💌 To You,", width / 2, 100);

  fill('#333');
  textSize(18);
  text("처음 만났던 순간부터 지금까지,\n내 마음속에는 늘 네가 있어.\n\n너와 함께한 모든 순간이 선물 같아.\n이제는 너에게 내 진심을 전하고 싶어.\n\n사랑해, 언제나. - 현민이가 💖", width / 2, 200);
}
