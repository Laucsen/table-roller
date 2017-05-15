import Treasures from '../src/index';

describe('roll errors:', () => {
  let treasures;

  beforeEach(() => {
    treasures = new Treasures();
  });

  it('should return an error when rolling invalid tables', () => {
    return treasures.roll({
      type: 'qwert',
    }).should.be.rejectedWith('Type not available: qwert');
  });
});
