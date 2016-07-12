const acorn = require('acorn');
const fs = require('fs');
require('./index.js')(acorn);

var comments = [], tokens = [];
let source;
//source = 'Item { x: 10 }'
source = `
Item {
  width: 100
  height: 100

  Rectangle {
    color: 'red'
    property int foo: 30
    readonly property int bar: foo
  }
}
`;
var ast = acorn.parse(source, {
  plugins: {
    qml: true
  },
  // collect ranges for each node
  //ranges: true,
  // collect comments in Esprima's format
  onComment: comments,
  // collect token ranges
  onToken: tokens
});

console.log(JSON.stringify(ast, undefined, 2));
