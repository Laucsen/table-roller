export default class Item {
  constructor(table, item) {
    this.table = table;

    this.name = item.name;
    this.resultType = item.resultType;

    if (this.name === undefined) {
      throw new Error(`Na item must have a name in table ${table.name}`);
    }
    if (this.resultType === undefined) {
      throw new Error(`An item must have a resultType in table ${table.name}`);
    }
  }
}

export function isItem(data) {
  return data.name !== undefined && data.resultType !== undefined;
}
