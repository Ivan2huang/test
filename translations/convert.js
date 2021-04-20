const csv = require('csvtojson');

const fs = require('fs');

const csvFilePath = './translations/data.csv';
const jsonFilePath = './translations/data.json';

csv()
  .fromFile(csvFilePath)
  .then(jsonObj => {
    const results = jsonObj.reduce((acc, cur) => {
      const { Key: key, Value: value } = cur;
      acc[key] = value;
      return acc;
    }, {});

    const data = JSON.stringify(results);
    fs.writeFileSync(jsonFilePath, data);
  });
