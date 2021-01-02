var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var bird = new Image();  
var bg = new Image();  
var fg = new Image();  
var pipeNorth = new Image();  
var pipeSouth = new Image(); 

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

var by = 15;
var bx = 15;

document.addEventListener("keydown",moveUp);  
  
function moveUp(){  
    if(by>20)   
    by = by-25;  
} 
   var pipes = [270]; 

function draw() {

    ctx.drawImage(bg, 0, 0, 270, 430);

    for (var i=0; i<pipes.length; i++){
        var x = pipes[i]

        if (x==100){
            pipes.push(270)
        }

        ctx.drawImage(pipeNorth, x, -100);
        ctx.drawImage(pipeSouth, x, 200);
        pipes[i] = x-1
    };

    ctx.drawImage(bird, bx, by);
    if(by<345)
        by = by+1  

    ctx.drawImage(fg, 0, 370,);  
    requestAnimationFrame(draw); 
};

window.onload = draw
