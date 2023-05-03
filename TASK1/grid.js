//this file it contains:
//1-the grid function
//2-clear wall function
//3-start and end point function


let isStartMode = false;
let isEndMode = false;
let startCell = null;
let endCell = null;

function createGrid() {
  let gridSize = document.getElementById("grid-size").value;
  const gridContainer = document.getElementById("grid-container");

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

function createWalls() {
  const gridItems = document.querySelectorAll(".grid-item");
  gridItems.forEach((item) => {
    item.addEventListener("click", function() {
      if (isStartMode) {
        // Clear the previous start cell
        if (startCell) {
          startCell.classList.remove("start");
        }
        // Set the new start cell
        startCell = this;
        this.classList.add("start");
        isStartMode = false;
        document.getElementById("end-btn").disabled = false;
        document.getElementById("start-btn").disabled = true;
      } else if (isEndMode) {
        // Clear the previous end cell
        if (endCell) {
          endCell.classList.remove("end");
        }
        // Set the new end cell
        endCell = this;
        this.classList.add("end");
        isEndMode = false;
        document.getElementById("start-btn").disabled = false;
        document.getElementById("end-btn").disabled = true;
      } else {
        this.classList.toggle("wall");
      }
    });
  });
}

function startSelect() {
  isStartMode = true;
  document.getElementById("end-btn").disabled = true;
}

function endSelect() {
  isEndMode = true;
  document.getElementById("start-btn").disabled = true;
}

//to remove all the walls 
function clearWall(){
  const walls = document.getElementsByClassName('grid-item');
  for (let i = 0; i < walls.length; i++) {
      walls[i].classList.remove('wall');
      walls[i].classList.remove('start');
      walls[i].classList.remove('end');
  }
  startCell = null;
  endCell = null;
  isStartMode = false;
  isEndMode = false;
  document.getElementById("start-btn").disabled = false;
  document.getElementById("end-btn").disabled = false;
}

