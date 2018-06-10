/**
 * BCLearningNetwork.com
 * Ferris Wheel
 * @author Parsa Rajabi - ParsaRajabiPR@gmail.com
 * May 2018
 */

    createjs.MotionGuidePlugin.install();

//// VARIABLES ////

var mute = false;
var FPS = 20;
var STAGE_WIDTH, STAGE_HEIGHT;
var gameStarted = false;

//physics
var mass = 50; //mass of person in kg

var velocity = 3; //velocity of person m/s
var radius = 7.5; //radius of ferris in meters
var grav = 9.8;
var force, maxForce, minForce;
var forceOutput, minForceOutput, maxForceOutput;
var velcoityText, velocityOutput; //velocity
var radiusText, radiusOutput; // radius
var massText, massOutput; //mass
var forceText, forceTopText, forceBotText; //textboxes
var velocitySlider, massSlider, radiusSlider; //sliders
var sliderX, sliderY;
var textX, textY; 
var outputX, outputY;
var spaceBetweenX, spaceBetweenY;
var container; //to put both ferris wheel and passenger in it



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

        
        container.rotation -= velocity; // spin the container which the ferris wheel is in it (Change amount to make it faster/slower).
        passenger.rotation += velocity; //passenger rotates the opposite direction

        force = Math.abs(Math.floor(mass * grav + mass * Math.pow(velocity, 2) / radius * Math.sin(container.rotation * Math.PI / 180))) + " N";

        maxForce = Math.abs(Math.floor(mass * grav + mass * Math.pow(velocity, 2) / radius)) + " N"; //maxForce is at Bottom of ferris
        minForce = Math.abs(Math.floor(mass * grav - mass * Math.pow(velocity, 2) / radius)) + " N"; //mixForce is at Top of ferris


        //    force output
        stage.removeChild(forceOutput);
        forceOutput = new createjs.Text(force, "28px Lato", "ff7700");
        forceOutput.x = 560;
        forceOutput.y = 360;
        stage.addChild(forceOutput);


        //    minForce output TOP
        //new text(text, font, color)
        stage.removeChild(minForceOutput);
        minForceOutput = new createjs.Text(minForce, "25px Lato", "ff7700");
        minForceOutput.x = 300;
        minForceOutput.y = 75;
        stage.addChild(minForceOutput);



        //    maxForce output BOT
        //new text(text, font, color)
        stage.removeChild(maxForceOutput);
        maxForceOutput = new createjs.Text(maxForce, "25px Lato", "ff7700");
        maxForceOutput.x = 300;
        maxForceOutput.y = 520;
        stage.addChild(maxForceOutput);


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

    // loops the music   
    ambianceSound = createjs.Sound.play("song", {
        loop: -1
    });
    ambianceSound.volume = 0.125;


     //add dice picture to stage
    dice.x = dicePressed.x = 500;
    dice.y = dicePressed.y= 420;
    dice.cursor = dicePressed.cursor = "pointer";
    stage.addChild(dice);

    
    

    


    // position circle
    circle.x = 0;
    circle.y = 0;
    circle.regX = circle.regY = circle.image.height / 2;

    container = new createjs.Container();
    container.x = 200;
    container.y = 275;
    //position the container aka the ferris wheel
    
    //position the passenger realtive to the ferris wheel and container 
