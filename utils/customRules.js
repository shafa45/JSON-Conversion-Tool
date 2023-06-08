const rules = [
  {
    rule: 'convertToUpperCase',
    fields: ['fName', 'lName', 'email'],
  },
  {
    rule: 'convertToNumber',
    fields: ['id'],
  },
  // {
  //   rule: 'convertoToLowerCase',
  //   fields: ['fName', 'lName', 'email'],
  // },
];

module.exports = rules;
