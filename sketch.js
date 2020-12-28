var dog,dog2,happyDog,foodS,foodStock,bg1,bg2;
var database;
var gameState = "start";
function preload(){
  happyDog = loadImage("dogImg1.png");
  dog2 = loadImage("dogImg.png");
  bg1 = loadImage("sad dog.png");
  bg2 = loadImage("happy dog.png");
}


function setup() {
  createCanvas(500, 600);
 
  database = firebase.database();

  foodStock = database.ref('food');
  foodStock.on('value',readStock);

  dog = createSprite(250,300,10,10);
  dog.addImage(dog2);
  dog.scale =0.5;
  
}


function draw() {  
background(rgb(46,139,86));
if(gameState === "start"){
    background(bg1);
    textSize(20);
    fill("black");
    text("PRESS 'SPACE' TO PLAY",100,200);
    text("Drago is very sad that no one is giving him food...",20,50);
    text("why dont you give drago something to eat so that he is",10,100);
    text("boosted and very happy",20,150)
    dog.visible = false;
    
    if(keyCode === 32){
        gameState = "play";
        foodS = 15;
    }
}
if(gameState==="play"){
  dog.visible = true;
  fill("black");
  textSize(20);
  text("PRESS UP ARROW KEY TO FEED DRAGO",50,580);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
    foodS = foodS-1;
  }
  textSize(20);
  fill("black");
  text("Milk Bottles:"+foodS,100,50);
}
  if(foodS === 0){
    gameState = "end";
  }

  if(gameState === "end"){
      background(bg2);
      dog.visible = false;
      textSize(25);
      fill("black");
      text("GAMEOVER",100,50);
      textSize(15);
      text("YAY!!..Drago is very happy",320,100);
      text("You made his day",370,150);
      foodS = 0;
  }


  drawSprites();
  

  
  
}
function readStock(data){
  foodS = data.val();
}
function writeStock(x){
  database.ref('/').update({
     food:x
  })
}