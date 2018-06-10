/**
 * BCLearningNetwork.com
 * Game Title
 * @author Parsa Rajabi - ParsaRajabiPR@gmail.com
 * May 2018
 */


//// VARIABLES ////

var mute = false;
var FPS = 20;
var STAGE_WIDTH, STAGE_HEIGHT;
var gameStarted = false;

//physics
var mass = 50; //mass of person

var velocity = 2; //velocity of person m/s
var radius = 3; //radius of ferris in meters
var grav = 9.8;
var force, maxForce, minForce;
var forceOutput, minForceOutput, maxForceOutput;
var velcoityText, velocityOutput;
var radiusText, radiusOutput
var massText, massOutput;
var forceText, forceTopText, forceBotText;
var velocitySlider, massSlider, radiusSlider;

//var maxForce = Math.floor(mass * grav + mass * Math.pow(velocity, 2) / radius) + " Newtons"; //maxForce is at Bottom of ferris
//var minForce = Math.floor(mass * grav - mass * Math.pow(velocity, 2) / radius) + " Newtons"; //mixForce is at Top of ferris

// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;

/*
 * Initialize the stage and some createJS settings
 */
function init() {
    STAGE_WIDTH = parseInt(document.getElementById("gameCanvas").getAttribute("width"));
    STAGE_HEIGHT = parseInt(document.getElementById("gameCanvas").getAttribute("height"));

    // init state object
    stage = new createjs.Stage("gameCanvas"); // canvas id is gameCanvas
    stage.mouseEventsEnabled = true;
    stage.enableMouseOver(); // Default, checks the mouse 20 times/second for hovering cursor changes

    setupManifest(); // preloadJS
    startPreload();

    stage.update();
}
/*
 * Main update loop.
 */


function update(event) {
    if (gameStarted) {


        circle.rotation -= velocity; // spin the circle (Change amount to make it faster/slower).

        //let force = mass * grav + (mass * Math.pow(velocity, 2) * Math.sin(((circle.rotation % 360) * (180 / Math.PI)) / radius));

        force = Math.abs(Math.floor(mass * grav + mass * Math.pow(velocity, 2) / radius * Math.sin(circle.rotation * Math.PI / 180))) + " N";

        maxForce = Math.abs(Math.floor(mass * grav + mass * Math.pow(velocity, 2) / radius)) + " N"; //maxForce is at Bottom of ferris
        minForce = Math.abs(Math.floor(mass * grav - mass * Math.pow(velocity, 2) / radius)) + " N"; //mixForce is at Top of ferris


        //    force output
        stage.removeChild(forceOutput);
        forceOutput = new createjs.Text(force, "23px Lato", "ff7700");
        forceOutput.x = 575;
        forceOutput.y = 252.5;
        stage.addChild(forceOutput);


        //    minForce output TOP
        //new text(text, font, color)
        stage.removeChild(minForceOutput);
        minForceOutput = new createjs.Text(minForce, "23px Lato", "ff7700");
        minForceOutput.x = 200;
        minForceOutput.y = 75;
        stage.addChild(minForceOutput);



        //    maxForce output BOT
        //new text(text, font, color)
        stage.removeChild(maxForceOutput);
        maxForceOutput = new createjs.Text(maxForce, "23px Lato", "ff7700");
        maxForceOutput.x = 200;
        maxForceOutput.y = 475;
        stage.addChild(maxForceOutput);







        //        console.log("----")
        //        console.log("Max Force at Bottom is " + maxForce);
        //        console.log("Min Force at Top is " + minForce);
        //        console.log("The mass is: " + mass);
        //        console.log("The velocity is: " + velocity);
        //        console.log("The radius is " + radius);
        //        console.log("The force is: " + force);

        //        console.log("The circle roation is: " + circle.rotation);


    }


    stage.update(event);

}

/*
 * Ends the game.
 */
function endGame() {
    gameStarted = false;
}

