export default class Item {
  constructor(item) {
    this.name = item.name;
    this.itemType = item.itemType;

    if (this.name === undefined) {
      throw new Error('Na item must have a name');
    }
    if (this.itemType === undefined) {
      throw new Error('Na item must have a itemType');
    }
  }
}

export function isItem(data) {
  return data.name !== undefined && data.itemType !== undefined;
}
