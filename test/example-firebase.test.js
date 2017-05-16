import firebase from 'firebase';

import Treasures from '../src/index';

import { FireBaseOnDemandLanguage, FireBaseOnDemandTable } from './firebase/tables';

// describe_not
// eslint-disable-next-line no-undef
describe_not('firebase table rolls', () => {
  let db;
  let treasures;
  let availableTables;

  // Init firebase
  before(() => {
    firebase.initializeApp({
      databaseURL: 'https://treasures5-828ab.firebaseio.com/',
    });
    db = firebase.database();
  });

  // Create a new Treasures
  before(() => {
    treasures = new Treasures();
  });

  // Add a language.
  before((done) => {
    treasures.addLanguages([
      new FireBaseOnDemandLanguage(db, 'PT-BR'),
    ])
      .then(() => {
        treasures.setLanguage('PT-BR');
        return null;
      })
      .then(() => done())
      .catch(err => done(err));
  });

  before((done) => {
    db.ref('/treasures-tables').once('value', (data) => {
      const value = data.val();
      availableTables = value;
      done();
    }, (err) => done(err));
  });

  // Register all treasure rolls.
  before((done) => {
    treasures.registerAll(availableTables.map(t => new FireBaseOnDemandTable(db, t)))
      .then(analysis => {
        // console.log(analysis);
        return analysis;
      })
      .then(() => done())
      .catch(err => done(err));
  });

  // Run a roll
  it('should mix stack with personal', () => {
    // Do not roll with errors and missing referencesL.
    return treasures.rollAll([{
      type: 'Personal',
      args: { level: 1 },
    }, {
      type: 'Personal',
      args: { level: 20 }
    }, {
      type: 'Personal',
      args: { level: 11 }
    }, {
      type: 'Personal',
      args: { level: 19 }
    }, {
      type: 'Personal',
      args: { level: 18 }
    }, {
      type: 'Stack',
      args: { level: 1 }
    // }, {
      // type: 'Stack',
      // args: { level: 7 }
    // }, {
    //   type: 'Stack',
    //   args: { level: 15 }
    // }, {
    //   type: 'Stack',
    //   args: { level: 20 }
    }])
      .then(result => {
        result.groupTypeBy('money', 'Carteira');
        result.groupTypeBy('gem', 'Bolsa');
        result.groupTypeBy('art', 'Saco');
        return result;
      })
      .then(categorized => {
        categorized.stack();
        return categorized;
      })
      .then(res => {
        // console.log(res.toJSON());
        // console.log(res.listNames());
        // console.log(res.listDeslcriptions());
        // console.log(res.listFull());
        return res;
      })
      .should.not.be.rejected();
  });
});
