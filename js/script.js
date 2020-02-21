// ading our canvas to javascript
let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
//ading picture to canvas
let ground = new Image()
ground.src="images/ground.png"
//adding picture of food to canvas
let foodImg = new Image()
foodImg.src="images/food.png"
//size of box on the ground
let box = 32
//start score
let score = 0
//coordinates of food
let food = {
  x:Math.floor(Math.random()*17+1)*box,
  y:Math.floor(Math.random()*15+3)*box
}
//coordinates of snake
let snake = []
snake[0]={
  x: 9 * box,
	y: 10 * box
}
//adding event listener on control keys
document.addEventListener("keydown",direction);
//key
let dir
//function which set or key right now
function direction(event){
  if(event.keyCode == 37 && dir != "right")
  dir="left";
  else if (event.keyCode == 38 && dir != "down")
  dir="up";
  else if (event.keyCode == 39 && dir != "left")
  dir="right"
  else if (event.keyCode == 40 && dir != "up")
  dir="down"
  }
  //function eat tail start cycl in array and compares coordinates your head and end of tail
  function eatTail(head,arr){
    for(let i = 0 ; i< arr.length;i++){
      if(head.x == arr[i].x && head.y == arr[i].y){
        clearInterval(game)
      }
    }
  }
function drawGame(){
  //function which draw our game in canvas
  //drawing our ground
  ctx.drawImage(ground,0,0)
  //drawing randomily food
  ctx.drawImage(foodImg,food.x,food.y)
  //drawing our snake
  for(let i = 0 ; i < snake.length;i++){
    //compare the lenght of our snake
    ctx.fillStyle= i == 0 ?"green":"red";
    //draw snake
    ctx.fillRect(snake[i].x,snake[i].y,box,box)
  }
  //draw score
  ctx.fillStyle = "white"
  ctx.font="50px Arial";
  ctx.fillText(score, box*2.5 ,box* 1.7)
//snake coordinates
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  //compare coordinates of snake and food and when it true snake will become longer by adding new box in snake array
if(snakeX == food.x && snakeY == food.y){
  score++;
  food = {
    x:Math.floor(Math.random()*17+1)*box,
    y:Math.floor(Math.random()*15+3)*box
  }
}
  else{
    snake.pop();
  }
  //snake it her self
if(snakeX<box||snakeX>box*17
  ||snakeY<3*box||snakeY>box*17){
  clearInterval(game)}
  if(dir == "left") snakeX -=box
  if(dir == "right") snakeX +=box
  if(dir == "up") snakeY -=box
  if(dir == "down") snakeY +=box
//newhead of snake which may add to snake array
  let newHead = {
    x:snakeX,
    y:snakeY
  };
  eatTail(newHead,snake)
  snake.unshift(newHead)
}
let game = setInterval(drawGame,100)
