let video;
//视频
let pose;
let AddP;
let st2;
let balll;
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
var LeftW,RightW;
let musicList = [music1, music2, music3];

//define object arrays

//DEFINE ART LAYERS
//canvas paper texture
let texture;
let tvideo;
let taichi;
//foreground
//preloading png files
var bb;
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
    balll=loadImage("ball.jpg")
    H=screen.height;
    W=screen.width;
    taichi=loadImage("./taichi.png")
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
     bb=new Ballup(0,200);


    //create first set of objects BEFORE frames start counting
    //ALREADY IN FRAME WHEN INITIALIZED

} //close setup

function draw() { //open draw
    background(texture);

        // console.log(predictions);
    if (pose)
    {

        if (frameCount%5==0) {
            //console.log(pose)
            LeftW = pose.leftWrist;
            console.log(LeftW);
            LeftW.x = (LeftW.x / video.width) * W;
            LeftW.y = (LeftW.y / video.height) * H;
            LeftW.x = W - LeftW.x;
            RightW = pose.rightWrist;
            RightW.x = (RightW.x / video.width) * W;
            RightW.y = (RightW.y / video.height) * H;
            RightW.x = W - RightW.x;
            image(taichi, LeftW.x, LeftW.y);
            image(taichi, RightW.x, RightW.y)
        }
        else{
            if (LeftW && RightW){
            image(taichi, LeftW.x, LeftW.y);
            image(taichi, RightW.x, RightW.y)}
        }
    }
     bb.show();

} //close draw
function mouseClicked()
{
    tvideo.play();

}
class Ballup{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.speed=5;
    }
    show()
    {
        image(balll,this.x,this.y)
        this.x+=this.speed;
    }
}