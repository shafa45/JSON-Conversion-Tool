const axios = require('axios');
const convertData = require('../services/dataService');
const rules = require('../utils/rules');
const mappings = require('../utils/mappings');

let ruleList = rules;
let mappingList = mappings;

// args = process.argv.slice(2);
// args.forEach((arg, index) => {
//   let fileName;
//   try {
//     if (arg === '--rules') {
//       fileName = args[index + 1];
//       ruleList = require(`./utils/${fileName}`);
//     } else if (arg === '--mappings') {
//       fileName = args[index + 1];
//       mappingList = require(`./utils/${fileName}`);
//     }
//   } catch (err) {
//     console.log(`File ${fileName} not found for`, arg);
//   }
//});

console.log('RULE->', mappingList);
console.log('MAPPING->', ruleList);


const convertDataController = async (req, res) => {
  try {
    // const { data, mappings, rules } = req.body;
    const { data } = await axios.get('https://reqres.in/api/users');
    if (!data) return res.status(400).json({ message: 'No data found' });
    if (!mappingList || mappingList.length == 0) return res.json(data.data);
    const result = convertData(data.data, mappingList, ruleList);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = convertDataController;
