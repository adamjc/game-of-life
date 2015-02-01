var assert = require('assert');

process.env.NODE_ENV = 'debug';

var gameOfLife = require('../src/game-of-life.js');

describe('Game of Life', function () {
    var game;

    before(function () {
        game = new gameOfLife(2, 2);
    });

    it('should expose a matrix to display when instantiated', function () {
        assert.equal(Array.isArray(game.state[0]), true);
    });

    it('should contain an array of "life" objects', function () {
        assert.equal(game.state[0][0].hasOwnProperty('alive'), true);
    });

    it('should have some way to make it start running', function () {
        assert.equal(typeof game.start === 'function', true);
    });

    it('should have some way to set the state of a life', function () {
        game.setState(game.state[0][0], true);

        assert.equal(game.state[0][0].alive, true);
    });

    it('should kill a cell if it has less than two neighbours', function () {
        game = new gameOfLife(3, 3);

        game.setState(game.state[1][1], true);

        game.step();

        assert.equal(game.state[1][1].alive, false);
    });

    it('should not kill a cell if it has two or three alive neighbours', function () {
        game = new gameOfLife(3, 3);

        game.setState(game.state[0][0], true);
        game.setState(game.state[1][0], true);
        game.setState(game.state[0][1], true);

        game.step();

        assert.equal(game.state[0][0].alive, true);
    });

    it('should kill a cell if it has more than three alive neighbours', function () {
        game = new gameOfLife(3, 3);

        game.setAll(true);

        game.step();

        assert.equal(game.state[1][1].alive, false);
    });

    it('should make a cell alive if it has exactly three neighbours and is dead', function () {
        game = new gameOfLife(3, 3);

        game.setState(game.state[0][0], true);
        game.setState(game.state[1][0], true);
        game.setState(game.state[0][1], true);

        game.step();

        assert.equal(game.state[1][1].alive, true);
    });
});
