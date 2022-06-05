let video;
//视频
let pose;
let st2;
let preX,preY;
let bdx1,bdy1,bdx2,bdy2;
//存放身体坐标信息
let skeleton;
let bird;
let handpose;
let arrow;
let St;
let B01,B02;
let predictions=[];

modelLoaded=()=>
{
    console.log("model ready")
}


gotPoses=(poses)=>{

    if (poses.length>0){
        //  console.log(poses)
        pose=poses[0].pose;

        skeleton=poses[0].skeleton;
    }
}

//MUSIC AND SOUNDS
let music1;
let music2;
let music3;
let ambience;
let roar;

let musicList = [music1, music2, music3];

//define object arrays
let BGrounds = []; //background layers
let MGrounds = []; //midground layers
let FGrounds = []; //foreground layers
let FG_fogs = []; //foreground fog layers
let MG_fogs = []; //midground fog layers

//DEFINE ART LAYERS
//canvas paper texture
let texture;
//foreground
let fg1;
let fg2;
let fg3;
//midground
let mg1;
let mg2;
let mg3;
//background
let bg1;
let bg2;
let bg3;
//fog
let fog1;
let fog2;
let fog3;

//create arrays of art layers
let fg = [fg1, fg2, fg3]; //foreground assets
let mg = [mg1, mg2, mg3]; //midground assets
let bg = [bg1, bg2, bg3]; //background assets
let fog = [fog1, fog2, fog3]; //fog assets

//preloading png files
function preload() { //open preload
    arrow=loadImage('./arrow.webp')
    St=loadImage("./st.png")
    st2=loadImage("./st2.png")
    B01=loadImage("./b03.png")
    B02=loadImage("./b02.png")
    texture = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual992149/hd09f8b6836fc950ad871f8806cfda627/BG.png');
    fg[0] = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/FG1.png');
    fg[1] = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/FG2.png');
    fg[2] = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/FG3.png');
    mg[0] = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/MG1.png');
    mg[1] = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/MG2.png');
    mg[2] = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/MG3.png');
    bg[0] = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/BG1.png');
    bg[1] = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/BG2.png');
    bg[2] = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/BG3.png');
    fog[0] = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/FOG1.png');
    fog[1] = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/FOG2.png');
    fog[2] = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/FOG3.png');

    //bird
    bird = loadAnimation('https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/bird1.png',
        'https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/bird2.png',
        'https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/bird3.png',
        'https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/bird4.png',
        'https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/bird5.png',
        'https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/bird6.png',
        'https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/bird7.png',
        'https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/bird8.png',
        'https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/bird9.png',
        'https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/bird10.png',
        'https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/bird11.png',
        'https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/bird12.png',
        'https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/bird13.png',
        'https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/bird14.png',
        'https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/bird15.png',
        'https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/bird16.png');


    music1 = loadSound('https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/mus1.mp3');
    music2 = loadSound('https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/mus2.mp3');
    music3 = loadSound('https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/mus3.mp3');
    ambience = loadSound('https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/Mountain%20Sound%20effect%20with%20distant%20Eagles%20screaming.mp3');
    roar = loadSound('https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/roar.mp3');
} //close preload

