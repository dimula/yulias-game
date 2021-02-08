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

var pipes = [{x:270,y:127}]; 

document.addEventListener("keydown",moveUp);  
function moveUp(){  
    if(by>20)   
    by = by-25; 
    //moves the bird up and down with a press of a button 
} 

function draw() {
    
    ctx.drawImage(bg, 0, 0, 270, 430);

    for (var i=0; i<pipes.length; i++){
        
        var obj =pipes[i]
        var x = obj.x
        var y = obj.y;

        if (x==100){
            var tmp = {x:270, y:Math.floor(Math.random()*220)}
            pipes.push(tmp)
        }
        //the loop for pipes
        ctx.drawImage(pipeNorth, x, -pipeNorth.height+y);
        ctx.drawImage(pipeSouth, x, 100+y);

        obj.x = x-1;

        var gx1 = x;
        var gx2 = x + pipeNorth.width;
        var gy1 = y;
        var gy2 = 100+y;
        var by1 = by;
        var by2 = by1 + bird.height;
        //the vars for the bird hitting the pipes, and the game restarting
        if(gx2 == 0){
            score++;
        }
        //the score, it adds 1 every time the pipe goes out of canvas

        if(bx2 > gx1 && bx1 < gx2){
            if(by1 < gy1 || by2 > gy2){
                debug(by1+","+ gy1, 40 )
                //location.reload(); // reload the page
            }
        }
    };

    ctx.drawImage(bird, bx, by);
    if(by<345)
        by = by+1;

    ctx.drawImage(fg, 0, 370,);  

    requestAnimationFrame(draw); 

    debug("Score: "+score,420)
};

var debug = function(str,pos) {
    ctx.font = "28px Helvetica";
    ctx.fillText(str, 10, pos);
}

window.onload = draw

//For the math.random part I need to make the north pipe, and south pipe move up  and down randomly.
//Once i am done making flappy bird I need to start making my virus game. 
//Before I do i need to plan it out.Basically copy everyhting i once wrote
//on the board and write it in a more organized way on paper
//use gy1 and gy2 for the .random, or pipe north and pipe south, ask dad which would work better
//bug for when the bird hits the pipe with its centre, or wings for some reason it doesn't count it, nevermind i fixed the bug
//it turns out since i changed the location of the bottom pipe from 300 to 220, when the bird collided with it
//it didn;t count because the gy2 was still at 300. ahahaha, tell dad