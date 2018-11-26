document.addEventListener("DOMContentLoaded", function() {
  const crawlButton = document.querySelector('#crawlBtn')
  crawlButton.addEventListener('click', getOpeningCrawl)
  const planetSelector = document.querySelector('#planetForm')
  planetSelector.addEventListener('submit', getPlanet)
})

function fetchSwapi(type, num) {
  return fetch(`https://swapi.co/api/${type}/${num}`).then(res => res.json())
}


function getOpeningCrawl() {
  fetchSwapi('films', 1)
  .then(d => {
    crawlDiv = document.getElementById("crawlDiv");
    crawlDiv.innerText = d.opening_crawl;
  });
};


function getPlanet(e) {
  e.preventDefault()
  const planetId = parseInt(document.querySelector('#planetInput').value)
  const planetData = document.getElementById('planetData')
  if(isNaN(planetId) || planetId < 1 || planetId > 60) {
    planetData.innerHTML = "please enter a number between 1 and 60"
  } else {
    fetchSwapi('planets', planetId)
    .then(d => {
      planetData.innerHTML = `<p>Name: ${d.name}</p> <p>Climate: ${d.climate}`
  })
  }
}
