// create the renderer
var renderer = PIXI.autoDetectRenderer(256, 256, {
  antialias: false,
  transparent: false,
  resolution: 1
});

// add the canvas to the HTML document
document.body.appendChild(renderer.view);

// create a container object called 'stage'
var stage = new PIXI.Container();

// tell the 'renderer' to 'render' the 'stage'
renderer.render(stage);

//
// ------- Pixi -------
//
// Pixi is a 2d sprite rendering engine. Display, manage, and animate interactive graphics.
// It is a system for managing sprites. Sprites are just interactive images.
//
// --- Loading images into the texture cache ---
// pixi renders images on the gpu with WebGL. Images need to be in the format that the GPU can process.
// WebGL-ready image is called a "texture". Ordinary images need to be converted to textures.
// To keep everything fast and efficient, pixi uses a Texture Cache
//   if you loaded "images/cat.png" ...
//   you could access it on the cache like: PIXI.utils.textureCache["images/cat.png"]
/*

    var texture = PIXI.utils.TextureCache["images/anyImage.png"];
    var sprite = new PIXI.Sprite(texture);

*/
// But you need to use the loader object to convert images to texture
/* 

    PIXI.loader
        .add("images/anyImage.png")
        .load(setup);

    function setup() {
        //This code will run when the loader has finished loading the image
    }


    // now actually creating the sprite from the loader resources
    var sprite = new PIXI.Sprite(
        PIXI.loader.resources["images/anyImage.png"].texture
    );
    
*/
// COMPLETE loading image example:
/*

    PIXI.loader
        .add("images/anyImage.png")
        .load(setup);

    function setup() {
        var sprite = new PIXI.Sprite(
            PIXI.loader.resources["images/anyImage.png"].texture
        );
    }

    // OR loading multiples
    PIXI.loader
        .add("images/imageOne.png")
        .add("images/imageTwo.png")
        .add("images/imageThree.png")
        .load(setup);

    // ORRR even better
    PIXI.loader
        .add([
            "images/imageOne.png",
            "images/imageTwo.png",
            "images/imageThree.png"
        ])
        .load(setup);

*/
// once loaded, you may add an image to the stage
/*
    stage.addChild(cat) // <---- some sprite named cat is added to stage. Will show when stage is rendered

    // and then remove

    stage.removeChild(cat)

    // or more efficient removal

    sprite.visible = false
*/
/*
    // can also create aliases for resources (not recommended)
 
    PIXI.loader
        .add("catImage", "images/cat.png")
        .load(setup);

    // now can access like
    var cat = new PIXI.Sprite(PIXI.loader.resources.catImage.texture)
    // vs `.resources["images/cat.png"].texture`

*/
/* 

    // pixi gives access to a progress handler
    PIXI.loader
        .add([
            "images/one.png",
            "images/two.png",
            "images/three.png"
        ])
        .on("progress", loadProgressHandler)
        .load(setup);

    function loadProgressHandler(loader, resource) {
        //Display the file `url` currently being loaded
        console.log("loading: " + resource.url); 

        //Display the precentage of files currently loaded
        console.log("progress: " + loader.progress + "%"); 

        //If you gave your files names as the first argument 
        //of the `add` method, you can access them like this
        //console.log("loading: " + resource.name);
    }

    function setup() {
        console.log("setup");
    }

*/
//
// ------- Sprites --------
//
// special image objects called sprites go in the  container ("stage" in our case)
// sprites are basically images that you can control with code
// ways to create:
//    from a single image file
//    from a sub-image on a tileset  <---- tileset is a single, big image that includes all images
//    from texture atlas <---- a json file that defines the size and position of an image on a tileset
//
// sprites default to point origin of 0,0
// change position with x and y properties of the sprite
//
// sprite.position.set(x, y) //  <----- set positions
//
//  --- Using Tilesets ( or spritesheets ) ---
// storing and accessing all your game graphics ona tileset is very processor and memory efficient.
// Pixi is optimized for these
/*

    loader
        .add("images/tileset.png")
        .load(setup);

    function setup() {
        //Create the `tileset` sprite from the texture
        var texture = TextureCache["images/tileset.png"];

        //Create a rectangle object that defines the position and
        //size of the sub-image you want to extract from the texture
        var rectangle = new Rectangle(192, 128, 64, 64);

        //Tell the texture to use that rectangular section
        texture.frame = rectangle;

        //Create the sprite from the texture
        var rocket = new Sprite(texture);

        //Position the rocket sprite on the canvas
        rocket.x = 32;
        rocket.y = 32;

        //Add the rocket to the stage
        stage.addChild(rocket);
        
        //Render the stage   
        renderer.render(stage);
    }
*/
// --- Using texture atlas ---
// JSON data file that contains the position and sizes of the sprites in a tileset
// create with app like texturePacker
/*
    // load the atlas
    loader
        .add("images/treasureHunter.json")
        .load(setup)
    
    // and now each image in tileset is in the texture cache, can access with file names

    var textureFromAtlas = TextureCache["imageFileName.png"]
    var sprite = new Sprite(textureFromAtlas)

*/
//
// moving sprites
// create a looping function using `requestAnimationFrame` - this is called a game loop
// any code in this type of loop is updated 60 times/second
/* 

    function gameLoop() {
        //Loop this function at 60 frames per second
        requestAnimationFrame(gameLoop);

        //Move the cat 1 pixel to the right each frame
        cat.x += 1;

        //Render the stage to see the animation
        renderer.render(stage);
    }

    //Start the game loop
    gameLoop();

*/
// controlling velocity is an important aspect or moving sprites
// `vx` and `vy` set the sprites speed and direction on each axis.
// these properties must be initialized
// the higher the number the greater the speed, +numbers flow in the direction, -numbers flow opposite
/*
    function setup() {

        //Create the `cat` sprite 
        cat = new Sprite(resources["images/cat.png"].texture);
        stage.addChild(cat);

        //Initialize the cat's velocity variables
        cat.vx = 0;
        cat.vy = 0;
        
        //Start the game loop
        gameLoop();
    }

    function gameLoop(){

        //Loop this function 60 times per second
        requestAnimationFrame(gameLoop);

        //Update the cat's velocity
        cat.vx = 1;
        cat.vy = 1;

        //Apply the velocity values to the cat's 
        //position to make it move
        cat.x += cat.vx;
        cat.y += cat.vy;

        //Render the stage
        renderer.render(stage);
    }

*/
// use state for game play
/*
    //Define any variables that are used in more than one function
    var cat, state;

    function setup() {
        //Create the `cat` sprite 
        cat = new Sprite(resources["images/cat.png"].texture);
        cat.y = 96; 
        cat.vx = 0;
        cat.vy = 0;
        stage.addChild(cat);

        //Set the game state
        state = play;
        
        //Start the game loop
        gameLoop();
    }

    function play() {
        cat.vx = 1
        cat.x += cat.vx;
    }

    function gameLoop() {

        //Loop this function at 60 frames per second
        requestAnimationFrame(gameLoop);

        //Update the current game state:
        state();

        //Render the stage to see the animation
        renderer.render(stage);
    }
*/
// collision detection.
// pixi comes with a commonly used function `hitTestRectangle`
// hitTestRectangle(spriteOne, spriteTwo) // <---- returns TRUE or FALSE
