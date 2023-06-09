function convertData(data, mappings, rules) {
    const result = [];
    data.forEach((item) => {
      let newItem = mapItem(item, mappings);
      if(Object.keys(rules).length > 0)
      {
          newItem = applyRuleToItem(newItem, rules);
          result.push(newItem);
      }
    });
    return result;
  }

  function mapItem(item, mappings) {
    const newItem = {};
      mappings.forEach((map) => {
        const key = map.value;
        const value = item[map.key];
        newItem[key] = value;
      });
        return newItem;
    }

function applyRuleToItem(newItem, rules) {
    rules.forEach((rule) => {
        const { rule: ruleName, fields } = rule;
        fields.forEach((field) => {
          if (!(field in newItem)) return;
          newItem[field] = applyRuleToValue(ruleName, newItem[field]);
        });
      });
        return newItem;
    }

function applyRuleToValue(ruleName, value) {
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

module.exports = convertData
