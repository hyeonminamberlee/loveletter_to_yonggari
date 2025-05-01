// 전체 러브레터 게임 코드 - 이모지 렌더링 개선 포함

let girl, boy;
let groundY;
let letterShown = false;
let energy = 0;
let hearts = [];
let letter;
let letterPage = 0;

let keys = {
  left: false,
  right: false
};

let bgm;
let myFont;

function preload() {
  soundFormats('mp3');
  bgm = loadSound('bgm.mp3');
  myFont = loadFont('Son.ttf');
}

function setup() {
  createCanvas(800, 400);
  textAlign(CENTER, CENTER);
  textFont(myFont);
  groundY = height - 50;

  girl = new Player(100, '👸');
  boy = new Player(140, '🐲');

  for (let i = 0; i < 5; i++) {
    hearts.push(new Heart(random(200, 700), random(groundY - 100, groundY - 60)));
  }

  letter = new Letter(700, groundY - 80);
}

function draw() {
  background('#fff0f5');
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

    for (let i = hearts.length - 1; i >= 0; i--) {
      hearts[i].show();
      if (hearts[i].hits(girl) || hearts[i].hits(boy)) {
        hearts.splice(i, 1);
        energy += 20;
        if (energy > 100) energy = 100;
      }
    }

    letter.show();
    if (letter.hits(girl) || letter.hits(boy)) {
      letterShown = true;
    }

    fill('#ff69b4');
    rect(20, 20, energy * 2, 20);
    noFill();
    stroke('#333');
    rect(20, 20, 200, 20);
  } else {
    showLoveLetter(letterPage);
  }
}

function keyPressed() {
  if (!letterShown) {
    if (keyCode === LEFT_ARROW) keys.left = true;
    if (keyCode === RIGHT_ARROW) keys.right = true;
    if (keyCode === UP_ARROW) {
      girl.jump();
      boy.jump();
    }
  } else {
    if (keyCode === RIGHT_ARROW || keyCode === 32) {
      if (!bgm.isPlaying()) bgm.play();
      letterPage++;
      if (letterPage > 4) letterPage = 4;
    }
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW) keys.left = false;
  if (keyCode === RIGHT_ARROW) keys.right = false;
}

function showLoveLetter(page) {
  background('#fffafc');
  textAlign(CENTER, CENTER);
  fill('#ff69b4');
  textSize(28);
  text("📬 To You,", width / 2, 70);

  fill('#333');
  textSize(16);

  const pages = [
    "사랑하는 용가리야!\n\n오늘은 만으로 우리가 사귄지 1년이 되는 날이야!\n\n너와의 시간을 많이 갖고 싶은 마음에\n시간이 항상 더디게 간다고만 생각했는데.\n\n또 새로운 단위가 이렇게 지나고 나니\n새삼 시간이 빨리 흐른 것 같아!!\n\n돌이켜보면 정말 행복하고 감사하고\n사랑넘치는 한 해였어.",

    "어느덧 나에게 정말 크고 없어서는 안 될 존재가 된 용갈아.\n\n너는 항상 내가 보물이라고 하지만 알고 있지?\n\n너도 나에게 정말 큰 보물이라는 것을.\n\n어떻게 이런 사람이 나에게 왔을까\n항상 감탄하고 또 감사해하고 있어.",

    "크고 작은 배려들,\n항상 우리의 관계를 먼저 생각해주는 마음들.\n모두 고마워.\n\n용가리야 너는 나에게 작고 소중한 새야!\n그래서 안 다치게 조심조심 들고 예쁜 말만 해주고 싶어~",

    "무엇보다도 너무나도 귀여운 용갈아.\n사실 사람이 귀여워보이면 끝이라는데,\n아마 애저녁에 끝난 것 같은 귀여움!!!\n\n너와 보내는 일상들과 나누는 대화들,\n모두 너무 예쁘고 빛나는 것 같아.",

    "단단하고 강하면서 또 부드러운 용갈아.\n\n힘들때는 언제나 나라는 뒷배와 언덕과 사랑이 있다는 것을\n명심하고 기대도록 해.\n\n그리고 우리 이 소중한 인연 오래오래 예쁘게 잘 가꿔나가보자!!\n항상 고맙고 또 사랑해!\n\n앞으로 만년 더 잘 부탁해!!"
  ];

  text(pages[page], width / 2, height / 2);
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
    textFont("Apple Color Emoji");
    textSize(48);
    text(this.emoji, this.x + 20, this.y + 40);
    textFont(myFont);
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
      textFont("Apple Color Emoji");
      textSize(this.size);
      text("💖", this.x, this.y);
      textFont(myFont);
    }
  }

  hits(player) {
    return (
      !this.collected &&
      player.x + 40 > this.x - 10 &&
      player.x < this.x + 10 &&
      player.y + 50 > this.y - 10
    );
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
      textFont("Apple Color Emoji");
      textSize(this.size);
      text("💌", this.x, this.y);
      textFont(myFont);
    }
  }

  hits(player) {
    return (
      !this.collected &&
      player.x + 40 > this.x - 10 &&
      player.x < this.x + 10 &&
      player.y + 50 > this.y - 10
    );
  }
}
