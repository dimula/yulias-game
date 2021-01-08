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

var bx1 = bx;
var bx2 = bx1 + bird.width;

var score = 0;

var pipes = [270]; 

document.addEventListener("keydown",moveUp);  
function moveUp(){  
    if(by>20)   
    by = by-25;  
} 

function draw() {
    
    ctx.drawImage(bg, 0, 0, 270, 430);

    for (var i=0; i<pipes.length; i++){
        
        var x = pipes[i]

        if (x==100){
            pipes.push(270)
        }

        ctx.drawImage(pipeNorth, x, -100);
        ctx.drawImage(pipeSouth, x, 300);

        pipes[i] = x-1

        var gx1 = x;
        var gx2 = x + pipeNorth.width;
        var gy1 = -100 + pipeNorth.height;
        var gy2 = 300;
        var by1 = by;
        var by2 = by1 + bird.height;

        if(gx2 == 0){
            score++;
        }

        if(bx2 > gx1 && bx1 < gx2){
            if(by1 < gy1 || by2 > gy2){
                debug(by1+","+ gy1, 40 )
                //location.reload(); // reload the page
            }
        }
    };

    ctx.drawImage(bird, bx, by);
    if(by<345)
        by = by+1  

    ctx.drawImage(fg, 0, 370,);  

    requestAnimationFrame(draw); 

    debug("Score: "+score,420)
};

var debug = function(str,pos) {
    ctx.font = "28px Helvetica";
    ctx.fillText(str, 10, pos);
}

window.onload = draw
