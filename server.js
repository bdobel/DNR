/*
Author: Tu Hoang
ESRGC 2016

DNR website
*/

var app = require('./app');
var port = 3100;

app.listen(port);
console.log('Server listening on port ' + port);
console.log('Server environment: ' + app.get('env'));