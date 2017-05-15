
const gold = {
  name: 'Gold-11-16',
  roll: '1d100',
  rows: [
    {
      start: 1,
      end: 20,
      result: [{
        type: 'roll',
        rule: '4d6x100',
        item: { itemType: 'money', name: 'PP' },
      }, {
        type: 'roll',
        rule: '1d6x100',
        item: { itemType: 'money', name: 'PO' },
      }]
    },
    {
      start: 21,
      end: 35,
      result: [{
        type: 'roll',
        rule: '1d6x100',
        item: { itemType: 'money', name: 'PE' },
      }, {
        type: 'roll',
        rule: '1d6x100',
        item: { itemType: 'money', name: 'PO' },
      }],
    },
    {
      start: 36,
      end: 75,
      result: [{
        type: 'roll',
        rule: '2d6x100',
        item: { itemType: 'money', name: 'PO' },
      }, {
        type: 'roll',
        rule: '1d6x10',
        item: { itemType: 'money', name: 'PL' },
      }],
    },
    {
      start: 76,
      end: 100,
      result: [{
        type: 'roll',
        rule: '2d6x100',
        item: { itemType: 'money', name: 'PO' },
      }, {
        type: 'roll',
        rule: '2d6x10',
        item: { itemType: 'money', name: 'PL' },
      }],
    },
  ]
};

export { gold as default };