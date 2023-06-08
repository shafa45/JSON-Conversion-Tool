const express = require('express');
const axios = require('axios');
const rules = require('./utils/rules');
const mappings = require('./utils/mappings');
const dummyData = require('./utils/dummyData');

const port = 3000;
const app = express();
app.use(express.json());

let ruleList = rules;
let mappingList = mappings;

args = process.argv.slice(2);
args.forEach((arg, index) => {
  let fileName;
  try {
    if (arg === '--rules') {
      fileName  = args[index + 1];
      ruleList = require(`./utils/${fileName}`);
    }
    else if (arg === '--mappings') {
      fileName  = args[index + 1];
      mappingList = require(`./utils/${fileName}`);
    }
  } catch (err) {
    console.log(`File ${fileName} not found for`, arg)
  }
});

console.log('RULE->', mappingList);
console.log('MAPPING->', ruleList);


app.post('/convert', async (req, res) => {
  // const { data, mapping, rules } = req.body;
  try {
    const { data } = await axios.get('https://reqres.in/api/users');
    const result = convert(data.data, mappingList, ruleList);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

function convert(data, mappings, rules) {
  const result = [];
  data.forEach((item) => {
    const newItem = {};
    mappings.forEach((map) => {
      const key = map.value;
      const value = item[map.key];
      newItem[key] = value;
    });
    rules.forEach((rule) => {
      const { rule: ruleName, fields } = rule;
      fields.forEach((field) => {
        if (!(field in newItem)) return;
        newItem[field] = applyRule(ruleName, newItem[field]);
      });
    });
    result.push(newItem);
  });
  return result;
}

function applyRule(ruleName, value) {
  try {
    switch (ruleName) {
      case 'convertToUpperCase':
        return value.toUpperCase();
      case 'convertToLowerCase':
        return value.toLowerCase();
      case 'convertToNumber':
        return Number(value);
      default:
        return value;
    }
  } catch (err) {
    console.log(`Error applying rule ${ruleName} to value ${value}`);
    return value;
  }
}

app.listen(port, () => {
  console.log(`app listening on ${port}`);
});