/*
 * Place graphics and add them to the stage.
 */
function initGraphics() {

    initMuteUnMuteButtons();

    //plays music in a loop song is 43 seconds // 40000 ms
    ambianceSound = createjs.Sound.play("song", {loop:-1});

    //add randon button to stage
    randomButton.x = randomButtonPressed.x = 450;
    randomButton.y = randomButtonPressed.y = 400;
    randomButtonPressed.cursor = "pointer";
    stage.addChild(randomButton);

    //    startButton.x = startButtonPressed.x = 425;
    //    startButton.y = startButtonPressed.y = 500;
    //    startButtonPressed.cursor = "pointer";
    //    stage.addChild(startButton);
    //
    //    pauseButton.x = pauseButtonPressed.x = 600;
    //    pauseButton.y = pauseButtonPressed.y = 500;
    //    pauseButtonPressed.cursor = "pointer";
    //    stage.addChild(pauseButton);

    // position circle
    circle.x = 200;
    circle.y = 275;
    // so that circle rotates around point in middle of it (default is top left of corner for positioning)
    circle.regX = circle.regY = circle.image.height / 2;
//    circle.regX = circle.image.width / 2;
//    circle.regY = circle.image.height / 2;
    stage.addChild(circle); // add to stage so can see it (it is rotated in update function)

    ferrisWheelStand.x = 60;
    ferrisWheelStand.y = 220;
    stage.addChild(ferrisWheelStand);

    //    velocity lable
    //new text(text, font, color)
    velcoityText = new createjs.Text("Velocity:  ", "23px Lato", "ff7700");
    velcoityText.x = 400;
    velcoityText.y = 152.5;
    stage.addChild(velcoityText);

    //    velocity output
    //new text(text, font, color)
    velocityOutput = new createjs.Text(velocity, "23px Lato", "ff7700");
    velocityOutput.x = 505;
    velocityOutput.y = 152.5;
    stage.addChild(velocityOutput);

    // uncomment the following code to enable the radius lable/output

    //    radius lable
    //new text(text, font, color)
    radiusText = new createjs.Text("Radius: ", "23px Lato", "ff7700");
    radiusText.x = 400;
    radiusText.y = 100;
    stage.addChild(radiusText);

    //    radius output
    //new text(text, font, color)
    radiusOutput = new createjs.Text(radius, "23px Lato", "ff7700");
    radiusOutput.x = 505;
    radiusOutput.y = 100;
    stage.addChild(radiusOutput);

    //    masss lable
    //new text(text, font, color)
    massText = new createjs.Text("Mass: ", "23px Lato", "ff7700");
    massText.x = 400;
    massText.y = 202.5;
    stage.addChild(massText);


    //    mass output
    //new text(text, font, color)
    massOutput = new createjs.Text(mass, "23px Lato", "ff7700");
    massOutput.x = 505;
    massOutput.y = 202.5;
    stage.addChild(massOutput);


    //force lable
    //new text(text, font, color)
    forceText = new createjs.Text("Current Force: ", "23px Lato", "ff7700");
    forceText.x = 400;
    forceText.y = 252.5;
    stage.addChild(forceText);

    //force output is in the update function


    //    forceTop lable
    //new text(text, font, color)
    forceTopText = new createjs.Text("Force at Top: ", "23px Lato", "ff7700");
    forceTopText.x = 65;
    forceTopText.y = 75;
    stage.addChild(forceTopText);



    //    forceBot lable
    //new text(text, font, color)
    forceBotText = new createjs.Text("Force at Bottom: ", "23px Lato", "ff7700");
    forceBotText.x = 25;
    forceBotText.y = 475;
    stage.addChild(forceBotText);




    initListeners();

    //Slider properties

    // radius slider
    // new Slider(min, max, width, height)
    radiusSlider = new Slider(1, 6, 200, 30).set({
        x: 550,
        y: 100,
        value: 3 //default value
    });


    radiusSlider.on("change", handleRadiusSliderChange, this); // assign event handler to the slider (What function to call)
    stage.addChild(radiusSlider);



    // velocity slider
    // new Slider(min, max, width, height)
    velocitySlider = new Slider(0, 6, 200, 30).set({

        x: 550,
        y: 150,
        value: 2.5 //default value
    });



    velocitySlider.on("change", handleVelocitySliderChange, this); // assign event handler to the slider (What function to call)
    stage.addChild(velocitySlider);

    // mass slider
    // new Slider(min, max, width, height)
    massSlider = new Slider(0, 100, 200, 30).set({
        x: 550,
        y: 200,
        value: 50 //default value
    });
    massSlider.on("change", handleMassSliderChange, this); // assign event handler to the slider (what function to call)
    stage.addChild(massSlider);







    // start the game
    gameStarted = true;
    stage.update();
}

