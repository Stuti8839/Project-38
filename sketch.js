var bananaImage, obstacleImage, obstacleGroup, backImage, scene, score, player_running, ground, monkey, bananaGroup;
var gameState = "play";

function setup() {
  createCanvas(600, 200);
  backImage=loadImage("jungle.jpg");
  player_running=loadImage("Monkey_01.png");
  bananaImage=loadImage("banana.png");
  obstacleImage=loadImage("stone.png");
  
  scene = createSprite(200,0,200,20);
  scene.addImage(backImage);
  
  ground = createSprite(200,200,600,20);
  ground.visible = false;
  
  monkey = createSprite(50,150, 10, 10);
  monkey.addImage(player_running);
  monkey.scale = 0.06;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
}

function draw() {
  background(220);

  monkey.collide(ground);
  
  monkey.depth = scene.depth+1;
  
  if(gameState === "play"){
    if(camera.position.x%400===0) {
        scene.x = camera.position.x+200;
      }
    
    if (keyDown("space")) {
        monkey.velocityY = -5;
    }
    
    if (isTouching(monkey, bananaGroup)) {
        score = score + 2;
        bananaGroup.destroyEach();
      }
    
    monkey.velocityY = monkey.velocityY + 0.8;

    switch(score) {
      case 10: monkey.scale = 0.08;
            break;
      case 20: monkey.scale = 0.1;
            break;
      case 30: monkey.scale = 0.12;
            break;
      case 40: monkey.scale = 0.14;
            break;
      default: break;
    }
    
    spawnBananas();
    spawnObstacles();

    camera.position.x = camera.position.x + 5;
    monkey.x = camera.position.x - 250;
    ground.x=camera.position.x;

    if(isTouching(obstacleGroup, monkey)) {
      gameState = "end";
    }
  }

  drawSprites();
  
  stroke("white");
  textSize(10);
  fill("white");
  text("Score: " + score, camera.position.x+200, 50);

  if(gameState==="end"){
    textSize(50);
    fill("white");
    text("GAME OVER", 100, 100);
  }
}

function spawnBananas () {
  if (camera.position.x%500 === 0) {
    var banana = createSprite(400,150,40,10);
    banana.x=camera.position.x+100;
    banana.y = random(25,100);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    //banana.velocityX = -6;
    banana.lifetime = 600;
    monkey.depth = banana.depth + 1;
    bananaGroup.add(banana);
  }
}

function spawnObstacles () {
  if (camera.position.x%1000 === 0) {
    var obstacle = createSprite(600,170,20,20);
    obstacle.x=camera.position.x+300;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    //obstacle.velocityX = -6;
    obstacle.lifetime = 600;
    /*scene.depth = obstacle.depth;
    obstacle.depth = obstacle.depth +1;*/
    obstacleGroup.add(obstacle);
  }
}

function isTouching(object1, object2) {
  if(object2.width/2 + object1.width/2 > object2.x - object1.x &&
      object2.width/2 + object1.width/2 > object1.x - object2.x &&
      object2.height/2 + object1.height/2 > object2.y - object1.y &&
      object2.height/2 + object1.height/2 > object1.y - object2.y) {
          return true;
      } else {
          return false;
      }
}