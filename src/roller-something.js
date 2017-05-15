export default class Something {
  constructor(resultType, name, amount = 1, description = '', ) {
    this.amount = amount;
    this.resultType = resultType;
    this.name = name;
    this.description = description;
  }

  clone() {
    return new Something(this.resultType, this.name, this.amount, this.description);
  }

  add(something) {
    if (something.name === this.name) {
      this.amount += something.amount;
    }
  }

  toJSON() {
    return {
      amount: this.amount,
      type: this.resultType,
      name: this.name,
      description: this.description,
    };
  }
}
