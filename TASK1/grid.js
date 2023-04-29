//create grids 
function createGrid() {
    let gridSize = document.getElementById("grid-size").value;
    const gridContainer = document.getElementById("grid-container");

    if (gridSize > 20) {
        gridSize = 20;
        alert("Max size is 20");//that is bec the max size is 20
    }
    if (gridSize == 1) {
        gridSize = 2;
        alert("Min size is 2");//i did it bec we should have 2 squares at lest, one for start and one for
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
      gridItem.addEventListener("click", toggleWall);
      gridItem.classList.add("grid-item");
      gridContainer.appendChild(gridItem);
    }
  }



//creates walls
function toggleWall() {
  this.classList.toggle("wall");
}

//to remove all the walls 
function clearWall(){

    const walls = document.getElementsByClassName('grid-item');
    for (let i = 0; i < walls.length; i++) {
        walls[i].classList.remove('wall');
    }

}


//start point
function startPoint(){

}



