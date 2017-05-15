const chai = require('chai');

const DirtyChai = require('dirty-chai');
const sinon = require('sinon');
const SinonChai = require('sinon-chai');
const ChaiAsPromised = require('chai-as-promised');
const ChaiThings = require('chai-things');

// Load Chai assertions
global.expect = chai.expect;
global.assert = chai.assert;
chai.should();

// Load Sinon
global.sinon = sinon;

// Initialize Chai plugins
chai.use(SinonChai);
chai.use(DirtyChai);
chai.use(ChaiAsPromised);
chai.use(ChaiThings);

global.describe_not = () => {};
