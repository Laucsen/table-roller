import Treasures from '../src/index';

import ptbr from './tables/lang-PT-BR';

describe('table structure analyser', () => {
  let treasures;

  beforeEach(() => {
    treasures = new Treasures();
  });

  it('should get a table argument', () => {
    return treasures.registerAll([{
        name: 'somename',
        roll: '$level',
        rows: [{ roll: 1, result: [] }]
      },])
      .then(response => {
        expect(response.arguments).to.deep.equal(['level']);
      })
      .should.not.be.rejected();
  });

  it('should check row continuity', () => {
    return treasures.registerAll([{
      name: 'somename',
      roll: '$level',
      rows: [
        { roll: 6, result: [] },
        { start: 3, end: 4, result: [] },
        { roll: 2, result: [] },
        { end: 1, result: [] }]
    },])
      .then(response => {
        expect(response.errors).to.deep.equal(['Table has no continuity: somename']);
      })
      .should.not.be.rejected();
  });

  it('should check for rage roll for an argument', () => {
    return treasures.registerAll([{
      name: 'somename',
      roll: '$level',
      rows: [
        { roll: 6, result: [] },
        { start: 3, end: 5, result: [] },
        { roll: 2, result: [] },
        { roll: 1, result: [] }]
    },])
      .then(response => {
        expect(response.ranges.level.start).to.be.equal(1);
        expect(response.ranges.level.end).to.be.equal(6);
      })
      .should.not.be.rejected();
  });

  describe('translations', () => {
    beforeEach(() => {
      return treasures.addLanguages([
        Object.assign({}, ptbr, {
          name: 'PT-BR',
        }),
      ])
        .then(() => {
          treasures.setLanguage('PT-BR');
          return null;
        }).should.not.be.rejected();
    });

    it('should warn for item category not found', () => {
      return treasures.registerAll([{
        name: 'somename',
        roll: '$level',
        rows: [
          { roll: 6, result: [] },
          { start: 3, end: 5, result: [] },
          { roll: 2, result: [] },
          {
            end: 1,
            result: [{
              type: 'roll',
              rule: '4d6x100',
              item: { itemType: 'magic item', name: 'PC' },
            }, {
              type: 'roll',
              rule: '1d6x10',
              item: { itemType: 'money', name: 'PE' },
            }]
          }]
      },])
        .then(response => {
          expect(response.warnings).to.deep.equal(['Translation not found to category: magic item']);
        })
        .should.not.be.rejected();
    });

    it('should warn for item name not found', () => {
      return treasures.registerAll([{
        name: 'somename',
        roll: '$level',
        rows: [
          { roll: 6, result: [] },
          { start: 3, end: 5, result: [] },
          { roll: 2, result: [] },
          {
            end: 1,
            result: [{
              type: 'roll',
              rule: '4d6x100',
              item: { itemType: 'money', name: 'PCC' },
            }, {
              type: 'roll',
              rule: '1d6x10',
              item: { itemType: 'money', name: 'PE' },
            }]
          }]
      },])
        .then(response => {
          expect(response.warnings).to.deep.equal(['Translation not found on category money: PCC']);
        })
        .should.not.be.rejected();
    });
  });
});
