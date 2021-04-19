var balloon, Banimation, balloonPos;
var database;
var backgroundImg;

function preload(){
  Banimation=loadAnimation("b2.png","b3.png","b4.png");
  backgroundImg=loadImage("bck.png"); 
}

function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250, 650, 150, 150);
  balloon.addAnimation("Banimation",Banimation);
  
   balloonPos=database.ref('balloon/position');
   balloonPos.on("value",readPosition,showError);
}

function draw() {

  background(backgroundImg);  
 
  
  if(keyDown(UP_ARROW)){
    balloon.updatePosition(0,-1);
    balloon.addAnimation("Banimation",Banimation);
  }

  else if(keyDown(DOWN_ARROW)){
    balloon.updatePosition(0,1);
    balloon.addAnimation("Banimation",Banimation);
  }

  else if(keyDown(LEFT_ARROW)){
    balloon.updatePosition(-1,0);
    balloon.addAnimation("Banimation",Banimation);
  }
  
  else if(keyDown(RIGHT_ARROW)){
    balloon.updatePosition(0,1);
    balloon.addAnimation("Banimation",Banimation);
  }

  drawSprites();
}

function updatePosition(x,y){
  database.ref('balloon/position').set({
    'x':position.x+x,
    'y':position.y+y
  })
}

function readPosition(data){
    balloonPos=data.val();
    console.log(balloonPos.x);
    console.log(balloonPos.y);
    balloon.x=balloonPos.x;
    balloon.y=balloonPos.y
}



function showError(){
  console.log("Error in writing to the database")
}