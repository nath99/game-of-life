function init(options) {
  if(typeof options.config == 'undefined')
    options.config = {};

  if(typeof options.config.size == 'undefined')
    options.config.size = 5; // A default size of the game board.

  if(typeof options.config.width == 'undefined')
    options.config.width = c.offsetWidth; // A default size of the game board.

  if(typeof options.config.height == 'undefined')
    options.config.height = c.offsetHeight; // A default size of the game board.

  options.game = {};
  options.game.board = createBoard(options.config.size);

  drawBoard(options);
}

function createBoard(size) {
  /*
   * The gameBoard is an array of array's holding each "square" of the game.
   * (e.g. based on 5x5 grid)
      [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
      ]
   * When referring to positions on the gameBoard, it will be like using x,y coordinates. gameBoard[y][x].
   */
  var gameBoard = [];
  var tempArr = [];
  for(var i = 0; i < size; i++) {
    tempArr = [];
    for(var j = 0; j < size; j++) {
      tempArr.push(0);
    }
    gameBoard.push(tempArr);
  }

  return gameBoard;
}

function drawGrid(options) {
  var board = options.game.board;
  var size = options.config.size;
  var width = options.config.width;
  var step = width / size;

  ctx.strokeStyle = '#eee';
  ctx.fillStyle = '#555';

  for(var i = 1; i < size; i++) {
    var xy = step * i;

    ctx.moveTo(xy,0);
    ctx.lineTo(xy,width);
    ctx.stroke();

    ctx.moveTo(0,xy);
    ctx.lineTo(width,xy);
    ctx.stroke();
  }
}

function drawBoard(options) {
  ctx.clearRect(0,0, options.config.width, options.config.height)

  var board = options.game.board;
  var step = options.config.width / options.config.size;
    //Iterate each Row of the board
  for(i in board) {
      //Iterate the Columns for each Row
    for(j in board[i]) {
        //Board square should show filled rectangle.
      if( board[i][j] ) {
        var rect = { x: step * j, y: step * i };

        ctx.fillRect(rect.x, rect.y, step, step);
      }
    }
  }

  drawGrid(options);
}

function toggleSquare(x, y, options) {
  var board = options.game.board;

  board[y][x] = board[y][x] ? 0 : 1;

  drawBoard(options);
}

function checkNeighbours(row, col, options) {
  var count = 0;
  var board = options.game.board;

  /*
    x,y
    want to check
      x-1,y-1  | x, y-1 | x+1, y-1
      x-1, y   | don't  | x+1, y
      x-1, y+1 | x, y+1 | x+1, y+1
    }
   */

   for(var i = -1; i <= 1; i++) {
     for(var j = -1; j <= 1; j++) {
       if(!(i==0 && j==0)) {
         var y = +row + i;
         var x = +col + j;

         if(y < 0) {
           y = options.config.size-1;
         }

         if(y > options.config.size-1) {
           y = 0;
         }

         if(x < 0) {
           x = options.config.size-1;
         }

         if(x > options.config.size-1) {
           x = 0;
         }

         if( board[y][x] ) {
           count++;
         }
       }
     }
   }

  return count;
}

function nextStep(options) {
  var currentBoard = options.game.board;
  var nextBoard = createBoard(options.config.size);

  for(var i in currentBoard) {
    for(var j in currentBoard[i]) {
      var count = checkNeighbours(i, j, options);

      if( currentBoard[i][j] ) {
        switch(true) {
          case (count < 2) : {
            nextBoard[i][j] = 0;
          } break;

          case (count == 2 || count == 3) : {
            nextBoard[i][j] = 1;
          } break;

          case (count > 3) : {
              nextBoard[i][j] = 0;
          } break;
        }
      } else if(count == 3) {
        nextBoard[i][j] = 1;
      }
    }
  }

  return nextBoard;
}

function drawNextStep(options) {
  options.game.board = nextStep(options);
  drawBoard(options);
}
