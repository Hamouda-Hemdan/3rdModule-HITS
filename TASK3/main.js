window.onload = function() {
  var grid = document.getElementById('grid');
  var addPointButton = document.getElementById('addCity');
  var clearPointsButton = document.getElementById('clearCities');
  var startButton = document.getElementById('Start'); // Updated ID

  var isAddingPoint = false;

  addPointButton.addEventListener('click', function() {
    isAddingPoint = !isAddingPoint;
    addPointButton.textContent = isAddingPoint ? 'Stop Adding City' : 'Add City Point';
  });

  clearPointsButton.addEventListener('click', function() {
    clearGrid();
    cities = [];
  });

  grid.addEventListener('click', function(event) {
    if (isAddingPoint) {
      var point = document.createElement('div');
      point.className = 'point';
      point.style.left = (event.offsetX - 10) + 'px';
      point.style.top = (event.offsetY - 6) + 'px';

      grid.appendChild(point);
    }
  });

  // Initialize cities from the grid
  function initializeCities() {
    var points = document.getElementsByClassName('point');
    for (var i = 0; i < points.length; i++) {
      var point = points[i];
      var x = parseInt(point.style.left) + 10;
      var y = parseInt(point.style.top) + 6;
      var city = new City(x, y);
      cities.push(city);
    }
  }

  startButton.addEventListener('click', function() {
    initializeCities();
    geneticAlgorithm();
  });
};

