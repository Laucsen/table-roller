
const stackPile = {
  name: 'Stack',
  roll: '$level',
  rows: [
    {
      end: 4,
      result: [{
        type: 'reference',
        name: 'Pile-0-4'
      }]
    },
    {
      start: 5,
      end: 10,
      result: [{
        type: 'reference',
        name: 'Pile-0-4'
      }]
    },
    {
      start: 11,
      end: 16,
      result: [{
        type: 'reference',
        name: 'Pile-0-4'
      }]
    },
    {
      start: 17,
      result: [{
        type: 'reference',
        name: 'Pile-0-4'
      }]
    },
  ],
};

export { stackPile as default };
