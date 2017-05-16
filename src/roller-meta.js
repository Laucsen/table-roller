
export class AbstractTable {
  get() {
    throw new Error('Method not implemented: get');
  }
}

export class OnDemandTable extends AbstractTable {
  constructor(getter) {
    super();
    this.getter = getter;
  }

  get() {
    return new Promise(this.getter);
  }
}

export class RawTable extends AbstractTable {
  constructor(rawTable) {
    super();
    this.rawTable = rawTable;
  }

  get() {
    return Promise.resolve(this.rawTable);
  }
}
