console.log('app.js init');

// http://api.nbp.pl/api/exchangerates/rates/a/gbp/last/10/?format=json last 10 GBP rates

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

  curSel.addEventListener('change', (event) => {
    fetchData(event.target.value);
  });
}

async function fetchData(currencyCode = 'gbp') {
  try {
    let proxyUrl = 'https://cors-anywhere.herokuapp.com/';  
    let targetUrl = `http://api.nbp.pl/api/exchangerates/rates/a/${currencyCode}/last/10/?format=json`;
    ratesUrl = proxyUrl + targetUrl;

    const response = await fetch(ratesUrl);
    const data = await response.json();
    chartData = data.rates.map(rate => rate.mid);

    chartProperties.x = data.rates.map(rate => rate.effectiveDate);
    chartProperties.y = chartData;

    drawChart();
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
}



var chartProperties = {
  mode: 'lines+markers',
  name: 'spline',
  line: {shape: 'spline'},
  type: 'scatter'
};

fetchCodes().then(() => {
  fetchData('gbp');
});

function drawChart() {
  Plotly.newPlot('chart', [chartProperties]);
}





