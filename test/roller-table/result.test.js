import Result from '../../src/roller-table/result';

describe('roller-table = result:', () => {
  it('should create a result with default data structure', () => {
    expect(() => {
      new Result({
        name: 'testTable',
      }, {
        type: 'roll',
        rule: '1d5',
        item: { resultType: 'gem', name: 'Azurita' },
      });
    }).to.not.throw();
  });

  it('should create a resumed result', () => {
    expect(() => {
      new Result({
        name: 'testTable',
      }, { resultType: 'gem', name: 'Azurita' });
    }).to.not.throw();
  });
});
