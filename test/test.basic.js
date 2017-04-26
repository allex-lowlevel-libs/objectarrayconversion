var expect = require('chai').expect,
  conversion = require ('..');

describe('Basic tests', function () {
  it ('arryToHash', function () {
    expect(conversion.arryToHash(['a', , 'b', 'c'],[0, 1, 2, 3, 4])).
      to.deep.equal({a:0, b:2, c: 3});
  });
  it ('arryOfarrysToArryOfHashes', function () {
    expect(conversion.arryOfarrysToArryOfHashes([[0, 1, 2],[5, 3, 4],[8, 7, 6]],
          ['a', , 'b'])).
        to.deep.equal([{a:0, b:2}, {a:5, b:4}, {a:8,b:6}]);
  });
  it ('hashToArray', function () {
    expect(conversion.hashToArray(['c', 'e', 'a'], {
      a: 5,
      b: 3,
      c: 8,
      d: 'no',
      e: 1
    })).to.deep.equal([8, 1, 5]);
  });
  it ('hashArryToPlainArry', function () {
    expect(conversion.hashArryToPlainArry(
        [{a: 1, b: 2, c: 3}, {a: 4, b: 5, c: 6}, {a: 7, b: 8, c: 9}],
        ['a', 'c'])).to.deep.equal([1, 3, 4, 6, 7, 9]);
  });
  it ('arryReduce', function () {
    expect(conversion.arryReduce([1, 3, 5], ['a', 'b', 'c', 'd', 'e', 'f'])).
        to.deep.equal(['b', 'd', 'f']);
  });
});
