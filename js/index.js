//Setup Pixi and load the texture atlas files - call the `setup`
var Container = PIXI.Container,
  autoDetectRenderer = PIXI.autoDetectRenderer,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  TextureCache = PIXI.utils.TextureCache,
  Texture = PIXI.Texture,
  Sprite = PIXI.Sprite,
  Text = PIXI.Text,
  Graphics = PIXI.Graphics;

var stage = new Container();
var renderer = autoDetectRenderer(512, 512);

document.body.appendChild(renderer.view);

//load a JSON file and run the `setup` function when it's done
loader.add("img/treasureHunter.json").load(setup);

var state,
  explorer,
  treasure,
  blobs,
  chimes,
  exit,
  player,
  dungeon,
  door,
  healthBar,
  message,
  gameScene,
  gameOverScene,
  enemies;

function setup() {
  //Create the `gameScene` group
  gameScene = new Container();
  stage.addChild(gameScene);
  console.log(resources["img/treasureHunter.json"]);

  //Create the `door` sprite
  door = new Sprite(TextureCache["door.png"]);
  door.position.set(32, 0);
  gameScene.addChild(door);

  //Create the `explorer` sprite
  explorer = new Sprite(TextureCache["explorer.png"]);
  explorer.x = 68;
  explorer.y = gameScene.height / 2 - explorer.height / 2;
  explorer.vx = 0;
  explorer.vy = 0;
  gameScene.addChild(explorer);

  //Create the `treasure` sprite
  //Treasure
  treasure = new Sprite(TextureCache["treasure.png"]);
  treasure.x = gameScene.width - treasure.width - 48;
  treasure.y = gameScene.height / 2 - treasure.height / 2;
  gameScene.addChild(treasure);

  //Make the enemies
  let numberOfBlobs = 6;
  let spacing = 48;
  let xOffset = 150;
  let speed = 2;
  let direction = 1;

  //An array to store all the blob monsters
  blobs = [];

  //Make as many blobs as there are `numberOfBlobs`
  for (var i = 0; i < numberOfBlobs; i++) {
    //Make a blob
    var blob = new Sprite(TextureCache["blob.png"]);

    //Space each blob horizontally according to the `spacing` value.
    //`xOffset` determines the point from the left of the screen
    //at which the first blob should be added
    var x = spacing * i + xOffset;

    //Give the blob a random `y` position
    var y = randomInt(0, stage.height - blob.height);

    //Set the blob's position
    blob.x = x;
    blob.y = y;

    //Set the blob's vertical velocity. `direction` will be either `1` or
    //`-1`. `1` means the enemy will move down and `-1` means the blob will
    //move up. Multiplying `direction` by `speed` determines the blob's
    //vertical direction
    blob.vy = speed * direction;

    //Reverse the direction for the next blob
    direction *= -1;

    //Push the blob into the `blobs` array
    blobs.push(blob);

    //Add the blob to the `gameScene`
    gameScene.addChild(blob);
  }

  //Create the health bar
  healthBar = new PIXI.DisplayObjectContainer();
  healthBar.position.set(stage.width - 170, 6);
  gameScene.addChild(healthBar);

  //Create the black background rectangle
  var innerBar = new PIXI.Graphics();
  innerBar.beginFill(0x000000);
  innerBar.drawRect(0, 0, 128, 8);
  innerBar.endFill();
  healthBar.addChild(innerBar);

  //Create the front red rectangle
  var outerBar = new PIXI.Graphics();
  outerBar.beginFill(0xff3300);
  outerBar.drawRect(0, 0, 128, 8);
  outerBar.endFill();
  healthBar.addChild(outerBar);

  healthBar.outer = outerBar;
  healthBar.outer.width = 30;

  //Add some text for the game over message
  message = new Text("The End!", { font: "64px Futura", fill: "white" });

  message.x = 120;
  message.y = stage.height / 2 - 32;

  gameOverScene.addChild(message);

  //Create a `gameOverScene` group
  gameOverScene = new Container();
  stage.addChild(gameOverScene);
  gameOverScene.visible = false;
  //Assign the player's keyboard controllers

  //set the game state to `play`
  state = play;

  //Start the game loop
  gameLoop();
}

function gameLoop() {
  //Runs the current game `state` in a loop and renders the sprites
}

function play() {
  //All the game logic goes here
}

function end() {
  //All the code that should run at the end of the game
}

//The game's helper functions:
//`keyboard`, `hitTestRectangle`, `contain` and `randomInt`