//    passenger.x = 95;
//    passenger.y = 52;
    passenger.x = 101;
    passenger.y = 59;
    
    
    //add passenger and ferris wheel to the container and then add the container to the stage.
    //The order matters. Change the order to make them appear below/on top of each other
    container.addChild(circle);
    container.addChild(passenger);
    stage.addChild(container); 

    //FerrisWheel Stand 
    ferrisWheelStand.x = 55;
    ferrisWheelStand.y = 220;
    stage.addChild(ferrisWheelStand);
    
    //set default textbox x/y to variables textX and textY
    textX = 450;
    textY = 100;
    
    //set default output x/y to variables outputX and outputY
    outputX = textX+225;
    outputY = textY;

    //set default slider x/y to variables sliderX and sliderY
    sliderX = textX+ 60;
    sliderY = textY + 35;
    
    spaceBetweenX = 0;
    spaceBetweenY = 75;



    //    radius lable
    //new text(text, font, color)
    radiusText = new createjs.Text("Radius (m): ", "23px Lato", "ff7700");
    radiusText.x = textX;
    radiusText.y = textY;
    stage.addChild(radiusText);

    //    radius output
    //new text(text, font, color)
    radiusOutput = new createjs.Text(radius, "23px Lato", "ff7700");
    radiusOutput.x = outputX;
    radiusOutput.y = outputY;
    stage.addChild(radiusOutput);

    //    velocity lable
    //new text(text, font, color)
    velcoityText = new createjs.Text("Velocity (m/s): ", "23px Lato", "ff7700");
    velcoityText.x = textX + spaceBetweenX;
    velcoityText.y = textY + spaceBetweenY;
    stage.addChild(velcoityText);

    //    velocity output
    //new text(text, font, color)
    velocityOutput = new createjs.Text(velocity, "23px Lato", "ff7700");
    velocityOutput.x = outputX + spaceBetweenX;
    velocityOutput.y = outputY + spaceBetweenY;
    stage.addChild(velocityOutput);

    
    //    masss lable
    //new text(text, font, color)
    massText = new createjs.Text("Passenger Mass (kg): ", "23px Lato", "ff7700");
    massText.x = textX + spaceBetweenX*1.5;
    massText.y = textY + spaceBetweenY*2;
    stage.addChild(massText);


    //    mass output
    //new text(text, font, color)
    massOutput = new createjs.Text(mass, "23px Lato", "ff7700");
    massOutput.x = outputX + spaceBetweenX*1.5;
    massOutput.y = outputY + spaceBetweenY*2;
    stage.addChild(massOutput);


    //force lable
    //new text(text, font, color)
    forceText = new createjs.Text("Current Force on Passenger: ", "24px Lato", "ff7700");
    forceText.x = 450;
    forceText.y = 325;
    stage.addChild(forceText);
    
    
    //random lable
    //new text(text, font, color)
    randomText = new createjs.Text("Roll for Random Values: ", "24px Lato", "ff7700");
    randomText.x = 450;
    randomText.y = 400;
    stage.addChild(randomText);

    //force output is in the update function


    //    forceTop lable
    //new text(text, font, color)
    forceTopText = new createjs.Text("Normal Force at Top: ", "25px Lato", "ff7700");
    forceTopText.x = 65;
    forceTopText.y = 75;
    stage.addChild(forceTopText);


    //    forceBot lable
    //new text(text, font, color)
    forceBotText = new createjs.Text("Normal Force at Bottom: ", "25px Lato", "ff7700");
    forceBotText.x = 25;
    forceBotText.y = 520;
    stage.addChild(forceBotText);
    
    
    //instructions lable
    //new text(text, font, color)
    instructText = new createjs.Text("Instructions: Adjust the sliders to see the Normal Force on the passenger. \nRoll the dice for random values.", "17.5px Lato", "ff7700");
    instructText.x = 25;
    instructText.y = 555;
    stage.addChild(instructText);

    initListeners();

    //Slider properties
    
    

    // radius slider
    // new Slider(min, max, width, height)
    radiusSlider = new Slider(5, 9, 200, 30).set({
        x: sliderX,
        y: sliderY,
        value: 7.5 //default value
    });


    radiusSlider.on("change", handleRadiusSliderChange, this); // assign event handler to the slider (What function to call)
    stage.addChild(radiusSlider);

    // velocity slider
    // new Slider(min, max, width, height)
    velocitySlider = new Slider(0, 6, 200, 30).set({

        x: sliderX + spaceBetweenX,
        y: sliderY + spaceBetweenY,
        value: 3//default value
    });

    velocitySlider.on("change", handleVelocitySliderChange, this); // assign event handler to the slider (What function to call)
    stage.addChild(velocitySlider);

    // mass slider
    // new Slider(min, max, width, height)
    massSlider = new Slider(0, 100, 200, 30).set({
        x: sliderX + spaceBetweenX*1.5,
        y: sliderY + spaceBetweenY*2,
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
    //radius = Math.floor(evt.target.value); //assigns the value of slider change to the variable
    radius = Math.round(evt.target.value*2)/2;
    radiusOutput.text = radius;
    container.scaleX = container.scaleY  = radius / 8.5 * 1.1;
    
    //    console.log("Radius is " + radius);
}
// called when velocity slider is moved
function handleVelocitySliderChange(evt) {
//    velocity = Math.floor(evt.target.value); //assigns the value of slider change to the variable
    velocity = Math.round(evt.target.value*2)/2;
    velocityOutput.text = velocity;
    //    console.log("Velocity: " + velocity);
}

// called when mass slider is moved
function handleMassSliderChange(evt) {
    mass = Math.floor(evt.target.value); //assigns the value of slider change to the variable
//    mass = Math.round(evt.target.value*2)/2;
    massOutput.text = mass;
    //    console.log("Mass: " + mass);

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



    dice.on("mouseover", function () {
        stage.addChild(dicePressed);
        stage.removeChild(dice);
    });
    dicePressed.on("mouseout", function () {
        stage.addChild(dice);
        stage.removeChild(dicePressed);
    });
    dicePressed.on("click", random);

}


//generates random numbers for the 3 variables of the game
function random() {

    playSound("roll");
    velocity = RandomNum(0, 6);
    mass = RandomMass(0, 100);
    radius = RandomNum(5, 8);

    velocityOutput.text = velocity;
    massOutput.text = mass;
    radiusOutput.text = radius;

    velocitySlider.value = velocity;
    massSlider.value = mass;
    radiusSlider.value = radius;
    container.scaleX = container.scaleY  = radius / 8.5 * 1.1;
    

}

//returns a random number including min and max 
function RandomNum(min, max) {
    var randomnumber = Math.random() * (max - min + 1) + min;
    return Math.round(randomnumber*2)/2; //to get 0.5 values
}

function RandomMass(min, max) {
    var randomnumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomnumber; // integer only for masss
}




//////////////////////// PRELOADJS FUNCTIONS

// bitmap variables
var muteButton, unmuteButton;
var background;
var circle;
var ferrisWheelStand;
var passenger;
var dice, dicePressed;


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
             src: "sounds/rolling.mp3",
             id: "roll"
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
            src: "images/dice.png",
            id: "dice"

        },{
            src: "images/dicePressed.png",
            id: "dicePressed"

        },
        {
            src: "images/circle.png",
            id: "circle"
          },
        {
            src: "images/passenger_small.png",
            id: "passenger"
          }, {
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
    } else if (event.item.id == "dice") {
        dice = new createjs.Bitmap(event.result)
    }else if (event.item.id == "dicePressed") {
        dicePressed = new createjs.Bitmap(event.result)
    }else if (event.item.id == "circle") {
        circle = new createjs.Bitmap(event.result);
    } else if (event.item.id == "ferrisWheelStand") {
        ferrisWheelStand = new createjs.Bitmap(event.result);
    } else if (event.item.id == "passenger") {
        passenger = new createjs.Bitmap(event.result);
    }
}

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
