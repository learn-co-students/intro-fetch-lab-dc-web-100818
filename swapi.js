// Write your swapi code in this file!
const openingCrawl = document.getElementById('crawlBtn');
const planetSearch = document.getElementById('findPlanet');
let planetInfoArea = document.querySelector('#planetData');
let c3poInfoArea = document.querySelector('#droid-2');
let r2d2InfoArea = document.querySelector('#droid-3');

document.addEventListener('DOMContentLoaded', function () {
  createBtns();
  const r2Btn = document.querySelector('#droid-3-btn');
  const c3poBtn = document.querySelector('#droid-2-btn');
  getC3PO();
  getR2D2();
  openingCrawl.addEventListener('click', getOpeningCrawl);
  planetSearch.addEventListener('click', findPlanet);
  r2Btn.addEventListener('click', getR2HomePlanet);
  c3poBtn.addEventListener('click', get3poHomePlanet);
})

/////////////// Get Opening Crawl /////////////////

function getOpeningCrawl() {
  fetch('https://swapi.co/api/films/1/')
    .then(response => response.json())
    .then(data => renderCrawl(data))
}

function renderCrawl(data) {
  let crawl = document.createElement('p');
  let containerElement = document.querySelector('#crawlDiv');
  crawl.innerText = data.opening_crawl;
  containerElement.appendChild(crawl);
}

////////////////////// Find Planet /////////////////////////////

function findPlanet(event) {
  event.preventDefault();
  let currentPlanet = getPlanetSearch();
  fetch(`https://swapi.co/api/planets/${currentPlanet}/`)
    .then(response => response.json())
    .then(data => renderPlanet(data))
}

function getPlanetSearch(){
  input = document.querySelector('#planetInput').value;
  return input;
}

function renderPlanet(data) {
  let planetName = document.createElement('h4');
  let planetClimate = document.createElement('p');
  const doesNotExist = document.createElement('h3')
  planetName.innerText = `Planet Name: ${data.name}`;
  planetClimate.innerText = `Climate: ${data.climate}`;
  doesNotExist.innerText = `You must enter a number between 1 and 60.`
  let currentPlanet = parseInt(getPlanetSearch());
  if (currentPlanet > 0 && currentPlanet < 61) {
    planetInfoArea.appendChild(planetName);
    planetInfoArea.appendChild(planetClimate);
  } else {
    planetInfoArea.appendChild(doesNotExist);
  };
}

/////////////////////////Get Droids //////////////////////////////////////

function getC3PO () {
  fetch('https://swapi.co/api/people/2/')
    .then(response => response.json())
    .then(data => render3poInfo(data))
}

function getR2D2 () {
  fetch('https://swapi.co/api/people/3/')
    .then(response => response.json())
    .then(data => renderR2Info(data))
}

function render3poInfo (data) {
  let c3po = document.createElement('h3');
  let name = document.createElement('li');
  let height = document.createElement('li');
  let mass = document.createElement('li');
  name.innerText = `Name: ${data.name}`
  height.innerText = `Height: ${data.height}`
  mass.innerText = `Mass: ${data.mass}`
  c3poInfoArea.appendChild(name);
  c3poInfoArea.appendChild(height);
  c3poInfoArea.appendChild(mass);
}

function renderR2Info (data) {
  let r2d2 = document.createElement('h3');
  let name = document.createElement('li');
  let height = document.createElement('li');
  let mass = document.createElement('li');
  name.innerText = `Name: ${data.name}`
  height.innerText = `Height: ${data.height}`
  mass.innerText = `Mass: ${data.mass}`
  r2d2InfoArea.appendChild(name);
  r2d2InfoArea.appendChild(height);
  r2d2InfoArea.appendChild(mass);
}


///////////////////// Get Home Planet, Create Buttons ///////////////////////////////

function createBtns() {
  let r2Button = document.createElement('button');
  let c3poButton = document.createElement('button');
  r2Button.id = "droid-3-btn";
  c3poButton.id = "droid-2-btn";
  r2Button.innerText = "Get R2D2's Home Planet";
  c3poButton.innerText = "Get C3PO's Home Planet";
  c3poInfoArea.appendChild(c3poButton);
  r2d2InfoArea.appendChild(r2Button);
}

function render3poPlanet(data) {
  let planetName = document.createElement('h4');
  let planetClimate = document.createElement('p');
  planetName.innerText = `Planet Name: ${data.name}`;
  planetClimate.innerText = `Climate: ${data.climate}`;
  c3poInfoArea.appendChild(planetName);
  c3poInfoArea.appendChild(planetClimate);
}

function renderR2d2Planet(data) {
  let planetName = document.createElement('h4');
  let planetClimate = document.createElement('p');
  planetName.innerText = `Planet Name: ${data.name}`;
  planetClimate.innerText = `Climate: ${data.climate}`;
  r2d2InfoArea.appendChild(planetName);
  r2d2InfoArea.appendChild(planetClimate);
}

function get3poHomePlanet() {
  fetch ("https://swapi.co/api/planets/1/")
    .then(response => response.json())
    .then(data => render3poPlanet(data))
}

function getR2HomePlanet () {
  fetch ("https://swapi.co/api/planets/8/")
    .then(response => response.json())
    .then(data => renderR2d2Planet(data))
}
