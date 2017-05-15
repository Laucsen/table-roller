
const pile04 = {
  name: 'Pile-0-4',
  roll: '1d100',
  rows: [
    {
      start: 1,
      end: 6,
      result: []
    },
    {
      start: 7,
      end: 100,
      result: [{
        type: 'roll_reference',
        rule: '2d6',
        name: 'Gem-10'
      }]
    },
  ],
  defaultResults: [
    {
      type: 'roll',
      rule: '6d6x100',
      item: { itemType: 'money', name: 'PC' },
    }, {
      type: 'roll',
      rule: '3d6x100',
      item: { itemType: 'money', name: 'PP' },
    }, {
      type: 'roll',
      rule: '2d6',
      item: { itemType: 'money', name: 'PO' },
    }
  ],
};

export { pile04 as default };
