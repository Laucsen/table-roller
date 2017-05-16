import Table from './roller-table/table';
import RollResolver from './roller-resolver';
import Something from './roller-something';
import Wallet from './roller-wallet';
import { OnDemandTable, RawTable, AbstractTable } from './roller-meta';
import { REFERENCE, ROLL, ROLL_REFERENCE } from './roller-constants';

import validateTables from './roller-validations/tables';
import validateLanguage from './roller-validations/language';

function isNull(item) {
  return item === null || item === undefined;
}

export default class Roller {
  constructor() {
    this.status = {
      arguments: [],
      ranges: {},
      warnings: [],
      errors: [],
      missingReferences: {},
    };
    this.tables = {};

    this.currentLanguage = null;
    this.languages = {};
  }

  /**
   * Register a promise function that is called every time this table is required.
   * @param fnc
   * @returns {OnDemandTable}
   */
  onDemand(fnc) {
    return new OnDemandTable(fnc);
  }

  setLanguage(lang) {
    this.currentLanguage = lang;
  }

  addLanguage(langTable) {
    // OnDemandTable, RawTable or AbstractTable implementation.
    return new Promise((resolve, reject) => {
      const incomingLanguage = (langTable instanceof AbstractTable)
        ? langTable
        : new RawTable(langTable);

      return incomingLanguage.get()
        .then((languageTable) => {
          const valRes = validateLanguage(languageTable);
          if (valRes !== true) {
            throw new Error(valRes);
          }
          this.languages[languageTable.name] = languageTable;
          this.currentLanguage = this.currentLanguage === null
            ? languageTable.name
            : this.currentLanguage;
          resolve();
        })
        .catch(reject);
    });
  }

  addLanguages(langTables) {
    return Promise.all(langTables.map(item => {
      return this.addLanguage(item);
    }));
  }

  register(rawTable) {
    return new Promise((resolve, reject) => {
      if (rawTable instanceof AbstractTable) {
        return rawTable.get()
          .then(data => {
            validateTables.call(this, data);
            this.tables[data.name] = rawTable;
            resolve();
          })
          .catch(reject);
      }

      const nt = new RawTable(rawTable);
      validateTables.call(this, rawTable);
      this.tables[rawTable.name] = nt;

      resolve(this.status);
    });
  }

  registerAll(rawTables) {
    return Promise.all(rawTables.map(item => {
      return this.register(item);
    }))
      .then(() => this.status);
  }

  createSomething(item, value) {
    if (this.currentLanguage === null) {
      return new Something(item.resultType, item.name, value);
    }

    const lTable = this.languages[this.currentLanguage];

    if (lTable[item.resultType] === undefined || lTable[item.resultType][item.name] === undefined) {
      return new Something(item.resultType, item.name, value);
    }

    const name = lTable[item.resultType][item.name].name;
    const description = lTable[item.resultType][item.name].description;

    return new Something(item.resultType, name, value, description);
  }

  rollAll(rolls) {
    if (this.status.errors.length !== 0
      || Object.keys(this.status.missingReferences).length !== 0) {
      return Promise.reject(new Error('Impossible to roll tables with error or missing dependencies.'));
    }
    // 1. Roll all rules.
    return new Promise((resolve) => {
      return Promise.all(rolls.map(r => this.roll(r)))
        .then(response => resolve(response.reduce((pev, curr) => {
          pev.append(curr);
          return pev;
        }, new Wallet())));
    });
  }

  roll(roll) {
    // 1. Roll a rule.
    return new Promise((resolve) => this
      .execute(roll.type, roll.args)
      .then((executed) => resolve(new Wallet(executed))));
  }

  execute(type, args) {
    if (this.tables[type] === undefined) {
      throw new Error(`Type not available: ${type}`);
    }

    return this.tables[type]
      .get()
      .then((c) => new Table(c))
      .then((currentTable) => {
        let resultsToProcess = [];

        // Defaults
        if (currentTable.defaultResults !== undefined) {
          resultsToProcess.push(...currentTable.defaultResults);
        }

        // Blocks
        const results = currentTable.roll(args);
        if (Array.isArray(results)) {
          resultsToProcess.push(...results);
        } else if (!Array.isArray(results)) {
          resultsToProcess.push(results);
        }

        return this.process(resultsToProcess, args);
      });
  }

  process(resultsToProcess, args) {
    let blockResult = [];

    resultsToProcess.forEach(b => {
      if (b.type === REFERENCE) {
        const tableName = b.name;
        if (isNull(tableName)) {
          throw new Error(`Reference table in ${b.type} must have a name`);
        }
        const executed = this.execute(tableName, args);
        blockResult.push(executed);
      } else if (b.type === ROLL) {
        const rule = b.rule;
        const value = RollResolver(rule);
        blockResult.push(this.createSomething(b.item, value));
      } else if (b.type === ROLL_REFERENCE) {
        const rule = b.rule;
        const tableName = b.name;
        if (isNull(tableName)) {
          throw new Error(`Reference table in ${b.type} must have a name`);
        }

        const value = RollResolver(rule);
        for (let i = 0; i < value; i++) {
          const executed = this.execute(tableName, args);
          blockResult.push(executed);
        }
      } else {
        throw new Error(`Invalid type: ${b.type}.`);
      }
    });

    return Promise.all(blockResult)
      .then(simulations => {
        let result = [];
        simulations.forEach(item => {
          if (Array.isArray(item)) {
            result.push(...item);
          } else {
            result.push(item);
          }
        });
        return result;
      });
  }
}

export { AbstractTable };
