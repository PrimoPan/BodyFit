let video;
//视频
let pose;
let AddP;
let st2;
let Heart;
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
let ave;
let smile;
let taichi;
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
let svg;
let roar;
let p01;

let musicList = [music1, music2, music3];

//define object arrays

//DEFINE ART LAYERS
//canvas paper texture
let texture;
let tvideo;
//foreground
//preloading png files
function preload() { //open preload
    texture = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual992149/hd09f8b6836fc950ad871f8806cfda627/BG.png');
    music1 = loadSound('https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/mus1.mp3');
    music2 = loadSound('https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/mus2.mp3');
    music3 = loadSound('https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/mus3.mp3');
    ambience = loadSound('https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/Mountain%20Sound%20effect%20with%20distant%20Eagles%20screaming.mp3');
    roar = loadSound('https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual994970/h55771969c746baea79cf3d0f6aa1787e/roar.mp3');

} //close preload
let cry;
//====================================================================================
modelReady=()=>
{
    console.log("loaded",predictions);
}
var H,W;
let heartrate=70;
function setup() { //open setup
    ave=loadImage("./ave.svg")
    svg=loadImage("./test.svg")
    cry=loadImage("./cry.svg")
    smile=loadImage("./smile.svg")
    p01=loadImage("./001.png")
    H=screen.height;
    W=screen.width;
    createCanvas(W, H);
    video=createCapture(VIDEO)
    taichi=loadImage("./taichi.png")
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
    smile=loadImage("./smile.svg")
    ambience.setLoop(true);
    ambience.setVolume(0.3);
    ambience.play();
    tvideo=createVideo("./taichi.mp4")
    tvideo.position(W*0.6,H/5)
    tvideo.size(720)
    //create first set of objects BEFORE frames start counting
    //ALREADY IN FRAME WHEN INITIALIZED

} //close setup

function draw() { //open draw
    background(texture);

    image(svg,50,0)
    image(p01,500,73)
    image(taichi,10,-70)
    image(video,200,H/5,649,720)
  //  image(ave, W*0.45, H*0.4);
    let X=W*0.45;
    let Y=H*0.4;
    if (frameCount>=350 && frameCount<=470) {
        image(ave, X, Y);
    }
    if (frameCount>=510 && frameCount<=740)
    {
        image(smile,X,Y)
    }
    if (frameCount>=790 && frameCount<=950)
    {
        image(cry,X,Y)
    }
    if (frameCount>=970 && frameCount<=1400)
    {
        image(smile,X,Y)
    }
    //image(smile,270,330);
} //close draw
function mouseClicked()
{
    tvideo.play();

}