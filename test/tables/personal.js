
const personal = {
  name: 'Personal',
  roll: '$level',
  rows: [
    {
      end: 4,
      result: [{
        type: 'reference',
        name: 'Gold-0-4'
      }]
    },
    {
      start: 5,
      end: 10,
      result: [{
        type: 'reference',
        name: 'Gold-5-10'
      }]
    },
    {
      start: 11,
      end: 16,
      result: [{
        type: 'reference',
        name: 'Gold-11-16'
      }]
    },
    {
      start: 17,
      result: [{
        type: 'reference',
        name: 'Gold-17+'
      }]
    },
  ],
};

export { personal as default };
