var c = document.getElementById("game-canvas");
var ctx = c.getContext("2d")
var timer = false;
var toggleButton = document.getElementById("btn-toggle");
var nextButton = document.getElementById("btn-next");

var gameOptions = {
  running: false,
  config: {
    size: 50,
    width: c.offsetWidth,
    height: c.offsetHeight
  }
};

init(gameOptions);

toggleButton.onclick = function() {
  if(!gameOptions.running) {
    toggleButton.className = 'stop';
    toggleButton.textContent = 'Stop';
    gameOptions.running = true;

    timer = setInterval(function() {
      drawNextStep(gameOptions);
    }, 700);
  } else {
    toggleButton.className = 'start';
    toggleButton.textContent = 'Start';
    gameOptions.running = false;

    clearInterval(timer);
    timer = false;
  }

  return false;
};

nextButton.onclick = function() {
  drawNextStep(gameOptions);

  return false;
}

c.onclick = function(event) {
  if(!gameOptions.running) {
    var size = gameOptions.config.width / gameOptions.config.size;
    var clickedSquare = { x: Math.floor( event.offsetX / size), y: Math.floor( event.offsetY / size)};

    toggleSquare(clickedSquare.x, clickedSquare.y, gameOptions);
  }
}
