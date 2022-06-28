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

//====================================================================================
modelReady=()=>
{
    console.log("loaded",predictions);
}
var H,W;
let heartrate=70;
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
    tvideo=createVideo("./taichi.mp4")
    tvideo.position(W*0.6,0)
    tvideo.size(500)
    //create first set of objects BEFORE frames start counting
    //ALREADY IN FRAME WHEN INITIALIZED

} //close setup
var plusX1,plusX2,plusY1,plusY2,minX1,minX2,minY1,minY2;
var plusX3,plusX4,plusY3,plusY4,minX3,minX4,minY4,minY3;
function draw() { //open draw
    background(texture);
    image(video,0,0,300)
} //close draw
function mouseClicked()
{
    tvideo.play();

}