// Write your swapi code in this file!
document.addEventListener('DOMContentLoaded', () => {
    const getOpeningCrawl = () => {
      let crawlDiv = document.querySelector('#crawlDiv')
      let promiseForData = fetch('https://swapi.co/api/films/1/')
      promiseForData
        .then(response => response.json())
        .then(json => crawlDiv.innerText = json.opening_crawl)
      }

    crawlButton = document.querySelector('#crawlBtn')
    crawlButton.addEventListener('click', getOpeningCrawl)

    const getPlanet = (e) => {
      e.preventDefault()
      let planet = document.querySelector('#planetInput').value
      let planetDiv = document.querySelector('#planetData')

      if (planet > 0 && planet < 61) {
        let promiseForPlanet = fetch('https://swapi.co/api/planets/')
        promiseForPlanet
          .then(response => response.json())
          .then(json => {
            planetDiv.innerText = `${json.results[planet].name}, climate: ${json.results[planet].climate}`
          })
      } else {
        planetDiv.innerText = "Please enter a number between 1 and 60"
      }
    }
    planetInput = document.querySelector('#planetForm')
    planetInput.addEventListener('submit', getPlanet)

  getDroids()

})
let cDiv = document.querySelector('#droid-2')
let rDiv = document.querySelector('#droid-3')

const getDroids = () => {
  fetch('https://swapi.co/api/people/')
    .then(response => response.json())
    .then(json => {
      getHomePlanet(json.results[1].homeworld)
      .then(homeworld => {
        cDiv.innerText = `${json.results[1].name}, height: ${json.results[1].height}, mass: ${json.results[1].mass}, homeworld:
        ${homeworld.name}`

        getHomePlanet(json.results[2].homeworld)
        .then(homeworld => {
          rDiv.innerText = `${json.results[2].name}, height: ${json.results[2].height}, mass: ${json.results[2].mass}, homeworld:
          ${homeworld.name}`
      })
    })
  })
}


const getHomePlanet = (planetURL) => {
  return fetch(planetURL)
    .then(response => response.json())
}
