document.addEventListener('DOMContentLoaded', () => {

  //////////// STAR WARS OPENING CRAWL ///////////////

  document.querySelector('#crawlBtn').addEventListener('click', getOpeningCrawl)

  function getOpeningCrawl() {
    fetch('https://swapi.co/api/films/1')
      .then(res => res.json())
      .then(json => setCrawl(json['opening_crawl']));
  }

  function setCrawl(crawl) {
    //debugger
    document.querySelector('#crawlDiv').innerText = `${crawl}`
  }

  ////////////// STAR WARS PLANETS ///////

  document.querySelector('#planetForm').addEventListener('submit', getPlanet)

  function getPlanet(e) {
    let planet = e.target[0].value
    if(planet >= 1 && planet <= 60 ) {
      fetch(`https://swapi.co/api/planets/${planet}`)
        .then(res => res.json())
        .then(json => setPlanet(json.name, json.climate));
    }
  }

  function setPlanet(name, climate){
    document.querySelector('#planetData').innerText = `Planet ${name} has a  ${climate} climate.`
  }

  ////////////// STAR WARS DROIDS ///////

  function setDroids(droid) {
    document.querySelector('#droid-3').innerHTML = `
      <span>Name: ${droid.name}</span>
      <span>Mass: ${droid.mass} </span>
      <span>Height: ${droid.height} </span>
    `
  }

  getDroids()


})

function getDroids() {

  fetch('https://swapi.co/api/people/3')
    .then(res => res.json())
    .then(json => console.log(json));
}
