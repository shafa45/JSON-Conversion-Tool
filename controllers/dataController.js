const axios = require('axios');
const { convertData } = require('../services/dataService');
const rules = require('../utils/rules');
const mappings = require('../utils/mappings');

let ruleList = rules;
let mappingList = mappings;

args = process.argv.slice(2);
let runOnCLI = false;
args.forEach((arg, index) => {
  let fileName;
  try {
    if (arg === '--rules') {
      fileName = args[index + 1];
      ruleList = require(`./utils/${fileName}`);
    } else if (arg === '--mappings') {
      fileName = args[index + 1];
      mappingList = require(`./utils/${fileName}`);
    } else if (arg === '--run') {
      runOnCLI = true;
    }
  } catch (err) {
    console.log(`File ${fileName} not found for`, arg);
  }
});

console.log('RULE->', mappingList);
console.log('MAPPING->', ruleList);

const fetchData = async () => {
  try {
    const { data } = await axios.get('https://reqres.in/api/users');
    return data.data;
  } catch (err) {
    console.log(err);
  }
};

if (runOnCLI) {
  console.log('Running on CLI');
  fetchData().then((data) => {
    const result = convertData(data, mappingList, ruleList);
    console.log(result);
  });
}

const convertDataController = async (req, res) => {
  try {
    // const { data, mappings, rules } = req.body;
    if (!mappingList || mappingList.length == 0) return res.json(data.data);
    const data = await fetchData();
    const result = convertData(data, mappingList, ruleList);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = convertDataController;
