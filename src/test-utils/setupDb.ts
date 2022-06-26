import testConn from './testConn';

testConn(true)
  .initialize()
  .then(() => process.exit());
