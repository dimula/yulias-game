console.clear();
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
const PEOPLE_WIDTH=25
const PEOPLE_HEIGHT=25

const SICK_DURATION = 10;
const IMMUNE_DURATION = 10;
const DEATH_PROBABILITY = 1;
const INFECTION_PROBABILITY = 90;

var Health = {
  health: 0,
  sick: 1,
  immune: 2,
  ded: 3,
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

  var person = people[0][0]
  person.health=Health.sick
  return people;
};

function drawMan(x,y,color) {
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, 2 * Math.PI);
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
        color = "red";
      else if(person.health==Health.immune)
        color = "yellow";
      else if(person.health==Health.ded)
        color = "black";
      
     drawMan(15+x*15, 15+y*15, color);
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
};



var people = createPeople();
//console.log(people);
drawPeople();






