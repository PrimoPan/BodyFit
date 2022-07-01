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
let score=0;
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
let LUball=[];
let RUball=[];
let LDball=[];
let RDball=[];
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


    //create first set of objects BEFORE frames start counting
    //ALREADY IN FRAME WHEN INITIALIZED

} //close setup
var LeftK,RightK;
function draw() { //open draw
    background(texture);
    textSize(128);
    text('得分：', W/3+128, H/2);
    text(score,W/3+128*3+128,H/2);
    fill(0, 102, 153);
        // console.log(predictions);
    if (pose)
    {

        if (frameCount%5==0) {
            console.log(pose)
            LeftW = pose.leftWrist;
            LeftK=pose.leftKnee;
            LeftK.x=(LeftK.x/video.width)*W;
            LeftK.y=(LeftK.y/video.height)*H;
            LeftK.x=W-LeftK.x;
            console.log(LeftW);
            LeftW.x = (LeftW.x / video.width) * W;
            LeftW.y = (LeftW.y / video.height) * H;
            LeftW.x = W - LeftW.x;
            RightW = pose.rightWrist;
            RightW.x = (RightW.x / video.width) * W;
            RightW.y = (RightW.y / video.height) * H;
            RightW.x = W - RightW.x;
            RightK=pose.rightKnee;
            RightK.x=(RightK.x/video.width)*W;
            RightK.y=(RightK.y/video.height)*H;
            RightK.x=W-RightK.x;
            image(taichi, LeftW.x, LeftW.y);
            image(taichi, RightW.x, RightW.y)
            image(taichi,RightK.x,RightK.y);
            image(taichi,LeftK.x,LeftK.y);
        }
        else{
            if (LeftW && RightW && RightK && LeftK){
            image(taichi, LeftW.x, LeftW.y);
            image(taichi, RightW.x, RightW.y)
                image(taichi,RightK.x,RightK.y);
                image(taichi,LeftK.x,LeftK.y);}
        }
        if (frameCount%80==0)
        {
             let rd=Math.floor(Math.random()*5);
             if (rd===0) {
                 let nb = new Ballup(0, 100);
                 append(LUball, nb);
             }
             if (rd===1)
             {
                 let nb=new Ballrt(W,100);
                 append(RUball,nb);
             }
             if (rd===2)
             {
                 let nb=new Ballup(0,H*0.6);
                 append(LDball,nb)
             }
             if (rd===3)
             {
                 let nb=new Ballrt(W,H*0.6)
                 append(RDball,nb)
             }
        }
    }
    for (let i=0;i<LUball.length;i++)
    {
        LUball[i].show();
    }
    for (let i=0;i<RUball.length;i++)
    {
        RUball[i].show();
    }
    for (let i=0;i<LDball.length;i++)
    {
        LDball[i].show();
    }
    for (let i=0;i<RDball.length;i++)
    {
        RDball[i].show();
    }
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
        this.bol=true;
    }
    show()
    {
        if (this.bol) {
            image(balll, this.x, this.y)
            this.x += this.speed;
            if (dist(this.x, this.y, LeftW.x, LeftW.y) <= 30 || dist(this.x, this.y, RightW.x, RightW.y) <= 30) {
                this.x = 100000;
                score+=10;
                this.bol=false;
            }
            if (dist(this.x,this.y,LeftK.x,LeftK.y)<=40 || dist(this.x,this.y,RightK.x,RightK.y)<=40){
                this.x=100000;
                score+=20;
                this.bol=false;
            }
        }
    }
}
class Ballrt{
    constructor(x,y) {
        this.x=x;
        this.y=y;
        this.speed=5;

        this.bol=true;
    }
    show()
    {
        if (this.bol) {
            image(balll, this.x, this.y)
            this.x -= this.speed;
            if (dist(this.x, this.y, LeftW.x, LeftW.y) <= 30 || dist(this.x, this.y, RightW.x, RightW.y) <= 30) {
                this.x = 100000;
                score+=10;
                this.bol = false;
            }
            if (dist(this.x,this.y,LeftK.x,LeftK.y)<=40 || dist(this.x,this.y,RightK.x,RightK.y)<=40){
                this.x=100000;
                score+=20;
                this.bol=false;
            }
        }
    }
}