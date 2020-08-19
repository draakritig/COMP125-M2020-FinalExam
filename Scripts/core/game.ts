let Game = (function(){

    // variable declarations
    let canvas:HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage:createjs.Stage;
    let assets: createjs.LoadQueue;

    let diceLabel1: UIObjects.Label;
    let diceLabel2: UIObjects.Label;
    let rollButton: UIObjects.Button;
    let diceButton1: UIObjects.Button;
    let diceButton2: UIObjects.Button;
    let randomNumber1 = 0;
    let randomNumber2 = 0;    

    let assetManifest = 
    [
        {id:"1", src:"../Assets/images/1.png"},
        {id:"2", src:"../Assets/images/2.png"},
        {id:"3", src:"../Assets/images/3.png"},
        {id:"4", src:"../Assets/images/4.png"},
        {id:"5", src:"../Assets/images/5.png"},
        {id:"6", src:"../Assets/images/6.png"},
        {id:"backButton", src:"../Assets/images/startButton.png"},
        {id:"background", src:"../Assets/images/bckgrnd.jpg"},
        {id:"blank", src:"../Assets/images/blank.png"},
        {id:"button", src:"../Assets/images/button.png"},
        {id:"nextButton", src:"../Assets/images/nextButton.png"},
        {id:"placeholder", src:"../Assets/images/placeholder.png"},
        {id:"resetButton", src:"../Assets/images/resetButton.png"},
        {id:"rollButton", src:"../Assets/images/rollButton.png"},
        {id:"startButton", src:"../Assets/images/startButton.png"},
        {id:"startOverButton", src:"../Assets/images/startOverButton.png"}
    ];

    function Preload():void
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
    function Start():void
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
    function Update():void
    {
        stage.update();
    }
    function switchImage(dicesImg: number): string 
    {
        var imageSrc;
        switch (dicesImg) {
            case 0:
                imageSrc = "../Assets/images/blank.png";
                break;
            case 1:
                imageSrc = "../Assets/images/1.png";
                break;
            case 2:
                imageSrc = "../Assets/images/2.png";
                break;
            case 3:
                imageSrc = "../Assets/images/3.png";
                break;
            case 4:
                imageSrc = "../Assets/images/4.png";
                break;
            case 5:
                imageSrc = "../Assets/images/5.png";
                break;
            case 6:
                imageSrc = "../Assets/images/6.png";
                break;
        }

        return imageSrc;
    }

    function generateRandom():void
    {
        randomNumber1 = Math.floor((Math.random() * 6) + 1);
        randomNumber2 = Math.floor((Math.random() * 6) + 1);
    } 
    function rollButton_clicked(): void 
    {
        generateRandom();

        let imagesDice1 = switchImage(randomNumber1);
        let imagesDice1 = switchImage(randomNumber2);
        diceButton1 = imagesDice1;
        diceButton2 = imagesDice2;
        diceLabel1 = randomNumber1;
        diceLabel2 = randomNumber2;

        //main(imagesForDice1,imagesForDice1);
        //stage.update();
    }

    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function Main():void
    {
        console.log(`%c Main Function`, "color: grey; font-size: 14px; font-weight: bold;");
        //Game Labels
        diceLabel1 = new UIObjects.Label("blank", "40px", "Consolas", "#000000", Config.Game.CENTER_X + 150, Config.Game.CENTER_Y + 20, true);
        stage.addChild(diceLabel1);
        diceLabel2 = new UIObjects.Label("blank", "40px", "Consolas", "#000000", Config.Game.CENTER_X - 150, Config.Game.CENTER_Y + 20, true);
        stage.addChild(diceLabel2);
        // Game Buttons
        rollButton = new UIObjects.Button("rollButton",Config.Game.CENTER_X, Config.Game.CENTER_Y + 100, true);
        stage.addChild(rollButton);
        diceButton1 = new UIObjects.Button("1",Config.Game.CENTER_X + 150, Config.Game.CENTER_Y - 100, true);
        stage.addChild(diceButton1);
        diceButton2 = new UIObjects.Button("2",Config.Game.CENTER_X - 150, Config.Game.CENTER_Y - 100, true);
        stage.addChild(diceButton2);
        rollButton.on("click", rollButton_clicked)()
        {
            console.log("roll button clicked");
        };
    
    }

    window.addEventListener('load', Preload);


})();