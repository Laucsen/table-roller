
const gold = {
  name: 'Gold-17+',
  roll: '1d100',
  rows: [
    {
      start: 1,
      end: 15,
      result: [{
        type: 'roll',
        rule: '2d6x1000',
        item: { resultType: 'money', name: 'PE' },
      }, {
        type: 'roll',
        rule: '8d6x100',
        item: { resultType: 'money', name: 'PO' },
      }]
    },
    {
      start: 16,
      end: 55,
      result: [{
        type: 'roll',
        rule: '1d6x1000',
        item: { resultType: 'money', name: 'PO' },
      }, {
        type: 'roll',
        rule: '1d6x100',
        item: { resultType: 'money', name: 'PL' },
      }]
    },
    {
      start: 56,
      end: 100,
      result: [{
        type: 'roll',
        rule: '1d6x1000',
        item: { resultType: 'money', name: 'PO' },
      }, {
        type: 'roll',
        rule: '2d6x100',
        item: { resultType: 'money', name: 'PL' },
      }]
    },
  ],
};

export { gold as default };
