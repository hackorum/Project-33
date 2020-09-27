var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;

var particle;
var plinkos = [];
var divisions = [];

var divisionHeight = 300;
var score = 0;
var turn = 0;
var gameState = "play"
function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width / 2, height, width, 20);

  for (var k = 0; k <= width; k = k + 80) {
    divisions.push(new Divisions(k, height - divisionHeight / 2, 10, divisionHeight));
  }


  for (var j = 75; j <= width; j = j + 50) {

    plinkos.push(new Plinko(j, 75));
  }

  for (var j = 50; j <= width - 10; j = j + 50) {

    plinkos.push(new Plinko(j, 175));
  }

  for (var j = 75; j <= width; j = j + 50) {

    plinkos.push(new Plinko(j, 275));
  }

  for (var j = 50; j <= width - 10; j = j + 50) {

    plinkos.push(new Plinko(j, 375));
  }

}
function draw() {
  background("black");

  if (turn >= 5) { gameState = "end"; textSize(100); text("Game Over",100,height/2-200); }

  textSize(20)
  text("Score : " + score, 20, 30);

  Engine.update(engine);

  for (var i = 20; i < width / 2 - 100; i += 80) {
    textSize(20)
    text("500", i, 650);
  }

  for (var i = 340; i < width - 280; i += 80) {
    textSize(20)
    text("200", i, 650);
  }

  for (var i = 580; i < width; i += 80) {
    textSize(20)
    text("100", i, 650);
  }

  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();
  }

  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }

  if (particle) {

    particle.display();

    if (particle.body.position.y > 750) {

      if (particle.body.position.x < 330 && particle.body.position.x > 0) {
        turn += 1
        score += 500;
        particle = null;
      } else if (particle.body.position.x > 330 && particle.body.position.x < 570) {
        turn += 1
        score += 200;
        particle = null;
      }else if (particle.body.position.x > 570 && particle.body.position.x < width) {
        turn += 1
        score += 100;
        particle = null;
      }

    }
  }

}

function mousePressed() {
  if (gameState === "play") {
    particle = new Particle(mouseX, 10, 10);
  }
}