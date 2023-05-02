


//create grids 
function createGrid() {
  let gridSize = document.getElementById("grid-size").value;
  const gridContainer = document.getElementById("grid-container");

  if (gridSize > 20) {
      gridSize = 20;
      alert("Max size is 20");
  }
  if (gridSize == 1) {
      gridSize = 2;
      alert("Min size is 2");
  }

  // Clear existing grid
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }

  // Create new grid
  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
  for (let i = 1; i <= gridSize * gridSize; i++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    gridContainer.appendChild(gridItem);
  }
}

//create walls
function createWalls() {
const gridItems = document.querySelectorAll(".grid-item");
gridItems.forEach((item) => {
  item.addEventListener("click", function() {
    this.classList.toggle("wall");
  });
});
}

//to remove all the walls 
function clearWall(){
  const walls = document.getElementsByClassName('grid-item');
  for (let i = 0; i < walls.length; i++) {
      walls[i].classList.remove('wall');
  }
}


