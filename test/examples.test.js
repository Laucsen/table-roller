import Treasures from '../src/index';

import personal from './tables/personal';
import gold04 from './tables/gold-0-4';
import gold510 from './tables/gold-5-10';
import gold1116 from './tables/gold-11-16';
import gold17plus from './tables/gold-17+';

import stackPile from './tables/stackPile';
import pile04 from './tables/pile-0-4';
import gem10 from './tables/gem10';

describe('default table rolls', () => {
  let treasures;

  before((done) => {
    treasures = new Treasures();
    treasures.registerAll([
      // Personal
      personal,
      gold04,
      gold510,
      gold1116,
      gold17plus,

      // Stack
      stackPile,
      pile04,
      gem10,
    ])
      .then(ads => {
        // console.log(ads);
        return ads;
      })
      .then(() => done());
  });

  it('should roll a list of personal rolls', () => {
    return treasures.rollAll([{
      type: 'Personal',
      args: {level: 20}
    }, {
      type: 'Personal',
      args: {level: 11}
    }, {
      type: 'Personal',
      args: {level: 19}
    }, {
      type: 'Personal',
      args: {level: 18}
    }])
      .should.eventually.be(Array);
  });

  it('should roll a list of stackPile rolls', () => {
    return treasures.rollAll([{
      type: 'Stack',
      args: {
        level: 1,
      }
    }]).should.eventually.be(Array);
  });

  it('should mix stack with personal', () => {
    return treasures.rollAll([{
      type: 'Personal',
      args: {level: 20}
    }, {
      type: 'Personal',
      args: {level: 11}
    }, {
      type: 'Personal',
      args: {level: 19}
    }, {
      type: 'Personal',
      args: {level: 18}
    }, {
      type: 'Stack',
      args: {
        level: 1,
      }
    }, {
      type: 'Stack',
      args: {
        level: 7,
      }
    }, {
      type: 'Stack',
      args: {
        level: 15,
      }
    }, {
      type: 'Stack',
      args: {
        level: 20,
      }
    }])
      .then(result => {
        result.groupTypeBy('money', 'Carteira');
        result.groupTypeBy('gem', 'Bolsa');
        return result;
      })
      .then(categorized => {
        categorized.stack();
        return categorized;
      })
      .then(res => {
        // console.log(res.toJSON());
        // console.log(res.listNames());
        // console.log(res.listDescriptions());
        // console.log(res.listFull());
        return res;
      })
      .should.eventually.be(Array);
  });
});
