// Write your numbers code in this file!

document.addEventListener("DOMContentLoaded", function() {
  
  // DOM elements
  const numberOneBtn = document.getElementById('number-one');
  const numberOneDiv = document.getElementById('one-facts');
  const pickNumberInput = document.getElementById('pick-a-number');
  const randomMathDiv = document.getElementById('random-math-fact');
  const yearDiv = document.getElementById('year-history');
  const allNumBtn = document.getElementById('all-numbers-button');
  const allNumDiv = document.getElementById('all-the-numbers');

  // API
  const numberData = "http://numbersapi.com/"
  
  // Event listeners
  numberOneBtn.addEventListener('click', () => displayNumberData(numberData))
  pickNumberInput.addEventListener('change', displayPickNumber)
  allNumBtn.addEventListener('click', () => displayAllNumData(numberData) )

  let today = new Date();
  let year = today.getFullYear() + 1;
  

  // setInterval
  setInterval(() => {
    year = year - 1
    displayDateData(numberData, year)
  },5000);

  function getNumberOneData(url) {
    let type = 'trivia'
    let number = 1;
    return fetch(`${url}${number}/${type}`)
      .then(response => response.text())
  }

  function getMathFactData(url, number) {
    let type = 'math'
    return fetch(`${url}${number}/${type}`)
      .then(response => response.text() )
  }

  function getDateData(url, year) {
    return (fetch(`${url}${year}/year`)
      .then(response => response.text()))
  }

  function getAllNumData(url) {
    return(fetch(`${url}1..100`)
    .then(response => response.json()))
  }

  function displayAllNumData(url) {
  
    getAllNumData(url)
      .then(data => {
        for(let key in data) {
          let ul = document.createElement('ul')
              
          let li = document.createElement('li')
          li.innerText = data[key];
          
          ul.appendChild(li);
          allNumDiv.appendChild(ul);

        }
      })
  }

  function displayDateData(url, year) {
    getDateData(url, year)
      .then(data => {
        yearDiv.innerText = data;
      })
  }

  function displayPickNumber() {
    let inputValue = this.value
    getMathFactData(numberData, inputValue)
      .then(data => {
        randomMathDiv.innerText = data;
      });
  }
  
  function displayNumberData(url) {
    getNumberOneData(url).then(data => {
      numberOneDiv.innerText = data
    });
  }





});
  


