const express = require('express');
const axios = require('axios');
const rules = require('./utils/rules');
const mappings = require('./utils/mappings');
const dummyData = require('./utils/dummyData');


const port = 3000;
const app = express();
app.use(express.json());

let rule = rules;
let mapping = mappings;


console.log('RULE->', rule);
console.log('MAPPING->', mapping);

app.post('/convert', async (req, res) => {
  // const { data, mapping, rules } = req.body;
  try {
    const { data } = await axios.get('https://reqres.in/api/users');
    const result = convert(data.data, mapping, rules);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

function convert(data, mapping, rules) {
  const result = [];
  data.forEach((item) => {
    const newItem = {};
    mapping.forEach((map) => {
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
