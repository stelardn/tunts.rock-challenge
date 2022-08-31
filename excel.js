const countries = require('./countries');

const xl = require('excel4node');

const wb = new xl.Workbook();

const ws = wb.addWorksheet('Countries List');

// Title

const titleStyle = wb.createStyle({
  font: {
    color: '#4F4F4F',
    size: 16,
    bold: true
  },
  alignment: {
    horizontal: 'center'
  }
});

ws.cell(1, 1, 1, 4, true).string('Countries List').style(titleStyle);

// Header

const headerStyle = wb.createStyle({
  font: {
    color: '#808080',
    size: 12,
    bold: true
  }
});

ws.cell(2, 1).string('Name').style(headerStyle);
ws.cell(2, 2).string('Capital').style(headerStyle);
ws.cell(2, 3).string('Area').style(headerStyle);
ws.cell(2, 4).string('Currencies').style(headerStyle);


// Data to cells

let nameCounter = 3;
let capitalCounter = 3;
let areaCounter = 3;
let currencyCounter = 3;

// names
countries.getNames()
  .then(data => data.forEach(name => {
    ws.cell(nameCounter, 1).string(name);
    nameCounter++;
    console.log(name);
  }))

  // capitals
  .then(countries.getCapitals())
  .then(data => data.forEach(capitals => {
    ws.cell(capitalCounter, 2).string(capitals);
    capitalCounter++;
    console.log(capitals);
  }))

  // areas
  .then(countries.getAreas())
  .then(data => data.forEach(area => {
    ws.cell(areaCounter, 3).string(area)
    areaCounter++;
    console.log(area)
  }))

  // currencies
  .then(countries.getCurrencies())
  .then(data => data.forEach(currencies => {
    ws.cell(currencyCounter, 4).string(currencies);
    currencyCounter++;
    console.log(currencies);
  }))

  // create XLXS file
  .then(data => {
    wb.write('CountriesList.xlsx');
  });
