"use strict";
let Game = (function(){
    // Game variable declarations
    let canvas = document.getElementsByTagName('canvas')[0];
    let stage;
    let assets;
    //Game labels
    let diceLabel1;
    let diceLabel2;
    let resultLabel;
    //Game buttons
    let rollButton;
    let startOverButton;
    //Game dices
    let diceImage1;
    let diceImage2;
    //Game Background
    let gameBackground; 

    let assetManifest = 
    [
        { id: "1", src: "../Assets/images/1.png" },
        { id: "2", src: "../Assets/images/2.png" },
        { id: "3", src: "../Assets/images/3.png" },
        { id: "4", src: "../Assets/images/4.png" },
        { id: "5", src: "../Assets/images/5.png" },
        { id: "6", src: "../Assets/images/6.png" },
        {id:"background", src:"../Assets/images/background3.jpg"},
        {id:"beginGame", src:"../Assets/images/beginGame.png"},
        {id:"rollButton", src:"../Assets/images/rollButton.png"},
        {id:"startOverButton", src:"../Assets/images/startOverButton.png"}
    ];
    function Preload() 
    {
        console.log(`%c Preload Function`, "color: grey; font-size: 14px; font-weight: bold;");
        assets = new createjs.LoadQueue(); // asset container 
        assets.installPlugin(createjs.Sound); // supports sound preloading
        assets.loadManifest(assetManifest);
        assets.on("complete", Start);
    }
    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start() 
    {
        console.log(`%c Start Function`, "color: grey; font-size: 14px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = Config.Game.FPS;
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);
        Config.Game.ASSETS = assets; // make a reference to the assets in the global config
        Main();
    }
    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn
     */
    function Update() 
    {
        stage.update();
    }
    // Generation of Random numbers
    function generateRandom()
    {
        return Math.floor(Math.random()*(6)+1);
    }
    // This function will change the images based on random numbers generated
   
   
    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function Main() 
    {
        console.log(`%c Main Function`, "color: grey; font-size: 14px; font-weight: bold;");
        // Game Background
        gameBackground = new Core.GameObject("background", Config.Game.CENTER_X, Config.Game.CENTER_Y, true);
        stage.addChild(gameBackground);
        // Game Buttons
        rollButton = new UIObjects.Button("rollButton",Config.Game.CENTER_X, Config.Game.CENTER_Y + 100, true);
        stage.addChild(rollButton);
        startOverButton = new UIObjects.Button("startOverButton",Config.Game.CENTER_X, Config.Game.CENTER_Y + 170, true);
        stage.addChild(startOverButton);
        rollButton.on("click", () =>
        {
            console.log("roll button clicked");
            let randomNumber1 =  generateRandom();
            let randomNumber2 = generateRandom();
            let result = randomNumber1 + randomNumber2;
            
               //to remove previously rolled dices and their respective lables
                stage.removeChild(diceImage1, diceImage2, diceLabel1, diceLabel2,resultLabel);
                //adds the first dice to left of the stage
                diceImage1 = new Core.GameObject(randomNumber1.toString(), Config.Game.CENTER_X - 200, Config.Game.CENTER_Y - 120, true);
                stage.addChild(diceImage1);
                //adds the second dice to right of the stage
                diceImage2 = new Core.GameObject(randomNumber2.toString(), Config.Game.CENTER_X + 200, Config.Game.CENTER_Y - 120, true);
                stage.addChild(diceImage2);
                //adds the label below left dice
                diceLabel1 = new UIObjects.Label(randomNumber1.toString(), "40px", "Consolas", "#000000", Config.Game.CENTER_X - 200, Config.Game.CENTER_Y, true);
                stage.addChild(diceLabel1);
                //adds the label below right dice
                diceLabel2 = new UIObjects.Label(randomNumber2.toString(), "40px", "Consolas", "#000000", Config.Game.CENTER_X + 200, Config.Game.CENTER_Y, true);
                stage.addChild(diceLabel2);
                resultLabel = new UIObjects.Label(result.toString(), "30px", "Consolas", "#000000", Config.Game.CENTER_X, Config.Game.CENTER_Y + 50, true);
                stage.addChild(resultLabel);
        });

        diceImage1 = new Core.GameObject("beginGame", Config.Game.CENTER_X - 200, Config.Game.CENTER_Y - 120, true);
        stage.addChild(diceImage1);
        diceImage2 = new Core.GameObject("beginGame", Config.Game.CENTER_X + 200, Config.Game.CENTER_Y - 120, true);
        stage.addChild(diceImage2); 

        startOverButton.on("click", ()=>
        {
            stage.removeChild(diceImage1, diceImage2, diceLabel1, diceLabel2, resultLabel)
            
            diceImage1 = new Core.GameObject("beginGame", Config.Game.CENTER_X - 200, Config.Game.CENTER_Y - 120, true);
            stage.addChild(diceImage1);

            diceImage2 = new Core.GameObject("beginGame", Config.Game.CENTER_X + 200, Config.Game.CENTER_Y - 120, true);
            stage.addChild(diceImage2);

        });
    
    }
    window.addEventListener('load', Preload);
})();
//# sourceMappingURL=game.js.map