document.addEventListener("DOMContentLoaded", function(){
  const factsAboutOneBtn = document.querySelector("#number-one")
  factsAboutOneBtn.addEventListener("click", displayOne)

  const pickANumberInput = document.querySelector("#pick-a-number")
  pickANumberInput.addEventListener("change", displayANumberFact)

  const yearHistory = document.querySelector("#year-history")
  yearInterval()

  const allNumbersBtn = document.querySelector("#all-numbers-button")
  allNumbersBtn.addEventListener("click", fetchRandomNumbers)
})

function fetchAPI(number) {
  return fetch(`http://numbersapi.com/${number}/trivia`)
    .then(response => response.text())
}

function fetchYearAPI(year) {
  return fetch(`http://numbersapi.com/${year}/year`)
    .then(response => response.text())
}

function displayOne() {
  const oneFactsDiv = document.querySelector("#one-facts")
  fetchAPI(1).then(text => {
      oneFactsDiv.innerHTML = text
    })
}

function displayANumberFact() {
  const pickANumberInput = document.querySelector("#pick-a-number")
  let number = parseInt(pickANumberInput.value)
  if (Number.isInteger(number)) {
    fetchAPI(number).then(text => {
      document.querySelector("#random-math-fact").innerHTML = text
    })
  } else {
    fetchAPI(number).then(text => {
      document.querySelector("#random-math-fact").innerHTML = "please enter a valid number"
    })
  }
}

function yearInterval() {
  let year = 2018
  fetchHistory(year)
  setInterval(function(){
    --year;
    fetchHistory(year)
  }, 5000)
}

function fetchHistory(year) {
  const yearHistory = document.querySelector("#year-history")
  fetchYearAPI(year).then(text => {
    yearHistory.innerHTML = text
  })
}

function fetchRandomNumbers() {
  const randomNumbers= document.querySelector("#all-the-numbers")
  randomNumbers.innerHTML = ""
  numberArr = randomNumberGenerator()
  numberArr.forEach(
    function(element) {
      fetch(`http://numbersapi.com/${element}/trivia`)
        .then(response => response.text())
        .then(text => {randomNumbers.innerHTML += `<ul><li>${text}</li></ul>`})
    }
  )
}

function randomNumberGenerator() {
  let n = 100
  let arr = []
  while (n > 0) {
    arr.push(Math.floor(Math.random() * 100))
    --n
  }
  return arr
}
