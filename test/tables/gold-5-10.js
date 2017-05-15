
const gold = {
  name: 'Gold-5-10',
  roll: '1d100',
  rows: [
    {
      start: 1,
      end: 30,
      result: [{
        type: 'roll',
        rule: '4d6x100',
        item: { resultType: 'money', name: 'PC' },
      }, {
        type: 'roll',
        rule: '1d6x10',
        item: { resultType: 'money', name: 'PE' },
      }]
    },
    {
      start: 31,
      end: 60,
      result: [{
        type: 'roll',
        rule: '6d6x10',
        item: { resultType: 'money', name: 'PP' },
      },{
        type: 'roll',
        rule: '2d6x10',
        item: { resultType: 'money', name: 'PO' },
      }],
    },
    {
      start: 61,
      end: 70,
      result: [{
        type: 'roll',
        rule: '3d6x10',
        item: { resultType: 'money', name: 'PE' },
      }, {
        type: 'roll',
        rule: '2d6x10',
        item: { resultType: 'money', name: 'PO' },
      }],
    },
    {
      start: 71,
      end: 95,
      result: [{
        type: 'roll',
        rule: '4d6x10',
        item: { resultType: 'money', name: 'PO' },
      }],
    },
    {
      start: 96,
      end: 100,
      result: [{
        type: 'roll',
        rule: '2d6x10',
        item: { resultType: 'money', name: 'PO' },
      }, {
        type: 'roll',
        rule: '3d6',
        item: { resultType: 'money', name: 'PL' },
      }],
    },
  ]
};

export { gold as default };
