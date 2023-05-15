window.onload = function() {
    var grid = document.getElementById('grid');
    var addPointButton = document.getElementById('addPointButton');
    var clearPointsButton = document.getElementById('clearPointsButton');
    var isAddingPoint = false;
  
    addPointButton.addEventListener('click', function() {
      isAddingPoint = !isAddingPoint;
      addPointButton.textContent = isAddingPoint ? 'stop adding Point' : 'Add Point';
    });
  
    clearPointsButton.addEventListener('click', function() {
      while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
      }
    });
  
    grid.addEventListener('click', function(event) {
      if (isAddingPoint) {
        var point = document.createElement('div');
        point.className = 'point';
        point.style.left = (event.offsetX - 10) + 'px';
        point.style.top = (event.offsetY - 7) + 'px';
  
        grid.appendChild(point);
      }
    });
  };
  
