module.exports = (function () {
    function GameOfLife(width, height) {
        this.state = makeMatrix(width, height);
        this.nextState = makeMatrix(width, height);
        this.width = width;
        this.height = height;
    }

    GameOfLife.prototype.start = function() {
        loop();
    };

    GameOfLife.prototype.setState = function(life, state) {
        life.alive = state;
    };

    GameOfLife.prototype.getNeighbours = function(life) {
        var startX = life.x - 1 < 0 ? 0 : life.x - 1;
        var endX = life.x + 1 > this.width - 1 ? this.width - 1 : life.x + 1;

        // caveat! assuming all y cols are the same...!
        var startY = life.y - 1 < 0 ? 0 : life.y - 1;
        var endY = life.y + 1 > this.height - 1 ? this.height - 1 : life.y + 1;

        var array = [];

        for (var i = startX; i <= endX; i++) {
            for (var j = startY; j <= endY; j++) {
                if (!(life.x === i && life.y === j)) {
                    array.push(this.state[i][j]);
                }
            }
        }

        return array;
    };

    // Steps through the game once.
    GameOfLife.prototype.step = function() {
        for (var i = 0; i < this.width; i++) {
            for (var j = 0; j < this.height; j++) {
                this.checkNeighbours(this.state[i][j]);
            }
        }

        var temp = this.state;
        this.state = this.nextState;
        this.nextState = temp;
    };

    GameOfLife.prototype.print = function() {
        for (var i = 0; i < this.width; i++) {
            for (var j = 0; j < this.height; j++) {
                var state = this.state[j][i].alive === true ? 'X' : ' ';

                process.stdout.write('[' + state + ']');
            }
            process.stdout.write('\n');
        }
    };

    GameOfLife.prototype.checkNeighbours = function(life) {
        var neighbours = this.getNeighbours(life);

        var liveNeighbours = 0;

        for (var i = 0; i < neighbours.length; i++) {
            if (neighbours[i].alive) {
                liveNeighbours += 1;
            }
        }

        if (life.alive &&
            liveNeighbours < 2) {
            this.nextState[life.x][life.y].alive = false;
        } else if (life.alive &&
                   liveNeighbours <= 3) {
            this.nextState[life.x][life.y].alive = true;
        } else if (life.alive) {
            this.nextState[life.x][life.y].alive = false;
        } else if (!life.alive &&
                   liveNeighbours === 3) {
            this.nextState[life.x][life.y].alive = true;
        } else if (!life.alive) {
            this.nextState[life.x][life.y].alive = false;
        }
    };

    GameOfLife.prototype.setAll = function(alive) {
        for (var i = 0; i < this.state.length; i++) {
            for (var j = 0; j < this.state[i].length; j++) {
                this.state[i][j].alive = alive;
            }
        }
    };

    function Life(props) {
        if (props.alive === undefined) {
            this.alive = false;
        } else {
            this.alive = props.alive;
        }

        if (props.x === undefined) {
            this.x = undefined;
        } else {
            this.x = props.x;
        }

        if (props.y === undefined) {
            this.y = undefined;
        } else {
            this.y = props.y;
        }
    }

    // create a 2 dimensional array of lifes, of width * height size.
    function makeMatrix(width, height) {
        var array = [];
        var life = {};

        for (var i = 0; i < width; i++) {
            array[i] = [];

            for (var j = 0; j < height; j++) {
                life = new Life({
                    alive: false,
                    x: i,
                    y: j
                });

                array[i].push(life);
            }
        }

        return array;
    }

    return GameOfLife;
}());
