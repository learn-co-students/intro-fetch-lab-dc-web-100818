document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#number-one').addEventListener('click', getRandomFact)
  document.querySelector('#pick-a-number').addEventListener('keyup', pickNumber)

  let date = new Date()
  let year = date.getFullYear() + 1

  setInterval(() => {
    year--
    getYearFact(year)
  }, 5000)


  document.querySelector('#all-numbers-button').addEventListener('click', getAllNumbers)
})

function getRandomFact() {
  fetch('http://numbersapi.com/1/trivia')
    .then(res => res.text())
    .then(text => postOneFact(text))
}

function postOneFact(fact) {
  document.querySelector('#one-facts').innerText = fact
}

function pickNumber(e) {
  if(!isNaN(parseInt(e.target.value))) {
    fetch(`http://numbersapi.com/${e.target.value}/trivia`)
      .then(res => res.text())
      .then(text => postNumberFact(text))
  }

  else { postNumberFact('please enter a valid number')}
}

function postNumberFact(fact) {
  document.querySelector('#random-math-fact').innerText = fact
}

function getYearFact(year) {
  fetch(`http://numbersapi.com/${year}/year`)
    .then(res => res.text())
    .then(text => postYearFact(text))
}

function postYearFact(fact) {
  document.querySelector('#year-history').innerText = fact
}

function getAllNumbers() {
  let divEl = document.createElement('div')

  for(let i = 1; i <= 100; i++) {
    let random = Math.floor(Math.random() * 1000) + 1

    fetch(`http://numbersapi.com/${random}/trivia`)
      .then(res => res.text())
      .then(text => document.querySelector('#all-the-numbers').innerHTML += (`<p>${text}</p>`))
  }


}

// function postAllNumbers(nums) {
//   let divEl = document.createElement('div')
//
//
//   for(let num in nums) {
//
//     // divEl.innerHTML += `
//     //   <span>${num}</span>
//     // `
//   }
// }