//====================================================================================
modelReady=()=>
{
    console.log("loaded",predictions);
}
var H,W;
function setup() { //open setup

    H=screen.height;
    W=screen.width;
    createCanvas(W, H);
    video=createCapture(VIDEO)
   // video.size(W,H)
    translate(video.width,0)
    scale(-1,1)
   // video.hide();
    let poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
    handpose = ml5.handpose(video, modelReady);
    handpose.on("predict", results => {
        predictions = results;

        //  console.log(predictions)
    })
    //playMusic();

    music3.setLoop(true);
    music3.setVolume(0.1);
    music3.play();

    ambience.setLoop(true);
    ambience.setVolume(0.3);
    ambience.play();

    //create first set of objects BEFORE frames start counting
    //ALREADY IN FRAME WHEN INITIALIZED
    let BGroundStart1 = new BGround(0);
    append(BGrounds, BGroundStart1);
    let MGroundStart1 = new MGround(0);
    append(MGrounds, MGroundStart1);
    let MG_fogStart1 = new MG_fog(0, -100);
    append(MG_fogs, MG_fogStart1);
    let FGroundStart1 = new FGround(0);
    append(FGrounds, FGroundStart1);
    let FG_fogStart1 = new FG_fog(0);
    append(FG_fogs, FG_fogStart1);

    //TESTING ANIMATIONS - COMMENT OUT FOR FINAL
    //foregroundBird();
    //midgroundBird();

    //create second set of objects BEFORE frames start counting
    //OFFSCREEN BY 800 PIXELS WHEN INITIALIZED
    let BGroundStart2 = new BGround(800);
    append(BGrounds, BGroundStart2);
    let MGroundStart2 = new MGround(800);
    append(MGrounds, MGroundStart2);
    let MG_fogStart2 = new MG_fog(800, -100);
    append(MG_fogs, MG_fogStart2);
    let FGroundStart2 = new FGround(800);
    append(FGrounds, FGroundStart2);
    let FG_fogStart2 = new FG_fog(800);
    append(FG_fogs, FG_fogStart2);

} //close setup

function draw() { //open draw
    background(texture);
    //background(255);

    if (frameCount>=276) {
      if (frameCount<=340)
       {
           tint(255,(frameCount-276)*4);
       }
      else{
          let xw=St.width;
          let xh=St.height;
          xw/=2;
          xh/=2;
          image(St,W/2-xw/2,H*0.75,xw,xh)
          bdx1=W/2-xw/2;
          bdy1=H*0.75;
          bdx2=bdx1+xw;
          bdy2=bdy1+xh;
      }
      //  else notint();

        //create a new BGround object every 1600 frames and add it to the BGrounds array
        if (frameCount % 1600 == 0) {
            let BGround1 = new BGround(1200);
            append(BGrounds, BGround1);
        }

        //create a new MGround object every 500 frames and add it to the MGrounds array
        if (frameCount % 500 == 0) {
            let MGround1 = new MGround(1200);
            append(MGrounds, MGround1);
        }

        //create new midground bird sprite every 900 frames
        if (frameCount % 900 == 0) {
            midgroundBird();
        }

        //create a new MG_fog object every 800 frames and add it to the MG_fogs array
        if (frameCount % 900 == 0) {
            let MG_fog1 = new MG_fog(1200, random(-100, -200));
            append(MG_fogs, MG_fog1);
        }

        //create a new FGround object every 400 frames and add it to the FGrounds array
        if (frameCount % 400 == 0) {
            let FGround1 = new FGround(1200);
            append(FGrounds, FGround1);
        }

        //create new foreground bird sprite every 800 frames
        if (frameCount % 800 == 0) {
            foregroundBird();
        }

        //create a new FG_fog object every 800 frames and add it to the FG_fogs array
        if (frameCount % 800 == 0) {
            let FG_fog1 = new FG_fog(1200);
            append(FG_fogs, FG_fog1);
        }

//=======================================================================================================

        //call show() function for every object in BGrounds array
        for (let i = 0; i < BGrounds.length; i++) {
            BGrounds[i].show();
        }


        //call show() function for every object in MGrounds array
        for (let i = 0; i < MGrounds.length; i++) {
            MGrounds[i].show();
        }

        //call show() function for every object in MG_fogs array
        for (let i = 0; i < MG_fogs.length; i++) {
            MG_fogs[i].show();
        }

        //call show() function for every object in FGrounds array
        for (let i = 0; i < FGrounds.length; i++) {
            FGrounds[i].show();
        }

        drawSprites();

        //call show() function for every object in FG_fogs array
        for (let i = 0; i < FG_fogs.length; i++) {
            FG_fogs[i].show();
        }
        if (predictions[0]) {
            // console.log(predictions);
            let anno = predictions[0].annotations;
            // console.log(anno);
            let X = anno.indexFinger[3][0];
            let Y = anno.indexFinger[3][1];
            X = (X / video.width) * W;
            Y = (Y / video.height) * H;
            X = W - X;
            if (preX && preY)
            {
                if (Math.abs(preX-X)<=4 || Math.abs(preY-Y)<=4)
                {
                    X=preX;
                    Y=preY;
                }
            }
            if (X>=bdx1 && Y>=bdy1 && X<=bdx2 && Y<=bdy2)
            {
                //console.log("in");
                let xw=st2.width;
                let xh=st2.height;
                xw/=2;
                xh/=2;
                image(st2,W/2-xw/2,H*0.75,xw,xh)
              //  bdx1=W/2-xw/2;
             //   bdy1=H*0.75;
             //   bdx2=bdx1+xw;
             //   bdy2=bdy1+xh;
            }
            image(arrow, X, Y, 50, 50)
            preX=X;
            preY=Y;
        }
    }
    else{
        let ct;
        if (frameCount>=10) {
            let FT=frameCount-10;
            if (FT<=128) {
                ct = FT * 2;
            } else ct = 256 - (FT - 128) * 2;
            tint(255, ct);
            /*
                B01:638*143
             */
            image(B01, (W / 2) - 140, 0);
        }
       // image(B02,(W/2)-319/2+5,(H/3)-71,319,71)
    }
    //animation(bird, width/2, height/2);

} //close draw

