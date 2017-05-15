import Treasures from '../src/index';

describe('default errors:', () => {
  let treasures;

  beforeEach(() => {
    treasures = new Treasures();
  });

  describe('# tables -> ', () => {
    it('should throw an error when creating a table without a name', () => {
      return treasures.register({
        rows: [],
      }).should.be.rejectedWith('Table name is a mandatory field.');
    });

    it('should throw an error when creating a table with wrong argument type', () => {
      return treasures.register({
        name: 'someawfullname',
        rows: [],
        roll: 'asdasd',
      }).should.be.rejectedWith('Table roll must be a Roll (0d0x0) or an argument($).');
    });

    it('should throw an error when creating a table ha no rows', () => {
      return treasures.register({
        name: 'someawfullname',
        rows: [],
        roll: '$level',
      }).should.be.rejectedWith('Table must have at least one roll.');
    });
  });

  describe('# rows', () => {
    it('should not throw an error on rows without result', () => {
      return treasures.register({
        name: 'someawfullname',
        rows: [{}],
        roll: '$level',
      }).should.not.be.rejectedWith('A row must have a result to its rolls.');
    });

    it('should throw an error on rows without start and end attributes', () => {
      return treasures.register({
        name: 'someawfullname',
        rows: [{
          result: [],
        }],
        roll: '$level',
      }).should.be.rejectedWith('A row must have an interval set by "start" and "end" attribute.');
    });

    it('should throw an error on rows with start higher than end', () => {
      return treasures.register({
        name: 'someawfullname',
        rows: [{
          start: 5,
          end: 2,
          result: [],
        }],
        roll: '$level',
      }).should.be.rejectedWith('End must be higher or equal start value.');
    });
  });

  describe('# results', () => {
    it('should throw an error on results with wrong type', () => {
      return treasures.register({
        name: 'someawfullname',
        rows: [{
          start: 5,
          end: 2,
          result: [{
            type: 'yellow',
          }],
        }],
        roll: '$level',
      }).should.be.rejectedWith('Invalid result type: yellow.');
    });

    it('should throw an error on REFERENCE results without a name', () => {
      return treasures.register({
        name: 'someawfullname',
        rows: [{
          start: 5,
          end: 2,
          result: [{
            type: 'reference',
          }],
        }],
        roll: '$level',
      }).should.be.rejectedWith('Reference type results must have a name.');
    });

    it('should throw an error on ROLL without roll rule', () => {
      return treasures.register({
        name: 'someawfullname',
        rows: [{
          start: 5,
          end: 2,
          result: [{
            type: 'roll',
          }],
        }],
        roll: '$level',
      }).should.be.rejectedWith('Roll type results must have a rule.');
    });

    it('should throw an error on ROLL without an result item', () => {
      return treasures.register({
        name: 'someawfullname',
        rows: [{
          start: 5,
          end: 2,
          result: [{
            type: 'roll',
            rule: '1d6x45',
          }],
        }],
        roll: '$level',
      }).should.be.rejectedWith('Roll type results must have an item result.');
    });

    it('should throw an error on ROLL with invalid roll rule', () => {
      return treasures.register({
        name: 'someawfullname',
        rows: [{
          start: 5,
          end: 2,
          result: [{
            type: 'roll',
            rule: '986t9iuyfgvbnjkl',
          }],
        }],
        roll: '$level',
      }).should.be.rejectedWith('Roll type results must have an item result.');
    });
  });
});
