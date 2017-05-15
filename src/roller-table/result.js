import { isRoll } from '../roller-resolver';
import { REFERENCE, ROLL, ROLL_REFERENCE } from '../roller-constants';
import Item, { isItem } from './item';

const availableTypes = [ REFERENCE, ROLL, ROLL_REFERENCE ];

export default class Result {
  constructor(res) {
    if (res !== undefined && res !== null && isItem(res)) {
      this.type = ROLL;
      this.rule = '1';
      this.item = new Item(res);
      return;
    }

    this.type = res.type;
    if (availableTypes.indexOf(this.type) === -1) {
      throw new Error(`Invalid result type: ${this.type}.`);
    }

    if (this.type === REFERENCE) {
      if (res.name === undefined) {
        throw new Error('Reference type results must have a name.');
      }
      this.name = res.name;
    } else if (this.type === ROLL) {
      this.rule = res.rule;

      if (this.rule === undefined) {
        throw new Error('Roll type results must have a rule.');
      } else if (res.item === undefined) {
        throw new Error('Roll type results must have an item result.');
      } else if (!isRoll(this.rule)) {
        throw new Error(`Invalid rule: ${this.rule}.`);
      }

      this.item = new Item(res.item);
    } else if (this.type === ROLL_REFERENCE) {
      this.name = res.name;
      this.rule = res.rule;

      if (this.name === undefined) {
        throw new Error('Name type results must have a rule');
      } else if (this.rule === undefined) {
        throw new Error('rule type results must have an item result');
      }
    }
  }
}
