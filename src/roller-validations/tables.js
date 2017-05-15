import Table from '../roller-table/table';

import ArgumentResolver, { isArgument } from '../roller-argument';

export default function validateTables(data) {
  const table = new Table(data);

  // Continuity
  let hasContinuity = true;
  let controll = null;
  table.rows.sort((ra, rb) => {
    return Number(ra.start) - Number(rb.start);
  }).forEach(row => {
    if (controll === null) {
      controll = row.end;
    } else {
      if (row.start !== (controll + 1)) {
        this.status.errors.push(`Table has no continuity: ${table.name}`);
        hasContinuity = false;
      } else {
        controll = row.end;
      }
    }
  });

  // Argument Catch
  if (isArgument(table.defaultRoll)) {
    const arg = ArgumentResolver(table.defaultRoll);
    if (this.status.arguments.indexOf(arg) === -1) {
      this.status.arguments.push(arg);
    }
    if (hasContinuity) {
      this.status.ranges[arg] = table.rollRange();
    }
  }

  // Results and languages
  if (this.currentLanguage === null) {
    this.status.warnings.push('Language not specified yet. Please, set language before register any table.');
  }

  const lTable = this.languages[this.currentLanguage];
  if (lTable === undefined) {
    this.status.warnings.push('No language has been set.');
  } else {
    table.rows.forEach(row => {
      row.results.forEach(res => {
        if (res.item === undefined) {
          return;
        }

        const type = res.item.itemType;
        const name = res.item.name;

        if (lTable[type] === undefined) {
          this.status.warnings.push(`Translation not found to category: ${type}`);
          return;
        }

        if (lTable[type][name] === undefined) {
          this.status.warnings.push(`Translation not found on category ${type}: ${name}`);
        }
      });
    });
  }

  // Break Older references
  delete this.status.missingReferences[table.name];
  // References
  table.rows.forEach(row => {
    row.results.forEach(res => {
      if (res.item !== undefined) {
        return;
      }

      if (res.type === 'reference' || res.type === 'roll_reference') {
        if (this.tables[res.name] === undefined) {
          if (this.status.missingReferences[res.name] === undefined && res.name !== table.name) {
            this.status.missingReferences[res.name] = [];
          }
          this.status.missingReferences[res.name].push(table.name);
        }
      }
    });
  });
}
