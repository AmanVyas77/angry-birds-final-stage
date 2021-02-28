const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;
var bg = 'sprites/bg.png'
var gameState = "onSling";
var score = 0;
var Birds=[]

var iam;
var birdSelectSound,birdFlySound,pigSnortSound;

function preload() {
   iam = loadImage(bg)
   birdFlySound=loadSound("sounds/bird_flying.mp3")
    pigSnortSound=loadSound("sounds/pig_snort.mp3")
    birdSelectSound=loadSound("sounds/bird_select.mp3")
getTime();
}

function setup(){
    var canvas = createCanvas(displayWidth,displayHeight);+
    canvas.position(15, 70);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(displayWidth/2,height,displayWidth,20);
    platform = new Ground(displayWidth/4-310,displayHeight/4+715,300, 170);

    box1 = new Box(displayWidth/2+300,displayHeight/4+700,150,150);
    box2 = new Box(displayWidth/2+700,displayHeight/4+700,150,150);
    pig1 = new Pig(displayWidth/2+460,displayHeight/4+650);
    log1 = new Log(displayWidth/2+500,displayHeight/4+500,600, PI/2);

    box3 = new Box(displayWidth/2+300,displayHeight/4+400,150,150);
    box4 = new Box(displayWidth/2+700,displayHeight/4+400,150,150);
    pig3 = new Pig(displayWidth/2+400,displayHeight/4+360);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);
    Bird2 = new Bird(150,170)
    Bird3 = new Bird(100,170)
    Bird4 = new Bird(50,170)
    Birds.push(Bird4)
    Birds.push(Bird3)
    Birds.push(Bird2)
    Birds.push(bird)
    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:displayWidth/2-670, y:displayHeight/2+200});

}


function draw(){
   
    if(backgroundImg){
   
    background(backgroundImg);
    textFont("Impact")
    textSize(25)
    fill ('red')   
    text('Score : '+ score,900,50)
    

}


    Engine.update(engine);
    //strokeWeight(4);
    pig1.score()
    pig3.score()
    
    
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    Bird2.display();
    Bird3.display();
    Bird4.display();

    platform.display();
    //log6.display();
    slingshot.display();    




}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(Birds[Birds.length-1].body, {x: mouseX , y: mouseY});
        Matter.Body.applyForce(Birds[Birds.length-1].body,Birds[Birds.length-1].body.position,{x:5,y:-5})
        //birdSelectSound.play()
      return false;
    }

}

function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
    Birds.pop()
    birdFlySound.play()
return false
}

function keyPressed(){
    if(keyCode === 32&&gameState==='launched'){
    if(Birds.length>=0){
Matter.Body.setPosition(Birds[Birds.length-1].body,{x:200,y:50})      
slingshot.attach(Birds[Birds.length-1].body);
//bird.trajectory =[];
gameState = "onsling";
birdSelectSound.play()
    }
    


        
}
}
async function getTime(){
var response  = await fetch('http://worldtimeapi.org/api/timezone/Asia/Kolkata')
var responceaz = await response.json()
//console.log(responceaz)
var responseaq = responceaz.datetime
//console.log(responseaq)
var responceq = responseaq.slice(11,19)
//console.log(responceq)
if(responceq>=06&&responceq<=19){
    bg = 'sprites/bg.png'
}else{
    bg = 'sprites/bg2.jpg'
}
backgroundImg = loadImage(bg);
console.log(backgroundImg)



























}

