// Write your swapi code in this file!
document.addEventListener('DOMContentLoaded', function() {
  showYearFacts();
  getDroids();
});

const crawlButton = document.querySelector('#crawlBtn');
crawlButton.addEventListener('click', getOpeningCrawl);
const crawlDiv = document.querySelector('#crawlDiv');
const findPlanet = document.querySelector('#findPlanet');
findPlanet.addEventListener('click', getPlanet);
const findPlanetForm = document.querySelector('#planetForm');
const planetData = document.querySelector('#planetData');

//selectors and event listeners for droids...
const droid2Div = document.querySelector('#droid-2');
const droid3Div = document.querySelector('#droid-3');
const droid2Button = document.createElement('button');
droid2Button.innerText = "Home Planet";
droid2Button.id = "C3PO";
droid2Div.appendChild(droid2Button);
const droid3Button = document.createElement('button');
droid3Button.innerText = "Home Planet";
droid3Button.id = "R2D2";
droid3Div.appendChild(droid3Button);
droid2Button.addEventListener('click', getHomePlanet);
droid3Button.addEventListener('click', getHomePlanet);

function getOpeningCrawl(){
  fetch('https://swapi.co/api/films/1/')
    .then(res => res.json())
    .then(data => crawlDiv.innerText = data["opening_crawl"])
}

function getPlanet(event){
  event.preventDefault();
  planetData.innerHTML = "";
  let userChosenPlanet = Number(findPlanetForm.querySelector('input').value);
  if (userChosenPlanet >= 1 && userChosenPlanet <= 60){
  fetch(`https://swapi.co/api/planets/${userChosenPlanet}/`)
    .then(res => res.json())
    .then(data => {
      planetName = document.createElement('h3');
      planetName.innerText = `Planet Name: ${data["name"]}`;
      planetData.appendChild(planetName);
      planetClimate = document.createElement('h3');
      planetClimate.innerText = `Planet Climate: ${data["climate"]}`;
      planetData.appendChild(planetClimate)
      });
    } else {
      invalidInput = document.createElement('h3');
      invalidInput.innerText = 'You must enter a number between 1 and 60 to choose a planet';
      planetData.appendChild(invalidInput);
    };
}

function getC3PO(){
  fetch('https://swapi.co/api/people/2/')
    .then(res => res.json())
    .then(data => {
      droidName = document.createElement('h3');
      droidName.innerText = `Name: ${data["name"]}`;
      droidHeight = document.createElement('h3');
      droidHeight.innerText = `Height: ${data["height"]}`;
      droidMass = document.createElement('h3');
      droidMass.innerText = `Mass: ${data["mass"]}`;
      droid2Div.style.border = "thick solid #0000FF";
      droid2Div.appendChild(droidName);
      droid2Div.appendChild(droidHeight);
      droid2Div.appendChild(droidMass);
    });
}

function getR2D2(){
  fetch('https://swapi.co/api/people/3/')
    .then(res => res.json())
    .then(data => {
      droidName = document.createElement('h3');
      droidName.innerText = `Name: ${data["name"]}`;
      droidHeight = document.createElement('h3');
      droidHeight.innerText = `Height: ${data["height"]}`;
      droidMass = document.createElement('h3');
      droidMass.innerText = `Mass: ${data["mass"]}`;
      droid3Div.style.border = "thick solid #0000FF";
      droid3Div.appendChild(droidName);
      droid3Div.appendChild(droidHeight);
      droid3Div.appendChild(droidMass);
    });
}

function getHomePlanet(event){
  if (event.target.id === "C3PO"){
    fetch("https://swapi.co/api/planets/1/")
      .then(res => res.json())
      .then(data => {
        para = document.createElement('p')
        para.innerText = `${event.target.id}'s home planet is ${data["name"]}, and has a ${data["terrain"]} terrain. The population of ${data["name"]} is ${data["population"]}.`;
        droid2Div.appendChild(para);
      })
  } else if (event.target.id === "R2D2"){
    fetch("https://swapi.co/api/planets/8/")
      .then(res => res.json())
      .then(data => {
        para = document.createElement('p')
        para.innerText = `${event.target.id}'s home planet is ${data["name"]}, and has a ${data["terrain"]} terrain. The population of ${data["name"]} is ${data["population"]}.`;
        droid3Div.appendChild(para);
      })
  }
}

function getDroids(){
  //Will call on helper methods to grab the individual droids
  getC3PO();
  getR2D2();
}

//Separate section for Numbers API
const numberOneButton = document.querySelector('#number-one');
numberOneButton.addEventListener('click', numberOne);
const oneFactsDiv = document.querySelector('#one-facts');
const pickANumber = document.querySelector('#pick-a-number');
pickANumber.addEventListener('keyup', onChange);
const randomFactDiv = document.querySelector('#random-math-fact');
const yearHistoryDiv = document.querySelector('#year-history');
const allNumbersDiv = document.querySelector('#all-the-numbers');
numbersList = document.createElement('ul');
allNumbersDiv.appendChild(numbersList);
const allNumbersButton = document.querySelector('#all-numbers-button');
allNumbersButton.addEventListener('click', allNumbers);

function numberOne(){
  fetch("http://numbersapi.com/1")
    .then(res => res.text())
    .then(data => {
      oneFactsDiv.innerText = `${data}`
    });
}

function onChange(){
  let userNumber = Number(pickANumber.value);
  if (isNaN(userNumber) === true){
    randomFactDiv.innerText = "You must enter a number";
  } else {
  fetch(`http://numbersapi.com/${userNumber}`)
    .then(res => res.text())
    .then(data => {
      randomFactDiv.innerText = `${data}`
    });
  }
}

function showYearFacts() {
  let year = 2018;
  setInterval(function(){
    fetch(`http://numbersapi.com/${year}/year`)
      .then(res => res.text())
      .then(data => {
        yearHistoryDiv.innerText = data
      })
    --year;
  }, 5000);
}

function generateRandomNumbers(){
  let randomNumbers = [];
  let num;
  for (num = 0; num < 100; num++) {
    let randomNum = Math.floor((Math.random() * 1000) + 1);
    randomNumbers.push(randomNum);
  }
  return randomNumbers;
}

function allNumbers(){
  allNumbers = generateRandomNumbers();
  allNumbers.forEach(function(number){
    fetch(`http://numbersapi.com/${number}`)
      .then(res => res.text())
      .then(data => {
        numberItem = document.createElement('li')
        numbersList.appendChild(numberItem);
        numberItem.innerText = `${data}`
      });
  });
}