//handle slider changes functions

function handleRadiusSliderChange(evt) {
    radius = Math.floor(evt.target.value); //assigns the value of slider change to the variable
    radiusOutput.text = radius;
    console.log("Radius is " + radius);
}
// called when velocity slider is moved
function handleVelocitySliderChange(evt) {
    velocity = Math.floor(evt.target.value); //assigns the value of slider change to the variable
    velocityOutput.text = velocity;
    console.log("Velocity: " + velocity);
}

// called when mass slider is moved
function handleMassSliderChange(evt) {
    mass = Math.floor(evt.target.value); //assigns the value of slider change to the variable
    massOutput.text = mass;
    console.log("Mass: " + mass);

}

/*
 * Adds the mute and unmute buttons to the stage and defines listeners
 */
function initMuteUnMuteButtons() {
    var hitArea = new createjs.Shape();
    hitArea.graphics.beginFill("#000").drawRect(0, 0, muteButton.image.width, muteButton.image.height);
    muteButton.hitArea = unmuteButton.hitArea = hitArea;

    muteButton.x = unmuteButton.x = 5;
    muteButton.y = unmuteButton.y = 5;

    muteButton.cursor = "pointer";
    unmuteButton.cursor = "pointer";

    muteButton.on("click", toggleMute);
    unmuteButton.on("click", toggleMute);

    stage.addChild(unmuteButton);
}

/*
 * Add listeners to objects.
 */
function initListeners() {


    randomButton.on("mouseover", function () {
        stage.addChild(randomButtonPressed);
        stage.removeChild(randomButton);
    });
    randomButtonPressed.on("mouseout", function () {
        stage.addChild(randomButton);
        stage.removeChild(randomButtonPressed);
    });
    randomButtonPressed.on("click", random);
    //
    //
    //    startButton.on("mouseover", function () {
    //        stage.addChild(startButtonPressed);
    //        stage.removeChild(startButton);
    //    });
    //    startButtonPressed.on("mouseout", function () {
    //        stage.addChild(startButton);
    //        stage.removeChild(startButtonPressed);
    //    });
    //    startButtonPressed.on("click", start); //TODO define function start
    //
    //    pauseButton.on("mouseover", function () {
    //        stage.addChild(pauseButtonPressed);
    //        stage.removeChild(pauseButton);
    //    });
    //    pauseButtonPressed.on("mouseout", function () {
    //        stage.addChild(pauseButton);
    //        stage.removeChild(pauseButtonPressed);
    //    });
    //
    //    pauseButtonPressed.on("click", random); //TODO define function pause
}

//function start() {
//    velocity = tempVelocity;
//
//}
//
//function pause() {
//
//    //   velocity = 0;
//}


//generates random numbers for the 3 variables of the game
function random() {

    playSound("click");
    velocity = RandomNum(0, 6);
    mass = RandomNum(0, 100);
    radius = RandomNum(1, 6);

    velocityOutput.text = velocity;
    massOutput.text = mass;
    radiusOutput.text = radius;

    velocitySlider.value = velocity;
    massSlider.value = mass;
    radiusSlider.value = radius;

}

