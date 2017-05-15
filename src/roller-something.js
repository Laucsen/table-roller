export default class Something {
  constructor(itemType, name, amount = 1, description = '', ) {
    this.amount = amount;
    this.itemType = itemType;
    this.name = name;
    this.description = description;
  }

  clone() {
    return new Something(this.itemType, this.name, this.amount, this.description);
  }

  add(something) {
    if (something.name === this.name) {
      this.amount += something.amount;
    }
  }

  toJSON() {
    return {
      amount: this.amount,
      type: this.itemType,
      name: this.name,
      description: this.description,
    };
  }
}
