const acorn = require('acorn');

acorn.plugins.qml = require('./plugins/qml');
acorn.plugins.qmljs = require('./plugins/qmljs');