//=================================================================================

//ANIMATED SPRITES//

function foregroundBird() {
    let birdSprite = createSprite(1300, random(100, 450)); birdSprite.scale = random(0.35, 0.5);
    birdSprite.addAnimation('flying', bird);
    birdSprite.velocity.x = -4
    birdSprite.velocity.y = random(-0.1, 0.1)
    birdSprite.life = 1000;
}

function midgroundBird() {
    let birdSprite = createSprite(1300, random(100, 400)); birdSprite.scale = random(0.2, 0.3);
    birdSprite.addAnimation('flying', bird);
    birdSprite.velocity.x = -2
    birdSprite.velocity.y = random(-0.1, 0.1)
    birdSprite.life = 1000;
}


//=================================================================================

//BACKGROUND OBJECT CLASS
class BGround { //open BGround
    constructor(x) { //open constructor
        this.x = x;
        this.y = 0;
        this.speed = 0.3;
        this.bg = random(bg);
    } //close constructor

    show() { //open show
        image(this.bg, this.x, this.y);
        this.x -= this.speed;
    } //close show

} //close BGround

//MIDGROUND OBJECT CLASS
class MGround { //open MGround
    constructor(x) { //open constructor
        this.x = x;
        this.y = 0;
        this.speed = random(0.8, 1);
        this.mg = random(mg);
    } //close constructor

    show() { //open show
        image(this.mg, this.x, this.y);
        this.x -= this.speed;
    } //close show

} //close MGround

//FOREGROUND OBJECT CLASS
class FGround { //open FGround
    constructor(x) { //open constructor
        this.x = x;
        this.y = 0;
        this.speed = random(1.5, 2);
        this.fg = random(fg);
    } //close constructor

    show() { //open show
        image(this.fg, this.x, this.y);
        this.x -= this.speed;
    } //close show

} //close FGround

//FOREGROUND FOG OBJECT CLASS
class FG_fog { //open FG_fog
    constructor(x) { //open constructor
        this.x = x;
        this.y = 0;
        this.speed = random(1, 1.4);
        this.fg = random(fog);
    } //close constructor

    show() { //open show
        image(this.fg, this.x, this.y);
        this.x -= this.speed;
    } //close show

} //close FG_fog

//MIDGROUND FOG OBJECT CLASS
class MG_fog { //open MG_fog
    constructor(x, y) { //open constructor
        this.x = x;
        this.y = y;
        this.speed = random(0.7, 0.9);
        this.fg = random(fog);
    } //close constructor

    show() { //open show
        image(this.fg, this.x, this.y);
        this.x -= this.speed;
    } //close show

} //close MG_fog