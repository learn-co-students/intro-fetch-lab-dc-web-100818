// shows opening crawl for Episode 4
function getOpeningCrawl(){
  const crawlDiv = document.querySelector('#crawlDiv')
  fetch('https://swapi.co/api/films/1/')
    .then(response => response.json())
    .then(data => {crawlDiv.innerText = data.opening_crawl})
}
document.getElementById('crawlBtn').addEventListener('click', getOpeningCrawl)

// shows planet data based on user's input
function getPlanet(event){
  event.preventDefault()
  let input = event.target.value
  if (input > 0 && input < 9) {
    fetch (`https://swapi.co/api/planets/`)
      .then (res => rest.json())
      .then (data => {
        document.getElementById('planetData').innerText = `${data.results[input].name}, ${data.results[input].climate}`
      })
    } else {
      document.getElementById('planetData').innerText = 'enter a number between 1 and 60'
    }
}
document.getElementById('planetForm').addEventListener('submit', getPlanet)

// displays random fact for number 1
function numberOne(){
  fetch('http://numbersapi.com/1/trivia')
    .then (res => res.text())
    .then (data => {document.getElementById('one-facts').innerText = data})
}
document.getElementById('number-one').addEventListener('click', numberOne)

// displays fact for a number choosen by a user
document.getElementById('pick-a-number').addEventListener('input', event => {
  let input = event.target.value
  let nums = /^[0-9]+$/;
  if (input.match(nums)){
    fetch(`http://numbersapi.com/${input}/math`)
      .then (res => res.text())
      .then (data => {document.getElementById('random-math-fact').innerText = data})
    } else {
      document.getElementById('random-math-fact').innerText = 'please enter a valid number'
    }
})

// shows a year fact every 5 seconds
let year = 2018
let yearInt = setInterval(yearFacts, 5000)
function yearFacts(){
  fetch (`http://numbersapi.com/${year}/year`)
    .then (res => res.text())
    .then (data => document.getElementById('year-history').innerText = data)
    year = year - 1
}

// shows facts for 100 random numbers
document.getElementById('all-numbers-button').addEventListener('click', event => {
  document.getElementById('all-the-numbers').innerHTML = ""
  for (let i = 0; i < 100; i ++) {
    let num = Math.floor(Math.random() * 101)
    fetch(`http://numbersapi.com/${num}/trivia`)
      .then (res => res.text())
      .then (data => {document.getElementById('all-the-numbers').innerHTML +=  `<div> ${data} </div>`})
  }
})
