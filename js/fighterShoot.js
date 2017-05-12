let renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0x1099bb });
document.body.appendChild(renderer.view);

let stage = new PIXI.Container();

let fighterTex = PIXI.Texture.fromImage("img/fighter.png");
let arrowTex = PIXI.Texture.fromImage("img/arrow.png");

let fighter = new PIXI.Sprite(fighterTex);

let background = new PIXI.Graphics();

let bullets = [];
let bulletSpeed = 5;

// anchor the fighter
fighter.anchor.x = 0.5;
fighter.anchor.y = 0.5;

// center the fighter
fighter.position.x = 200;
fighter.position.y = 150;

background.beginFill(0x123456);
background.drawRect(0, 0, 800, 600);
background.endFill();
stage.addChild(background);

stage.addChild(fighter);

stage.interactive = true;

stage.on("mousedown", e => {
  shoot(fighter.rotation, {
    x: fighter.position.x + Math.cos(fighter.rotation) * 20,
    y: fighter.position.y + Math.sin(fighter.rotation) * 20
  });
});

const shoot = (rotation, startPosition) => {
  let bullet = new PIXI.Sprite(arrowTex);
  let { x, y } = startPosition;
  bullet.position.x = x;
  bullet.position.y = y;
  bullet.rotation = rotation;
  stage.addChild(bullet);
  bullets.push(bullet);
};

const rotateToPoint = (mx, my, px, py) => {
  let dist_Y = my - py;
  let dist_X = mx - px;
  let angle = Math.atan2(dist_Y, dist_X);
  return angle;
};

const animate = () => {
  requestAnimationFrame(animate);
  fighter.rotation = rotateToPoint(
    renderer.plugins.interaction.mouse.global.x,
    renderer.plugins.interaction.mouse.global.y,
    fighter.position.x,
    fighter.position.y
  );

  for (let b = bullets.length - 1; b >= 0; b--) {
    bullets[b].position.x += Math.cos(bullets[b].rotation) * bulletSpeed;
    bullets[b].position.y += Math.sin(bullets[b].rotation) * bulletSpeed;
  }

  renderer.render(stage);
};

animate();
