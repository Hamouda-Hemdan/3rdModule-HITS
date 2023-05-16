// Define the cities in the TSP problem
let cities = [];

// Define the canvas and context variables
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

// Define the genetic algorithm parameters
let populationSize = parseInt(document.getElementById("population-size").value);
let mutationRate = parseFloat(document.getElementById("mutation-rate").value);
let iterationLimit = parseInt(document.getElementById("iteration-limit").value);

// Define the genetic algorithm variables
let population;
let bestSolution;
let bestFitness;
let iteration;

// Define the fitness function for a TSP solution
function fitness(solution) {
  let totalDistance = 0;
  for (let i = 0; i < solution.length; i++) {
    const city1 = solution[i];
    const city2 = solution[(i + 1) % solution.length];
    const dx = city1.x - city2.x;
    const dy = city1.y - city2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    totalDistance += distance;
  }
  return totalDistance;
}

// Define the mutation operator for a TSP solution
function mutate(solution) {
  for (let i = 0; i < solution.length; i++) {
    if (Math.random() < mutationRate) {
      const j = Math.floor(Math.random() * solution.length);
      [solution[i], solution[j]] = [solution[j], solution[i]];
    }
  }
}

// Define the tournament selection operator for the genetic algorithm
function tournamentSelection(population, size) {
  const candidates = [];
  for (let i = 0; i < size; i++) {
    const candidate = population[Math.floor(Math.random() * population.length)];
    candidates.push(candidate);
  }
  return candidates.reduce((best, candidate) => {
    const bestFitness = fitness(best);
    const candidateFitness = fitness(candidate);
    return candidateFitness < bestFitness ? candidate : best;
  });
}

// Define the crossover operator for two TSP solutions
function crossover(parent1, parent2) {
  const child = Array.from({length: parent1.length});
  let startPos = Math.floor(Math.random() * parent1.length);
  let endPos = Math.floor(Math.random() * (parent1.length - startPos)) + startPos;
  for (let i = startPos; i <= endPos; i++) {
    child[i] = parent1[i];
  }
  let j = 0;
  for (let i = 0; i < parent2.length; i++) {
    if (!child.includes(parent2[i])) {
      while (child[j] !== undefined) {
        j++;
      }
      child[j] = parent2[i];
    }
  }
  return child;
}

// Define the function to draw a path on the canvas
function drawPath(path, color) {
  context.strokeStyle = color;
  context.beginPath();
  context.moveTo(path[0].x, path[0].y);
  for (let i = 1; i < path.length; i++) {
    context.lineTo(path[i].x, path[i].y);
  }
  context.closePath();
  context.stroke();
}

// Define the function to initialize the genetic algorithm
function initializeGA() {
  // Initialize the population
  population = Array.from({length: populationSize}, () => {
    const solution = Array.from(cities);
    mutate(solution);
    return solution;
  });

  // Evaluate the initial population
  bestSolution = population[0];
  bestFitness = fitness(bestSolution);
  for (const solution of population) {
    const solutionFitness = fitness(solution);
    if (solutionFitness < bestFitness) {
      bestSolution = solution;
      bestFitness = solutionFitness;
    }
  }

  // Draw the initial best solution
  drawPath(bestSolution, "line");

  // Update the distance label
  const distanceLabel = document.getElementById("distance-label");
  distanceLabel.innerText = `Distance: ${bestFitness.toFixed(2)}`;
}

// Define the function to run the genetic algorithm for one iteration
function runIteration() {
  // Select two parents using tournament selection
  const parent1 = tournamentSelection(population, 5);
  const parent2 = tournamentSelection(population, 5);

  // Create a new child using crossover
  const child = crossover(parent1, parent2);

  // Mutate the child
  mutate(child);

  // Replace the worst solution in the population with the child
  let worstSolution = population[0];
  let worstFitness = fitness(worstSolution);
  for (const solution of population) {
    const solutionFitness = fitness(solution);
    if (solutionFitness > worstFitness) {
      worstSolution = solution;
      worstFitness = solutionFitness;
    }
  }
  const worstIndex = population.indexOf(worstSolution);
  population[worstIndex] = child;

  // Update the best solution if necessary
  const childFitness = fitness(child);
  if (childFitness < bestFitness) {
    bestSolution = child;
    bestFitness = childFitness;
  }

  // Clear the canvas and redraw the cities
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawCities();

  // Draw the current best solution
  drawPath(bestSolution, "line");

  // Update the distance label
  const distanceLabel = document.getElementById("distance-label");
  distanceLabel.innerText = `Distance: ${bestFitness.toFixed(2)}`;

  // Update the iteration counter
  iteration++;

  // If the iteration limit has not been reached, run the next iteration after a delay
  if (iteration < iterationLimit) {
    setTimeout(runIteration, 20);
  }
}

// Define the function to run the genetic algorithm until convergence
function runGA() {
  // Initialize the genetic algorithm
  iteration = 0;
  initializeGA();

  // Start the animation
  setTimeout(runIteration, 1);
}

// Define the function to clear the canvas and redraw the cities
function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawCities();

  // Reset the best solution and distance label
  bestSolution = null;
  bestFitness = null;
  const distanceLabel = document.getElementById("distance-label");
  distanceLabel.innerText = "Distance: N/A";
}

// Define the function to draw the cities on the canvas
function drawCities() {
  const canvasRect = canvas.getBoundingClientRect();
  for (const city of cities) {
    const cityElement = document.createElement("div");
    cityElement.classList.add("point");
    cityElement.style.left = `${canvasRect.left + city.x - 5}px`;
    cityElement.style.top = `${canvasRect.top + city.y - 5}px`;
    document.body.appendChild(cityElement);
  }
}


// Define the function to add a city to the canvas
function addCity(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  cities.push({x, y});
  clearCanvas();
}


// Add an event listener to the canvas to allow the user to add cities
canvas.addEventListener("click", addCity);

// Add an event listener to the start button to run the genetic algorithm
const startButton = document.getElementById("start-button");
startButton.addEventListener("click", runGA);

// Add an event listener to the reset path button to clear the canvas
const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", clearCanvas);

// Add event listeners to the parameter inputs to update the genetic algorithm parameters
const populationSizeInput = document.getElementById("population-size");
populationSizeInput.addEventListener("input", () => populationSize = parseInt(populationSizeInput.value));
const mutationRateInput = document.getElementById("mutation-rate");
mutationRateInput.addEventListener("input", () => mutationRate = parseFloat(mutationRateInput.value));
const iterationLimitInput = document.getElementById("iteration-limit");
iterationLimitInput.addEventListener("input", () => iterationLimit = parseInt(iterationLimitInput.value));