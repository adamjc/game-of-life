var repl = require('repl');
var gameOfLife = require('./src/game-of-life.js');

var replServer = repl.start('> ');

replServer.context.g = gameOfLife;
