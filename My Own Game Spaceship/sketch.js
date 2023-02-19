var PLAY = 1;
var END = 0;
var gameState = PLAY;

var spaceship;
var ground, invisibleGround;


var obstacleLaserGroup;
var starGroup;
var backgroundImg
var score=0;


var gameOver, restart;


function preload(){
  
  backgroundImg = loadImage("backgroundImg.jpg")
 
  
  spaceship = loadImage("spaceship.png")
  
  
  obstacleLaserGroup = loadImage("laser.png")
  starGroup = loadImage("star.jpg")
  
  //gameOverImg = loadImage("gameOver.png");
  //restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  spaceship = createSprite(30, 20, 20, 20)
  starGroup = new Group();
  obstacleLaserGroup = new Group();

  invisibleGround = createSprite(width/2,height-10,width,125);  
  invisibleGround.shapeColor = "#f4cbaa";
  
  
  
  //gameOver = createSprite(width/2,height/2- 50);
  //gameOver.addImage(gameOverImg);
  
  //restart = createSprite(width/2,height/2);
  //restart.addImage(restartImg);
  
  //gameOver.scale = 0.5;
  //restart.scale = 0.1;

  //gameOver.visible = false;
  //restart.visible = false;
  
 
  // invisibleGround.visible =false

  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(backgroundImg);
  textSize(20);
  fill("white")
  text("Score: "+ score,30,50);
  
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    invisibleGround.velocityY = -(6 + 3*score/100);   
  
    if(obstacleLaserGroup.isTouching(spaceship)){
        collidedSound.play()
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    invisibleGround.velocityY = 0;
    starsGroup.setVelocityYEach(0);
    obstacleLaserGroup.setVelocityYEach(0);
    
    //change the trex animation
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleLaserGroup.setLifetimeEach(-1);
    starGroup.setLifetimeEach(-1);
    
   
  }
  
  
  drawSprites();
}

function spawnStar() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var star = createSprite(width+20,height-300,40,10);
    star.y = Math.round(random(100,220));
    star.addImage(cloudImage);
    star.scale = 0.5;
    star.velocityY = -3;
    
     //assign lifetime to the variable
    star.lifetime = 300;
    
    star.depth = trex.depth;
  
    //add each cloud to the group
    starGroup.add(star);
  }
  
}

function spawnlaserObstacles() {
  if(frameCount % 60 === 0) {
    var laserObstacle = createSprite(600,height-95,20,30);
    laserObstacle.setCollider('circle',0,0,45)
    // obstacle.debug = true
  
    laserObstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: laserObstacle.addImage(laser.png);
              break;
      case 2: laserObstacle.addImage(laser.png);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    laserObstacle.scale = 0.3;
    laserObstacle.lifetime = 300;
    laserObstacle.depth = trex.depth;
    spaceship.depth +=1;
    //add each obstacle to the group
    obstacleLaserGroup.add(laserObstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  laserObstaclesGroup.destroyEach();
 
  score = 0;
  
}
