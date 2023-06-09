const mappings = require('./utils/mappings');
const rules = require('./utils/rules');
const {
  mapItem,
  applyRuleToItem,
  applyRuleToValue,
  convertData,
} = require('./services/dataService');

const mockData = [
  {
    id: 1,
    first_name: 'George',
    last_name: 'Bluth',
    email: 'george.bluth@reqres.in',
  },
];

describe('Conversion Tool Unit Tests', () => {
  test('Test Mapping Functionality', () => {
    const actualData = mockData;
    const expectKeys = ['id', 'fName', 'lName', 'email'];
    const result = mapItem(actualData[0], mappings);
    expect(Object.keys(result)).toEqual(expectKeys);
  });
  test('Test Rules applying to Object Functionality', () => {
    const actualData = mockData;
    const expectValue = [1, 'George', 'Bluth', 'GEORGE.BLUTH@REQRES.IN'];
    const result = applyRuleToItem(actualData[0], rules);
    expect(Object.values(result)).toEqual(expectValue);
  });
  test('Test Rules applying to Value Functionality', () => {
    const actualData1 = applyRuleToValue('convertToUpperCase', 'test');
    const expectValue1 = 'TEST';
    expect(actualData1).toEqual(expectValue1);

    const actualData2 = applyRuleToValue('convertToLowerCase', 'TEST');
    const expectValue2 = 'test';
    expect(actualData2).toEqual(expectValue2);

    const actualData3 = applyRuleToValue('convertToNumber', '1');
    const expectValue3 = 1;
    expect(actualData3).toEqual(expectValue3);

    const actualData4 = applyRuleToValue('convertToNumber', 'test');
    const expectValue4 = NaN;
    expect(actualData4).toEqual(expectValue4);

    const actualData5 = applyRuleToValue('test', 'test');
    const expectValue5 = 'test';
    expect(actualData5).toEqual(expectValue5);
  });
});

describe('Conversion Tool Integration Tests', () => {
  test('Test Conversion Functionality', () => {
    const actualData = mockData;
    const result = convertData(actualData, mappings, rules);
    const expectValue = [
      {
        id: 1,
        fName: 'GEORGE',
        lName: 'BLUTH',
        email: 'GEORGE.BLUTH@REQRES.IN',
      },
    ];
    expect(result).toEqual(expectValue);
  });
});
