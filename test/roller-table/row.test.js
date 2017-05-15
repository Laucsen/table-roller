import Row from '../../src/roller-table/row';

describe('roller-table = row:', () => {
  it('should create a row with default data structure', () => {
    expect(() => {
      new Row({
        name: 'testTable',
      }, {
        start: 1,
        end: 30,
        result: [{
          type: 'roll',
          rule: '5d6',
          item: { resultType: 'money', name: 'PC' },
        }]
      });
    }).to.not.throw();
  });

  it('should create a row with resumed result', () => {
    expect(() => {
      new Row({
        name: 'testTable',
      }, {
        start: 1,
        end: 30,
        result: {
          type: 'roll',
          rule: '5d6',
          item: { resultType: 'money', name: 'PC' },
        },
      });
    }).to.not.throw();
  });

  it('should create a row with single value', () => {
    expect(() => {
      new Row({
        name: 'testTable',
      }, {
        roll: 1,
        result: {
          type: 'roll',
          rule: '5d6',
          item: { resultType: 'money', name: 'PC' },
        },
      });
    }).to.not.throw();
  });
});
