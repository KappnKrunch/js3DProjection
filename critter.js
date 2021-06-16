class Critter{
  constructor(){
    this.maxDepth = max(width,height);
    this.pos = createVector(random(width),random(this.maxDepth),random(height));
    this.dir = p5.Vector.random3D().normalize();
    this.scale = 20;
    this.speed = random(1,3);
    this.hitFrames = 0;
    this.gravity = createVector(0,0,0);
  }
  
  setDir(dir){
    this.dir = dir;
  }
  
  setDirLerp(dir, by){
    this.setDir(p5.Vector.lerp(this.dir,dir,by));
  }
  
  moveFwd(){
    
    let d = 1 - (this.pos.y /this.maxDepth);
    let xScalar = lerp(0,width/2 - width/4, d);
    let zScalar = lerp(0,height/2 - height/4, d);
    
    this.dir = this.dir.add(this.gravity).normalize();
    
    this.pos.add(p5.Vector.mult(this.dir,this.speed*deltaTime/10).mult(
      createVector(lerp(1,1/4,d),1,lerp(1,1/4,d) )));
    
    //collisions
    if(this.pos.x < xScalar){ 
      this.pos.x = xScalar;
      this.dir.x = -this.dir.x
      this.hitFrames = 1;
    }
    
    if(this.pos.x >= width-xScalar){ 
      this.pos.x = width-xScalar-1;
      this.dir.x = -this.dir.x
      this.hitFrames = 1;
    }
    
    if(this.pos.y < 0){ 
      this.pos.y = 0;
      this.dir.y = -this.dir.y
      this.hitFrames = 1;
    }
    
    if(this.pos.y >= this.maxDepth){ 
      this.pos.y = this.maxDepth-1;
      this.dir.y = -this.dir.y
      this.hitFrames = 1;
    }
    
    if(this.pos.z < zScalar){ 
      this.pos.z = zScalar;
      this.dir.z = -this.dir.z
      this.hitFrames = 1;
    }
    
    if(this.pos.z >= height-zScalar){ 
      this.pos.z = height-zScalar-1;
      this.dir.z = -this.dir.z
      this.hitFrames = 1;
    }
  }
  
  draw(){
    let d = this.pos.y/this.maxDepth;
    let viewScale = lerp(this.scale/3, this.scale, d);
    
    fill(250);
    if(this.hitFrames > 0){
      fill(250,0,0);
      
      this.hitFrames++;
      if(this.hitFrames > 20) this.hitFrames = 0;
    }
    
    circle(this.pos.x, this.pos.z, viewScale);
  }
  
  getDepth(){
    return this.pos.y / this.maxDepth;
  }
  
  setGravity(gravity){
    this.gravity = gravity;
  }
}