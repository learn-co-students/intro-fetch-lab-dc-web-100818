// Write your swapi code in this file!

document.addEventListener('DOMContentLoaded', function(event) {
  getDroids()
  document.getElementById('crawlBtn').addEventListener('click', getOpeningCrawl)
  document.getElementById('findPlanet').addEventListener('click', getPlanet)
})

function getOpeningCrawl() {
  let crawl
  fetch('https://swapi.co/api/films/1/')
    .then(res => res.json())
    .then(json => crawl = json.opening_crawl)
    .then(() => document.getElementById('crawlDiv').innerText = crawl)
}

function getPlanet() {
  event.preventDefault()
  let input = document.getElementById('planetInput').value
  let planetDataDiv = document.getElementById('planetData')
  if ((parseInt(input) <= 60) && parseInt(input) >= 1) {
    let planet, climate, name
    fetch(`https://swapi.co/api/planets/${input}`)
      .then(res => res.json())
      .then(planet => {
        name = planet.name
        climate = planet.climate
      })
      .then(() => {
        planetDataDiv.innerHTML = `<p><strong>Name: </strong>${name}</p><p><strong>Climate: </strong>${climate}</p>`
      })
  } else {
    planetDataDiv.innerHTML = '<p>No planet with that ID! Hint: Planet IDs must be numbers between 1 and 60.</p>'
  }
}

function getDroids() {
  let droid2Div = document.getElementById('droid-2')
  let droid3Div = document.getElementById('droid-3')
  let c3p0, r2d2
  fetch('https://swapi.co/api/people/')
    .then(res => res.json())
    .then(people => {
      c3p0 = people.results[1]
      r2d2 = people.results[2]
    })
    .then(() => {
      droid2Div.innerHTML = `
        <span><strong>Name: </strong>${c3p0.name}</span>
        <span><strong>Height: </strong>${c3p0.height}</span>
        <span><strong>Mass: </strong>${c3p0.mass}</span>
        <button id='droid-2-btn'>Get Planet</button>`
      document.getElementById('droid-2-btn').addEventListener('click', getHomePlanet)
      droid3Div.innerHTML = `
        <span><strong>Name: </strong>${r2d2.name}</span>
        <span><strong>Height: </strong>${r2d2.height}</span>
        <span><strong>Mass: </strong>${r2d2.mass}</span>
        <button id='droid-3-btn'>Get Planet</button>`
      document.getElementById('droid-3-btn').addEventListener('click', getHomePlanet)
    })
}

function getHomePlanet(event) {
  let planetDataDiv = document.getElementById('planetData')
  if (event.target.id === 'droid-2-btn') {
    fetch(`https://swapi.co/api/planets/1`)
      .then(res => res.json())
      .then(planet => {
        name = planet.name
        climate = planet.climate
      })
      .then(() => {
        planetDataDiv.innerHTML = `<p><strong>Name: </strong>${name}</p><p><strong>Climate: </strong>${climate}</p>`
      })
  } else {
    fetch(`https://swapi.co/api/planets/8`)
      .then(res => res.json())
      .then(planet => {
        name = planet.name
        climate = planet.climate
      })
      .then(() => {
        planetDataDiv.innerHTML = `<p><strong>Name: </strong>${name}</p><p><strong>Climate: </strong>${climate}</p>`
      })
  }
}
