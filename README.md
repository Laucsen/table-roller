# Table Roller

A framework to create RPG like tables, where each row has a random probability to be selected in a pré-configured range.

## Installation

```sh
$ npm install table-roller
```

## Example

**Note**: Look on test folder ```test/examples.test``` for a small random treasure generator. 

Imagine classic Dungeons and Dragons:

```sh
1     -> Critical miss
2-19  -> Hit
20    -> Critical Hit
```

This table above can be write on table roller format as:

```js
import TableRoller from 'table-roller';

const hitRollerTable = {
  name: 'HitRoller',
  roll: '1d20',
  rows: [
    { roll: 1, result: { resultType: 'roll', name: 'Critical Miss' } },
    { start: 2, end: 19, result: { resultType: 'roll', name: 'Hit' } },
    { roll: 20, result: { resultType: 'roll', name: 'Critical Hit' } }
  ]
}

const table = new TableRoller();
table.register(hitRollerTable);

return table
  .roll()
  .then(response => {
    console.log(response.toJSON());
  });
```

With this sample configuration, each time roll() is called, a new result will be randomly returned from table above, with respective probabilities.

### Features

1. Each table row may have one or more results.
2. Result may be everything you want, categorized by its resultType.
3. Result may take the state to another table, to bge rolled by N more.
4. To each added table, the system status is updates with current situation.
5. Inconsistent status cant be roller.
6. Internationalization support.
7. Custom input parameters.
8. Default Rolls: Table may have default rolls, that are rolled with 100% of probability.

## API

### Tables

Tables are configured on JSON format. You can register one or multiple tables at a time.

Some tables can be requested on demand (see bellow). Because of this, `register` and  `registerAll` return a promise, that when it resolves, an object with current status.

#### register

Register a single table.

#### registerAll

Register an array of tables.

#### status

Status is an object returned in each `register` or `registerAll`. It contains following structure.

```js
{
  arguments: [],
  ranges: {},
  warnings: [],
  errors: [],
  missingReferences: {},
}
```

* **arguments**: List of configured arguments.
* **ranges**: Range of each argument. If it is possible to compute, it will be listed here.
* **warnings**: Show problems in your table that do not block rolling process.
* **errors**: Errors that block your rolling process.
* **missingReferences**: When configuring tables that result in another table roll, missing references will be shwon here.
  
#### Table structure

// TODO