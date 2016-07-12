const qml = require('./plugins/qml');
const qmljs = require('./plugins/qmljs');

module.exports = function(acorn) {
  acorn.plugins.qml = qml;
  acorn.plugins.qmljs = qmljs;
  return acorn;
}
