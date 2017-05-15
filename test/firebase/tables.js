import { AbstractTable } from '../../src/index';

export class FireBaseOnDemandLanguage extends AbstractTable {
  constructor(db, languageName) {
    super();
    this.db = db;
    this.languageName = languageName;
    this.data = null;
  }

  get() {
    if (this.data === null) {
      return new Promise((resolve, reject) => {
        this.db.ref(`/lang/${this.languageName}`).once('value', (data) => {
          const value = data.val();
          const fv = Object.assign(value, {
            name: this.languageName,
          });
          resolve(fv);
          this.data = fv;
        }, (err) => reject(err));
      });
    }
    return Promise.resolve(this.data);
  }
}

export class FireBaseOnDemandTable extends AbstractTable {
  constructor(db, tableName) {
    super();
    this.db = db;
    this.tableName = tableName;
    this.data = null;
  }

  get() {
    if (this.data === null) {
      return new Promise((resolve, reject) => {
        this.db.ref(`/treasures/${this.tableName}`).once('value', (data) => {
          const value = data.val();
          resolve(value);
          this.data = value;
        }, (err) => reject(err));
      });
    }
    return Promise.resolve(this.data);
  }
}
