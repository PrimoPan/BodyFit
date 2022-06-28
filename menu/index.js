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
let p01,p01_1,kj,p04,p04_1,p02,p02_1,p05_1,p05;
let p03,p03_1;
let p06,p06_1;
//preloading png files
function preload() { //open preload
    texture = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual992149/hd09f8b6836fc950ad871f8806cfda627/BG.png');
    p01=loadImage("./001.png");
    p01_1=loadImage("./001-1.png")
    kj=loadImage("./kj.png")
    p04=loadImage("./004.png")
    p04_1=loadImage("./004_4.png")
    p02=loadImage("./002.png")
    p02_1=loadImage("002_1.png")
    p05=loadImage("./p05.png")
    p05_1=loadImage("./p05_1.png")
    p03=loadImage("./003.png")
    p03_1=loadImage("./003_1.png")
    p06=loadImage("./006.png")
    p06_1=loadImage("./006_1.png")
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




    //create first set of objects BEFORE frames start counting
    //ALREADY IN FRAME WHEN INITIALIZED

} //close setup
let kjx1,kjy1,kjx2,kjy2,kj4x1,kj4x2,kj4y1,kj4y2;
let kj2x1,kj2x2,kj2y1,kj2y2;
let kj5x1,kj5x2,kj5y1,kj5y2;
let kj3x1,kj3x2,kj3y1,kj3y2;
let kj6x1,kj6x2,kj6y1,kj6y2;
function draw() { //open draw
    background(texture);
    //kj 450-115
    image(kj,W*0.18,H/9)
    kjx1=W*0.18;kjy1=H/9;
    kjx2=kjx1+450;
    kjy2=kjy1+115;
    image(p01,W*0.19,H*0.14)
    kj4x1=W*0.5;kj4y1=H/9;
    kj4x2=kj4x1+450;
    kj4y2=kj4y1+115;
    if (judgeIn(mouseX,mouseY,kjx1,kjy1,kjx2,kjy2))
    {
        image(p01_1,W*0.19,H*0.14)
    }
    image(kj,W*0.5,H/9);
    image(p04,W*0.51,H*0.14);
    if (judgeIn(mouseX,mouseY,kj4x1,kj4y1,kj4x2,kj4y2))
    {
        image(p04_1,W*0.51,H*0.14)
    }
    image(kj,W*0.18,H*0.3)
    kj2x1=W*0.18;kj2y1=H*0.3;
    kj2x2=kj2x1+450;kj2y2=kj2y1+115;
    image(p02,W*0.182,H*0.33)
    if (judgeIn(mouseX,mouseY,kj2x1,kj2y1,kj2x2,kj2y2))
    {
        image(p02_1,W*0.182,H*0.33)
    }

    image(kj,W*0.5,H*0.3)
    kj5x1=W*0.5;kj5y1=H*0.3;
    kj5x2=kj5x1+450;kj5y2=kj5y1+115;
    image(p05,W*0.503,H*0.33);
    if (judgeIn(mouseX,mouseY,kj5x1,kj5y1,kj5x2,kj5y2))
    {
        image(p05_1,W*0.503,H*0.33);
    }
    image(kj,W*0.18,H*0.4889)
    image(p03,W*0.183,H*(0.4889+0.03));
    kj3x1=W*0.18;kj3y1=H*0.4889;
    kj3x2=kj3x1+450;kj3y2=kj3y1+115;
    if (judgeIn(mouseX,mouseY,kj3x1,kj3y1,kj3x2,kj3y2))
    {
        image(p03_1,W*0.183,H*(0.4889+0.03));
    }
    image(kj,W*0.5,H*0.4889);
    image(p06,W*0.51,H*(0.4889+0.035),400,35);
    kj6x1=W*0.5;kj6y1=H*0.4889;
    kj6x2=kj6x1+450;kj6y2=kj6y1+115;
    if (judgeIn(mouseX,mouseY,kj6x1,kj6y1,kj6x2,kj6y2))
    {
        image(p06_1,W*0.51,H*(0.4889+0.035),400,35);
    }

    //background(255);
}
let judgeIn=(x,y,x1,y1,x2,y2)=>
{
    if (x>=x1 && x<=x2 && y>=y1 && y<=y2)
    {
        return true;
    }
    return false;
}
function mouseClicked()
{
    console.log("click")
    if (judgeIn(mouseX,mouseY,plusX1,plusY1,plusX2,plusY2))
    {
        age++;
        console.log("add ",age)
        reload_input();
    }
    if (judgeIn(mouseX,mouseY,minX1,minY1,minX2,minY2))
    {
        age--;
        console.log("minus ",age);
        reload_input();
    }
    if (judgeIn(mouseX,mouseY,plusX3,plusY3,plusX4,plusY4))
    {
        heartrate++;
        reload_input();
    }
}

//=================================================================================

//

//=================================================================================

