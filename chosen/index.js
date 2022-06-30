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
let svg;
let guide;
let taichi;
//preloading png files
function preload() { //open preload
    texture = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user237173/visual992149/hd09f8b6836fc950ad871f8806cfda627/BG.png');
} //close preload
let bgt,ball;
//====================================================================================
modelReady=()=>
{
    console.log("loaded",predictions);
}
var H,W;
let beat;
let prop;
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
    svg=loadImage("./test.svg");
    console.log(svg)
    //playMusic();
    guide=loadImage("./guide.png")
    prop=loadImage("./prop.png")
    bgt=loadImage("./bgt.png")
    ball=loadImage("./ball.png")
    taichi=loadImage("./taichi.png")
    beat=loadImage("./beat.png")
    //create first set of objects BEFORE frames start counting
    //ALREADY IN FRAME WHEN INITIALIZED

} //close setup
function draw() { //open draw
    background(texture);
    //kj 450-115
    image(svg,50,0);
    image(guide,-200,-60)
    image(prop,W*0.3,H*0.02);
    image(bgt,W*0.215,H*0.312);
    image(ball,W*0.6,H*0.312)
    image(taichi,W*0.165,H*0.5)
    image(beat,W*0.56,H*0.5)

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
}

//=================================================================================

//

//=================================================================================

