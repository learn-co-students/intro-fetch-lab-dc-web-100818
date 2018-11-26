// Write your numbers code in this file!
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#number-one').addEventListener('click', getOne)

  setInterval(yearNumber, 5000)

})

let oneDiv = document.querySelector('#one-facts')

const getOne = () => {
  fetch('http://numbersapi.com/1')
    .then(response => response.text())
    .then(json => {
      oneDiv.innerText = json
    })
}

const pickNumber = (e) => {
  let nums = /^[0-9]+$/;
  if (e.target.value.match(nums)) {
    fetch(`http://numbersapi.com/${e.target.value}`)
      .then(response => response.text())
      .then(json => randomFact.innerText = json)
  }
  else {
    randomFact.innerText = "That is not a number!"
  }
}
let pickInput = document.querySelector('#pick-a-number')
let randomFact = document.querySelector('#random-math-fact')
pickInput.addEventListener('change', pickNumber)

let year = 2018
let yearHistory = document.querySelector('#year-history')
const yearNumber = () => {
  fetch(`http://numbersapi.com/${year}/year`)
    .then(response => response.text())
    .then(json => yearHistory.innerText = json)
  year -= 1
}

const allNumsFacts = () => {
  document.getElementById('all-the-numbers').innerHTML = ""
    for (let i = 0; i < 100; i ++) {
      let num = Math.floor(Math.random() * 101)
      fetch(`http://numbersapi.com/${num}/trivia`)
        .then(res => res.text())
        .then(data => {numsDiv.innerHTML +=  `<div> ${data} </div>`})
    }
}

let allNums = document.querySelector('#all-numbers-button')
let numsDiv = document.querySelector('#all-the-numbers')
allNums.addEventListener('click', allNumsFacts)
