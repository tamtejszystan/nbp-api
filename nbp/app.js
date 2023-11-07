console.log('app.js init');

let data = [];
let codes = [];
const curSel = document.getElementById('cur-sel');

function getCodes() {
  if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0].rates)) {
    const currCodes = data[0].rates.map((rate) => rate.code);
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
  data = await response.json();
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

fetchCodes();
