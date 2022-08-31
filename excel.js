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

ws.column(1).setWidth(39);
ws.column(2).setWidth(27);
ws.column(3).setWidth(13);
ws.column(4).setWidth(14);

let areaStyle = {
  numberFormat: '###,###,###,###.00'
}


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
    return data;
  }))

  // capitals
  .then(data => {
    data = countries.getCapitals();
    console.log('Names obtained. Getting capital cities...');
    return data;
  })
  .then(data => data.forEach(capitals => {
    ws.cell(capitalCounter, 2).string(capitals);
    capitalCounter++;
  }))

  // areas
  .then(data => {
    data = countries.getAreas();
    console.log('Getting areas...');
    return data;
  })
  .then(data => data.forEach(area => {
    ws.cell(areaCounter, 3).number(area).style(areaStyle);
    areaCounter++;
  }))

  // currencies
  .then(data => {
    data = countries.getCurrencies();
    console.log('Getting currencies...');
    return data;
  })
  .then(data => data.forEach(currencies => {
    ws.cell(currencyCounter, 4).string(currencies);
    currencyCounter++;
  }))

  // create XLSX file
  .then(data => {
    wb.write('CountriesList.xlsx');
    console.log('Excel file ready! Open "CountriesList.xlsx".');
  });
