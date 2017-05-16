import Treasures from '../src/index';

import ptbr from './tables/lang-PT-BR';

describe('language table validation', () => {
  let treasures;

  // Create a new Treasures
  before(() => {
    treasures = new Treasures();
  });

  // Add a language.
  it('should validate language structure', (done) => {
    treasures.addLanguages([
      Object.assign({}, ptbr, {
        name: 'PT-BR',
      }),
    ])
      .then(() => {
        treasures.setLanguage('PT-BR');
        return null;
      })
      .then(() => done())
      .catch(err => done(err));
  });

  it('should error on translation without name', () => {
    return treasures.addLanguages([
      Object.assign({
        gem: {
          'Azurita': {},
        }
      }),
    ]).should.be.rejectedWith('Item has not a name: Azurita');
  });

  it('should error on translation without name', () => {
    return treasures.addLanguages([
      Object.assign({
        gem: {
          'Azurita': {
            name: 'Azurita',
          },
        }
      }),
    ]).should.be.rejectedWith('Item has not a description: Azurita');
  });
});
