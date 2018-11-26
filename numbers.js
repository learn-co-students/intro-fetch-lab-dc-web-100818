// Write your numbers code in this file!
document.addEventListener('DOMContentLoaded', function(event) {
  setInterval(yearHistory, 5000)
  document.getElementById('number-one').addEventListener('click', numberOne)
  document.getElementById('pick-a-number').addEventListener('input', mathFact)
  document.getElementById('all-numbers-button').addEventListener('click', allNumbers)
})

function numberOne(event) {
  event.preventDefault()
  let oneFactsDiv = document.getElementById('one-facts')
  fetch('http://numbersapi.com/1/trivia')
    .then(res => res.text())
    .then(text => {
      oneFactsDiv.innerHTML = `<br><p>${text}</p>`
    })
}

function mathFact(event) {
  event.preventDefault()
  let input = document.getElementById('pick-a-number').value
  let mathFactDiv = document.getElementById('random-math-fact')
  let nums = /^[0-9]+$/
  if (input.match(nums)) {
    fetch(`http://numbersapi.com/${input}/math`)
      .then(res => res.text())
      .then(text => {
        mathFactDiv.innerHTML = `<br><p>${text}</p>`
      })
  } else {
    mathFactDiv.innerHTML = `<br><p>Not a number!</p>`
  }
}

let date = parseInt((new Date().getFullYear()))
function yearHistory(event) {
  let historyDiv = document.getElementById('year-history')
  fetch(`http://numbersapi.com/${date}/trivia`)
    .then(res => res.text())
    .then(text => {
      historyDiv.innerHTML = `<br><p>${text}</p>`
    })
  date--
}

function allNumbers() {
  event.preventDefault()
  let allNumbersDiv = document.getElementById('all-the-numbers')
  fetch(`http://numbersapi.com/1..100/trivia`)
    .then(res => res.json())
    .then(json => {
      for(let key in json) {
        allNumbersDiv.innerHTML += `<p>${json[key]}</p>`
      }
    })
}
