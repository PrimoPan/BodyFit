let video;
//视频
let pose;
let AddP;
let st2;
let preX,preY;
let bdx1,bdy1,bdx2,bdy2;
//存放身体坐标信息
let skeleton;
let bird;
let handpose;
let arrow;
var age=50;
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
let AgeP;
let MinP;
//create arrays of art layers
let info;
//preloading png files
function preload() { //open preload
    texture = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual992149/hd09f8b6836fc950ad871f8806cfda627/BG.png');
    music1 = loadSound('https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/mus1.mp3');
    music2 = loadSound('https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/mus2.mp3');
    music3 = loadSound('https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/mus3.mp3');
    ambience = loadSound('https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/Mountain%20Sound%20effect%20with%20distant%20Eagles%20screaming.mp3');
    info=loadImage("./info.png");
    AgeP=loadImage("./age.png")
    AddP=loadImage("./add-circle 1.png");
    MinP=loadImage("./minus-circle 1.png");
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

    let inputElem = createInput(age);
    inputElem.position(W*0.53,H*0.245+3)
    inputElem.size(100);
    inputElem.input(typing);
    //create first set of objects BEFORE frames start counting
    //ALREADY IN FRAME WHEN INITIALIZED

} //close setup
var plusX1,plusX2,plusY1,plusY2;
function draw() { //open draw
    background(texture);
    //background(255);
    image(info,W*0.3,H*0.095)
    image(AgeP,W*0.315,H*0.205)
    image(AddP,W*0.65,H*0.205+20,50,50)
    plusX1=W*0.65;
    plusY1=H*0.205+20;
    plusX2=plusX1+50;
    plusY2=plusY1+50;
    image(MinP,W*0.42,H*0.205+20,50,50)


    /*  if (frameCount>=276) {
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

                  B01:638*143

              image(B01, (W / 2) - 140, 0);
          }
          // image(B02,(W/2)-319/2+5,(H/3)-71,319,71)

      //animation(bird, width/2, height/2);
  */
} //close draw
let judgeIn=(x,y,x1,y1,x2,y2)=>
{
    if (x>=x1 && x<=x2 && y>=y1 && y<=y2)
    {
        return true;
    }
    return false;
}
function typing()
{
    age=this.value();
    console.log("age:",age)
}
function mouseClicked()
{
    console.log("click")
    if (judgeIn(mouseX,mouseY,plusX1,plusY1,plusX2,plusY2))
    {
        age++;
        console.log("add ",age)
        let inputElem = createInput(age);
        inputElem.position(W*0.53,H*0.245+3)
        inputElem.size(100);
        inputElem.input(typing);
    }
}
//=================================================================================

//

//=================================================================================

