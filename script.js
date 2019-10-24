const cardsArray = [{
  'name': 'Liverpool',
  'img': 'img/1.png',
},
{
  'name': 'Manchester United',
  'img': 'img/2.png',
},
{
  'name': 'West Ham',
  'img': 'img/3.jpg',
},
{
  'name': 'Stoke City',
  'img': 'img/4.png',
},
{
  'name': 'Leicester City',
  'img': 'img/5.jpg',
},
{
  'name': 'Manchester City',
  'img': 'img/6.png',
},
{
  'name': 'Arsenal',
  'img': 'img/7.jpg',
},
{
  'name': 'Spurs',
  'img': 'img/8.png',
},
];

const gameGrid = cardsArray
  .concat(cardsArray)
  .sort(() => 0.5 - Math.random());

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;

const game = document.getElementById('game');
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(item => {
  const { name, img } = item;

  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  const front = document.createElement('div');
  front.classList.add('front');

  const back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${img})`;

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

const match = () => {
  const selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });
};

	const resetGuesses = () => {
	  firstGuess = '';
	  secondGuess = '';
	  count = 0;
	  previousTarget = null;

	  var selected = document.querySelectorAll('.selected');
	  selected.forEach(card => {
		card.classList.remove('selected');
	  });
	};

grid.addEventListener('click', event => {

  const clicked = event.target;

  if (
    clicked.nodeName === 'SECTION' ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains('selected') ||
    clicked.parentNode.classList.contains('match')
  ) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }

});

var button = document.getElementsByTagName("button");
button[0].addEventListener("click", showAll);


function showAll(){
  var front = document.querySelectorAll('.front');
  for(var i=0; i<=front.length; i++){
    front[i].style.opacity = 0;
    setTimeout(hideAll, 2000);
  }
}

function hideAll(){
  var front = document.querySelectorAll('.front');
  for(var i=0; i<=front.length; i++){
    front[i].style.opacity = 1;
  }
}

class Stopwatch {
  constructor(display, results) {
      this.running = false;
      this.display = display;
      this.results = results;
      this.laps = [];
      this.reset();
      this.print(this.times);
  }
  
  reset() {
      this.times = [ 0, 0, 0 ];
  }
  
  start() {
      if (!this.time) this.time = performance.now();
      if (!this.running) {
          this.running = true;
          requestAnimationFrame(this.step.bind(this));
      }
  }
stop() {
      this.running = false;
      this.time = null;
	  var x=confirm("u clicked stop button do u wanna continue ?")
	if(x==true){
		
		alert("okay game is  going on");
		if (!this.running) {
          this.running = true;
          requestAnimationFrame(this.step.bind(this));
      const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
};
	  }
	 
	}
	else{
		alert("okay game is over");	
	}
  }
 

  
  clear() {
      clearChildren(this.results);
  }
  
  step(timestamp) {
      if (!this.running) return;
      this.calculate(timestamp);
      this.time = timestamp;
      this.print();
      requestAnimationFrame(this.step.bind(this));
  }
  
  calculate(timestamp) {
      var diff = timestamp - this.time;
      // Hundredths of a second are 100 ms
      this.times[2] += diff / 10;
      // Seconds are 100 hundredths of a second
      if (this.times[2] >= 100) {
          this.times[1] += 1;
          this.times[2] -= 100;
      }
      // Minutes are 60 seconds
      if (this.times[1] >= 60) {
          this.times[0] += 1;
          this.times[1] -= 60;
      }
  }
  
  print() {
      this.display.innerText = this.format(this.times);
  }
  
  format(times) {
      return `\
${pad0(times[0], 2)}:\
${pad0(times[1], 2)}:\
${pad0(Math.floor(times[2]), 2)}`;
  }
}

function pad0(value, count) {
  var result = value.toString();
  for (; result.length < count; --count)
      result = '0' + result;
  return result;
}

function clearChildren(node) {
  while (node.lastChild)
      node.removeChild(node.lastChild);
}

let stopwatch = new Stopwatch(
  document.querySelector('.stopwatch'),
  document.querySelector('.results'));