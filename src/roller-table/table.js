import RollerResolver, {isRoll} from '../roller-resolver';
import ArgumentResolver, {isArgument} from '../roller-argument';

import Result from './result';
import Row from './row';

export default class Table {
  constructor(rawTable) {
    if (rawTable.name === undefined) {
      throw new Error('Table name is a mandatory field.');
    }

    this.name = rawTable.name;
    this.defaultRoll = rawTable.roll;
    this.rows = [];
    if (rawTable.defaultResults !== undefined) {
      this.defaultResults = rawTable.defaultResults.map(rr => {
        return new Result(this, rr);
      });
    }

    if (!isRoll(this.defaultRoll) && !isArgument(this.defaultRoll)) {
      throw new Error('Table roll must be a Roll (0d0x0) or an argument($).');
    }

    if (rawTable.rows === undefined
      || !Array.isArray(rawTable.rows)
      || rawTable.rows.length === 0) {
      throw new Error('Table must have at least one roll.');
    }

    rawTable.rows.forEach(r => {
      this.rows.push(new Row(this, r));
    });
  }

  rollRange() {
    const sortedRow = this.rows.sort((ra, rb) => {
      return Number(ra.start) - Number(rb.start);
    });

    return {
      start: sortedRow[0].start,
      end: sortedRow[this.rows.length-1].end,
    };
  }

  roll(args) {
    let input = null;
    if (isArgument(this.defaultRoll)) {
      const argName = ArgumentResolver(this.defaultRoll);
      input = Number(args[argName]);
    } else {
      input = RollerResolver(this.defaultRoll);
    }

    const lRow = this.rows.filter(r => r.match(input));
    if (lRow.length !== 1) {
      return [];
    }

    return lRow[0].results;
  }
}
