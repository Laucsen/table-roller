import Result from './result';

export default class Row {
  constructor(table, row) {
    this.table = table;

    this.start = -1;
    this.end = -1;
    this.results = [];

    if (row.result === undefined || row.result === null) {
      row.result = [];
    }

    let localResult = Array.isArray(row.result) ? row.result : [row.result];
    this.results.push(...localResult.map(r => {
      return new Result(this.table, r);
    }));

    let start = row.start;
    let end = row.end;
    if (row.roll !== undefined) {
      start = row.roll;
      end = row.roll;
    }

    if (start === undefined && end === undefined) {
      throw new Error('A row must have an interval set by "start" and "end" attribute.');
    } else if (start === undefined && end !== undefined) {
      this.start = 0;
      this.end = end;
    } else if (start !== undefined && end === undefined) {
      this.start = start;
      this.end = -1;
    } else {
      this.start = start;
      this.end = end;
    }

    if (this.start >= 0 && this.end >= 0 && this.start > this.end) {
      throw new Error('End must be higher or equal start value.');
    }
  }

  match(value) {
    if (this.start === 0) {
      return value <= this.end;
    } else if (this.end === -1) {
      return value >= this.start;
    }

    return value >= this.start && value <= this.end;
  }
}
