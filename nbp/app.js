console.log('app.js init');

// http://api.nbp.pl/api/exchangerates/rates/a/gbp/last/10/?format=json ostatnie 10 notowan funta

let availableCurrencies = [];
let codes = [];
var chartData = [];
let plot;
let ratesUrl = 'http://api.nbp.pl/api/exchangerates/rates/a/gbp/last/10/?format=json';
const curSel = document.getElementById('cur-sel');
const chart = document.getElementById('chart');

function getCodes() {
  if (Array.isArray(availableCurrencies) && availableCurrencies.length > 0 && Array.isArray(availableCurrencies[0].rates)) {
    const currCodes = availableCurrencies[0].rates.map((rate) => rate.code);
    codes = currCodes.sort();
    console.log('Currency codes: ', codes);
    populateSelect();
  } else {
    console.log('Invalid data structure in the JSON response');
  }
}

async function fetchCodes() {
  url = 'https://api.nbp.pl/api/exchangerates/tables/a/?format=json';
  const response = await fetch(url);
  availableCurrencies = await response.json();
  getCodes();
}

function populateSelect() {
  codes.forEach((code) => {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = code;
    curSel.appendChild(option);
  });
}

function fetchData() {
  const respone = fetch(ratesUrl);
  chartData = response.json();
  
}



var chartProperties = {
  x: [1, 2, 3, 4, 5],
  y: [chartData],
  mode: 'lines+markers',
  name: 'spline',
  line: {shape: 'spline'},
  type: 'scatter'
};

fetchCodes();

function drawChart() {
  
}





