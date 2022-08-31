import fetch from 'node-fetch';
globalThis.fetch = fetch;

function getCountriesData() {
  const endpoint = 'https://restcountries.com/v3.1/all';

  return fetch(endpoint)
    .then(data => data.json())
}

async function getNames() {
  const countriesNames = await getCountriesData()
    .then(data => data.map(({ name }) => name.common));

  return countriesNames;
}

async function getCapitals() {
  const countriesCapitals = await getCountriesData()
    .then(data => data.map(({ capital }) => capital));

  return countriesCapitals;
}

async function getAreas() {
  const countriesAreas = await getCountriesData()
    .then(data => data.map(({ area }) => area));

  return countriesAreas;
}

async function getCurrencies() {
  const countriesCurrencies = await getCountriesData()
    .then(data => data.map(({ currencies }) => {
      let code = ['-'];

      if (currencies) {
        code = Object.keys(currencies);
      }

      return code;
    }))

  return countriesCurrencies;
}

const test = await getCurrencies();

console.log(test[1]);




// getNames();
// getCapitals();
// getAreas();