//returns a random number including min and max
function RandomNum(min, max) {
    var randomnumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomnumber;
}



//////////////////////// PRELOADJS FUNCTIONS

// bitmap variables
var muteButton, unmuteButton;
var background;
//var startButton, startButtonPressed;
//var pauseButton, pauseButtonPressed;
var randomButton, randomButtonPressed;
var circle;
var ferrisWheelStand;


/*
 * Add files to be loaded here.
 */
function setupManifest() {
    manifest = [
        {

            src: "sounds/click.mp3",
            id: "click"
    },
        {
            src: "sounds/themePark.mp3",
            id: "song"
    }, {
            src: "images/background.png",
            id: "background"
    },
        {
            src: "images/mute.png",
            id: "mute"
    },
        {
            src: "images/unmute.png",
            id: "unmute"
    },
        {
            src: "images/random_btn_pressed.png",
            id: "randomButtonPressed"

        },
        {
            src: "images/random_btn.png",
            id: "randomButton"

        },


//        {
//            src: "images/start_btn.png",
//            id: "startButton"
//    },
//        {
//            src: "images/start_btn_pressed.png",
//            id: "startButtonPressed"
//    },
//        {
//            src: "images/pause_btn.png",
//            id: "pauseButton"
//    },
//        {
//            src: "images/pause_btn_pressed.png",
//            id: "pauseButtonPressed"
//          },
        {
            src: "images/circle.png",
            id: "circle"
          },
         {
            src: "images/ferrisWheelStand.png",
            id: "ferrisWheelStand"
          }

 	];
}


function startPreload() {
    preload = new createjs.LoadQueue(true);
    preload.installPlugin(createjs.Sound);
    preload.on("fileload", handleFileLoad);
    preload.on("progress", handleFileProgress);
    preload.on("complete", loadComplete);
    preload.on("error", loadError);
    preload.loadManifest(manifest);
}

/*
 * Specify how to load each file.
 */
function handleFileLoad(event) {
    console.log("A file has loaded of type: " + event.item.type);
    // create bitmaps of images
    if (event.item.id == "mute") {
        muteButton = new createjs.Bitmap(event.result);
    } else if (event.item.id == "unmute") {
        unmuteButton = new createjs.Bitmap(event.result);
    } else if (event.item.id == "background") {
        background = new createjs.Bitmap(event.result);
    } else if (event.item.id == "randomButton") {
        randomButton = new createjs.Bitmap(event.result);
    } else if (event.item.id == "randomButtonPressed") {
        randomButtonPressed = new createjs.Bitmap(event.result);
    } else if (event.item.id == "circle") {
        circle = new createjs.Bitmap(event.result);
    }
    else if (event.item.id == "ferrisWheelStand") {
        ferrisWheelStand = new createjs.Bitmap(event.result);
    }
}

//    } else if (event.item.id == "startButton") {
//        startButton = new createjs.Bitmap(event.result);
//    } else if (event.item.id == "startButtonPressed") {
//        startButtonPressed = new createjs.Bitmap(event.result);
//    } else if (event.item.id == "pauseButton") {
//        pauseButton = new createjs.Bitmap(event.result);
//    } else if (event.item.id == "pauseButtonPressed") {
//        pauseButtonPressed = new createjs.Bitmap(event.result);


function loadError(evt) {
    console.log("Error!", evt.text);
}

// not currently used as load time is short
function handleFileProgress(event) {

}

/*
 * Displays the start screen.
 */
function loadComplete(event) {
    console.log("Finished Loading Assets");

    // ticker calls update function, set the FPS
    createjs.Ticker.setFPS(FPS);
    createjs.Ticker.addEventListener("tick", update); // call update function

    stage.addChild(background);
    stage.update();
    initGraphics();
}

///////////////////////////////////// END PRELOADJS FUNCTIONS
