
class Category {
  constructor(name, items = []) {
    this.name = name;
    this.items = items;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  append(category) {
    this.items.push(...category.items);
  }

  stack() {
    let control = {};
    this.items.forEach(it => {
      if (control[it.name] === undefined) {
        control[it.name] = it.clone();
      } else {
        control[it.name].add(it);
      }
    });

    this.items = [];
    Object.keys(control).forEach(c => {
      this.items.push(control[c]);
    });
  }

  push(items) {
    this.items.push(...items);
  }

  slice(type) {
    const sliced = this.items.reduce((pre, current) => {
      if (current.resultType === type) {
        pre.ofType.push(current);
      } else {
        pre.rest.push(current);
      }
      return pre;
    }, {
      rest: [],
      ofType: [],
    });
    this.items = sliced.rest;
    return sliced.ofType;
  }

  listNames() {
    return this.items.map(i => `${i.amount} ${i.name}`);
  }

  listDescriptions() {
    return this.items.map(i => `${i.amount} ${i.description}`);
  }

  listFull() {
    return this.items.map(i => `${i.amount} ${i.name} (${i.description})`);
  }

  toJSON() {
    return this.items.map(i => i.toJSON());
  }
}

export default class Wallet {
  constructor(items = [], category = 'General') {
    this.categories = {};
    this.categories[category] = new Category('General', items);
  }

  append(wallet) {
    Object.keys(wallet.categories).forEach(cat => {
      if (this.categories[cat] === undefined) {
        this.categories[cat] = new Category('cat');
      }
      this.categories[cat].append(wallet.categories[cat]);
    });
  }

  groupTypeBy(type, categoryName) {
    Object.keys(this.categories).forEach(cat => {
      const ofType = this.categories[cat].slice(type);
      if (ofType.length > 0) {
        if (this.categories[categoryName] === undefined) {
          this.categories[categoryName] = new Category(categoryName);
        }
        this.categories[categoryName].push(ofType);
      }

      if (this.categories[cat].isEmpty()) {
        delete this.categories[cat];
      }
    });
  }

  stack() {
    Object.keys(this.categories).forEach(cat => {
      this.categories[cat].stack();
    });
  }

  listNames() {
    let result = {};
    Object.keys(this.categories).forEach(cat => {
      result[cat] = this.categories[cat].listNames();
    });
    return result;
  }

  listDescriptions() {
    let result = {};
    Object.keys(this.categories).forEach(cat => {
      result[cat] = this.categories[cat].listDescriptions();
    });
    return result;
  }

  listFull() {
    let result = {};
    Object.keys(this.categories).forEach(cat => {
      result[cat] = this.categories[cat].listFull();
    });
    return result;
  }

  toJSON() {
    let result = {};
    Object.keys(this.categories).forEach(cat => {
      result[cat] = this.categories[cat].toJSON();
    });
    return result;
  }
}
