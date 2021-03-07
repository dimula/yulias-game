console.clear();

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

const CIRCLE_SIZE = 20
const PEOPLE_WIDTH=Math.floor(canvas.width/CIRCLE_SIZE)
const PEOPLE_HEIGHT=Math.floor(canvas.height/CIRCLE_SIZE)

const SICK_DURATION = 10;
const IMMUNE_DURATION = 12;
const VACCINATED_DURAION =25;
const DEATH_PROBABILITY = 1;
const INFECTION_PROBABILITY = 88;

canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e)
})

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    //console.log("x: " + x + " y: " + y)
    var xi=Math.floor(x/CIRCLE_SIZE-1)
    var yi=Math.floor(y/CIRCLE_SIZE-1)
    //console.log("xi: " + xi + " yi: " + yi)
    
    var person = people[xi][yi]
    if(person.health == Health.healthy){
      person.health = Health.vaccinated; 
    };
    
}

var Health = {
  health: 0,
  sick: 1,
  immune: 2,
  ded: 3,
  vaccinated: 4,
}

var person = {
  health: Health.healthy,
  duration: 0,
  futureHealth: Health.healthy
}

function createPeople (){
  var people = new Array(PEOPLE_WIDTH);
  for (var i = 0; i < people.length; i++) {
    people[i] = new Array(PEOPLE_HEIGHT);
  }
  
  for (var x = 0; x < people.length; x++){
    for (var y = 0; y < people[0].length; y++){
      var person = {
        health: Health.healthy,
        duration: 0,
        futureHealth: Health.healthy
      }
      people[x][y]=person; 
    }
  }

  var person = people[5][7]
  person.health=Health.sick
  person = people[11][12]
  person.health=Health.sick
  return people;
};

function drawMan(x,y,color) {
  ctx.beginPath();
  ctx.arc(x, y, CIRCLE_SIZE/3, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.fill();
};

function drawPeople() {
  for (var x = 0; x < people.length; x++){
    for (var y = 0; y < people[0].length; y++){
      var person = people[x][y]
      
      var color = "#57d97b"
      if(person.health==Health.sick)
        color = "#f55356";
      else if(person.health==Health.immune)
        color = "#fff88f";
      else if(person.health==Health.ded)
        color = "#5c5c5c";
      else if(person.health==Health.vaccinated)
        color = "#788ead";
      
     drawMan(CIRCLE_SIZE/2+x*CIRCLE_SIZE, CIRCLE_SIZE/2+y*CIRCLE_SIZE, color);
    }
  }
};

setInterval(day, 190);

function infected(x, y){
  if(
    (x>0 && people[x-1][y].health==Health.sick)
    || (x<people.length-1 && people[x+1][y].health==Health.sick) 
    || (y>0 && people[x][y-1].health==Health.sick) 
    || (y<people[0].length-1 && people[x][y+1].health==Health.sick)
  ){
    return people[x][y].health==Health.healthy && Math.random()*100>INFECTION_PROBABILITY; 
  }
  else return false;
};

function day(){
  for (var x = 0; x < people.length; x++){
    for (var y = 0; y < people[0].length; y++){
      var person = people[x][y]
      
      if(person.health==Health.sick){
        person.duration = person.duration+1
        if(person.duration >= SICK_DURATION){
          person.health = Health.immune;
          person.futureHealth=Health.healthy;
          person.duration = 0;
        }
        else {
          var prob = Math.random()*100
          if(prob < DEATH_PROBABILITY){
            person.health = Health.ded;
            person.futureHealth=Health.ded;
          }
        }
      }
      else if (person.health==Health.immune){
        person.duration = person.duration+1
          if(person.duration >= IMMUNE_DURATION){
            person.health = Health.healthy;
            person.futureHealth=Health.healthy;
            person.duration = 0;
           }
       }
      else if(infected(x, y)){
       person.futureHealth=Health.sick;
       person.duration = 0;
      }
      else if (person.health==Health.vaccinated){
        person.duration = person.duration+1
        if(person.duration >= VACCINATED_DURAION){
           person.health = Health.healthy;
           person.futureHealth=Health.healthy;
           person.duration = 0;
        }
      }
    }
  }
  
  //checks the future state
  for (var x = 0; x < people.length; x++){
    for (var y = 0; y < people[0].length; y++){
       if(people[x][y].futureHealth==Health.sick){
         people[x][y].health = Health.sick;
      }
    }
  }
      
  drawPeople()
  socreBoard()
};

function socreBoard(){
  var dedCounter=0 
  var sickCounter=0
  var immuneCounter=0
  var healthyCounter=0 
  var vaccinatedCounter=0
  for (var x = 0; x < people.length; x++){
    for (var y = 0; y < people[0].length; y++){
      var person = people[x][y]
      
      if (person.health==Health.ded){
        dedCounter++
      };
      if (person.health==Health.healthy){
        healthyCounter++
      };
      if (person.health==Health.sick){
        sickCounter++
      };
      if (person.health==Health.immune){
        immuneCounter++
      };
      if (person.health==Health.vaccinated){
        vaccinatedCounter++
      };
    }
  }
  
  document.getElementById("ded-counter").innerHTML=dedCounter
  document.getElementById("healthy-counter").innerHTML=healthyCounter
  document.getElementById("sick-counter").innerHTML=sickCounter
  document.getElementById("immune-counter").innerHTML=immuneCounter
  document.getElementById("vaccinated-counter").innerHTML=vaccinatedCounter
}



var people = createPeople();
//console.log(people);
drawPeople();






