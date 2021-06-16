let critters = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  for(let i = 0; i < 50; i++){
    critters.push(new Critter());
  }
  
  
}

function draw() {
  background(220);
  
  
  
  //draw cube lines
  fill(230);
  rect(width/2 - width/4, height/2 - height/4, width/2 , height/2 );
  
  line(0,0,width/2 - width/4, height/2 - height/4);
  line(width,0,width/2 + width/4, height/2 - height/4);
  line(0,height,width/2 - width/4, height/2 + height/4);
  line(width,height,width/2 + width/4, height/2 + height/4);
  
  //text
  fill(180);
  textAlign(CENTER, CENTER);
  text("Press Space for Gravity", width/2, height/2);
  
  //draw spheres
  critters.sort(function compareFn(firstEl, secondEl) {
    return min(max(firstEl.getDepth() - secondEl.getDepth(),-1),1);
  });
  
  for(let i in critters){
    critters[i].moveFwd();
    critters[i].draw();
  }
  
}

function keyPressed() {
  if (keyCode === 32) {
    for(let i in critters){
    critters[i].setGravity(createVector(0,0,1));
    }
  }
}

function keyReleased() {
  if (keyCode === 32) {
    for(let i in critters){
    critters[i].setGravity(createVector(0,0,0));
    }
  }
  return false; // prevent any default behavior
}