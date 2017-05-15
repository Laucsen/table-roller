import Result from '../../src/roller-table/result';

describe('roller-table = result:', () => {
  it('should create a result with default data structure', () => {
    expect(() => {
      new Result({
        type: 'roll',
        rule: '1d5',
        item: { itemType: 'gem', name: 'Azurita' },
      });
    }).to.not.throw();
  });

  it('should create a resumed result', () => {
    expect(() => {
      new Result({ itemType: 'gem', name: 'Azurita' });
    }).to.not.throw();
  });
});
