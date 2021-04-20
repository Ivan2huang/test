const fs = require('fs');

const en = require('../src/i18n/lang/en-HK.json');
const zh = require('../src/i18n/lang/zh-HK.json');

const updatedZh = zh;

const enKeys = Object.keys(en);
const zhKeys = Object.keys(zh);

enKeys.forEach(enKey => {
  if (!zhKeys.includes(enKey)) {
    updatedZh[enKey] = 'XXX';
  }
});

fs.writeFileSync('src/i18n/lang/zh-HK.json', JSON.stringify(updatedZh), err => {
  if (err) throw err;
});
