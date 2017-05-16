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
  .roll({
    type: 'HitRoller',
  })
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

More information about table structure bellow.

#### registerAll

Register an array of tables.

More information about table structure bellow.

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
  
#### addLanguages

It is possible to add a internationalization option with `addLanguages`.
 
A language is set in the format of a table, like other tables.

Look on Language tables bellow.

#### roll & rollAll

Roll one or more tables by its names and custom arguments.

Each roll has a type, that is the name of a table that will be rolled.

Other thing that can be specified on roll moment is custom arguments, like this:

```js
const hitRollerTable = {
  name: 'HitRoller',
  roll: '$target',
  rows: [
    { roll: 1, result: { resultType: 'roll', name: 'Critical Miss' } },
    { start: 2, end: 19, result: { resultType: 'roll', name: 'Hit' } },
    { roll: 20, result: { resultType: 'roll', name: 'Critical Hit' } }
  ]
}

...

return table
  .roll({
    type: 'HitRoller',
    args: {target: 20},
  })
  .then(response => {
    console.log(response.toJSON());
  });
```

### RollResult

When a roll or a group of rolls is finished, it return a promise that resolves into a RollResult.

RollResult is created with a list of results grouped in a 'General' category.

As a result has always a resultType, there is a group of operation to create new groups of results.

#### groupTypeBy(resultType{String}, newCategoryNAme{String})

Create a new category called 'newCategoryNAme' and add all resultType inside.

#### toJSON

Print all items as JSON.

#### listNames

List all names by category.

#### listFull

List all data about each item by category.

### Table structure

```js
const sampleTable = {
  name: 'SampleTable',
  roll: '1d100x80',
  rows: [{
    roll: 1,
    result: [],
  }, {
    start: 2,
    end: 99,
    result: [{
      type: 'roll_reference',
      rule: '2d6',
      name: 'Gem-10',
    }]
  }, {
    roll: 100,
    result: [{
      type: 'reference',
      name: 'SampleB',
    }]
  }],
  defaultResults: [{
    type: 'roll',
    rule: '6d6x100',
    item: { resultType: 'item', name: 'Some Awesome Item' },
  }],
}
```

#### name 

Every table must have a name.

#### roll

Roll define how a table is rolled, it can be done in 2 ways:

##### Custom argument

You can specify a roll with `$variable_name`. Later, you can set `variable_name` on rolls and this table will be rolled with this value.

##### Dice Roll

You can specify a roll like a Dice Roll, from RPG games.
 
With 2d10x2, two dices of 10 faces will be rolled, on the end, multiplied by 2.

First number represent the number of times that a dice will be rolled. Second number it the number of faces in a dice (or the random number limit, 10 menas a number between 1-10) and the last number is a multiplier applied on final result.
 
#### defaultResults

Default roll represent a row that has 100% of probability to be hit when rolling a table. Multiple results can be specified. Look for Results bellow.

#### rows
 
An array of rows. Each row has a hit range and an array of results.

```json
row: [{
  roll: 1, // Single value range.
  results: { // Single result.
    resultType: 'sampleType',
    name: 'Sample Name',
  }
}, {
  start: 2,
  end: 10,
  results: [{
    ...
  }]
}]
```

#### Results

Results are specified on table rows or on `defaultResults`. A result may be:
 
* End Result: Results configures to be the final result on a tables system.
* roll: roll of an End Result.
* reference: Reference to another table.
* roll_reference: Roll of a reference to another table.

##### End Result

Money example.

```js
{
  resultType: 'money', 
  name: 'PO'
}
```

##### roll

Roll of money example. Will roll 3d6x10 of final `item`.

```js
{
  type: 'roll',
  rule: '3d6x10',
  item: { resultType: 'money', name: 'PE' },
}
```

##### reference

Roll another table.

```js
{
  type: 'reference',
  name: 'MagicItemTable',
}
```

##### roll_reference

Roll n times another table.

```js
{
  type: 'roll_reference',
  rule: '2d6',
  name: 'MagicItemTable'
}
```

### Language Table structure

A language table structures is defined by a JSON, with results categories and names.

```js
{
  type: {
    PC: { name: 'PC', description: 'Peças de Cobre' },
    PP: { name: 'PP', description: 'Peças de Prata' },
    PE: { name: 'PE', description: 'Peças de Electro' },
    PO: { name: 'PO', description: 'Peças de Ouro' },
    PL: { name: 'PL', description: 'Peças de Platina' },
  },
  gem: {
    'Azurita': { name: 'Azurita', description: 'azul escuro mosqueado opaco' },
  }
}
```

Internal system will look on tables like this for first key element, who must have the same name of resultType on items. Later it will look inside for item name.

In the end, the final block with name and description is attached to roll result.

## License
Copyright (c) 2017 Diego Laucsen and other contributors;
Licensed under __[MIT][Lic]__.

[Lic]: ./LICENSE
