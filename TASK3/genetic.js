// Genetic algorithm parameters
var populationSize = 100;
var mutationRate = 0.01;
var generations = 1000;

// City object
function City(x, y) {
  this.x = x;
  this.y = y;
}

// Create an array of cities
var cities = [];

// Fitness evaluation function
function evaluateFitness(tour) {
  var totalDistance = 0;
  for (var i = 0; i < tour.length - 1; i++) {
    var cityA = cities[tour[i]];
    var cityB = cities[tour[i + 1]];
    var distance = calculateDistance(cityA, cityB);
    totalDistance += distance;
  }
  return 1 / totalDistance;
}

// Calculate the distance between two cities
function calculateDistance(cityA, cityB) {
  var dx = cityA.x - cityB.x;
  var dy = cityA.y - cityB.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// Genetic algorithm function
function geneticAlgorithm() {
  // Create initial population
  var population = [];
  for (var i = 0; i < populationSize; i++) {
    var tour = createRandomTour();
    population.push(tour);
  }

  var generation = 0;

  function runGeneration() {
    if (generation < generations) {
      // Evaluate fitness for each individual
      var fitnessScores = [];
      for (var i = 0; i < populationSize; i++) {
        var tour = population[i];
        var fitness = evaluateFitness(tour);
        fitnessScores.push({ tour: tour, fitness: fitness });
      }
  
      // Sort population by fitness in descending order
      fitnessScores.sort(function (a, b) {
        return b.fitness - a.fitness;
      });
  
      // Select top individuals for reproduction
      var selectedParents = [];
      for (var i = 0; i < populationSize / 2; i++) {
        selectedParents.push(fitnessScores[i].tour);
      }
  
      // Create offspring through crossover and mutation
      var offspring = [];
      for (var i = 0; i < selectedParents.length; i += 2) {
        var parentA = selectedParents[i];
        var parentB = selectedParents[i + 1];
        var child = crossover(parentA, parentB);
        mutate(child);
        offspring.push(child);
      }
  
      // Replace the old population with the offspring
      population = offspring;
  
      // Display the best tour for the current generation
      var bestTour = fitnessScores[0].tour;
      console.log("Generation:", generation);
      console.log("Best Tour:", bestTour);
      displayTour(bestTour);
  
      generation++;
      runGeneration(); // Proceed to the next generation without delay
    }
  }
  
  

  runGeneration();
}


// Create a random tour
function createRandomTour() {
  var tour = [];
  for (var i = 0; i < cities.length; i++) {
    tour.push(i);
  }
  shuffleArray(tour);
  return tour;
}


// Shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function crossover(parentA, parentB) {
  var start = Math.floor(Math.random() * parentA.length);
  var end = Math.floor(Math.random() * parentA.length);

  // Create a child tour with all cities set to -1
  var child = Array(parentA.length).fill(-1);

  // Copy a section from parentA to the child tour
  for (var i = start; i <= end; i++) {
    child[i] = parentA[i];
  }

  // Fill the remaining cities from parentB, excluding duplicate cities
  var j = 0;
  for (var i = 0; i < parentB.length; i++) {
    var city = parentB[i];
    if (!child.includes(city)) {
      while (child[j] != -1) {
        j++;
      }
      child[j] = city;
    }
  }

  return child;
}



// Mutate a tour by swapping two cities
function mutate(tour) {
  for (var i = 0; i < tour.length; i++) {
    if (Math.random() < mutationRate) {
      var indexA = Math.floor(Math.random() * tour.length);
      var indexB = Math.floor(Math.random() * tour.length);
      swapCities(tour, indexA, indexB);
    }
  }
}

// Swap two cities in a tour
function swapCities(tour, indexA, indexB) {
  var temp = tour[indexA];
  tour[indexA] = tour[indexB];
  tour[indexB] = temp;
}


// Display the best tour on the grid
function displayTour(tour) {
  clearGrid();
  
  // Display the cities and connections up to the current city
  for (var i = 0; i < tour.length - 1; i++) {
    var cityIndex = tour[i];
    var city = cities[cityIndex];
    addCityToGrid(city.x, city.y, 'point'); // Pass 'black' as the color argument

    var nextCityIndex = tour[i + 1];
    var nextCity = cities[nextCityIndex];
    connectCities(city, nextCity);
  }

  // Display the last city and connect it to the starting city
  var lastCityIndex = tour[tour.length - 1];
  var lastCity = cities[lastCityIndex];
  addCityToGrid(lastCity.x, lastCity.y, 'point'); // Pass 'black' as the color argument

  var firstCityIndex = tour[0];
  var firstCity = cities[firstCityIndex];
  connectCities(lastCity, firstCity);
}


// Connect two cities on the grid with a line
function connectCities(cityA, cityB) {
  var line = document.createElement('div');
  line.className = 'line';
  line.style.left = (cityA.x - 3) + 'px';
  line.style.top = (cityA.y - 2) + 'px';
  line.style.width = calculateDistance(cityA, cityB) + 'px';
  line.style.transform = calculateAngle(cityA, cityB);
  grid.appendChild(line);
}

// Calculate the angle between two cities
function calculateAngle(cityA, cityB) {
  var dx = cityB.x - cityA.x;
  var dy = cityB.y - cityA.y;
  var angle = Math.atan2(dy, dx);
  return 'rotate(' + angle + 'rad)';
}


// Add a city to the grid with the specified color
function addCityToGrid(x, y, color) {
  var point = document.createElement('div');
  point.className = 'point';
  point.style.left = (x - 10) + 'px';
  point.style.top = (y - 6) + 'px';
  point.style.backgroundColor = color; // Set the background color to the specified color

  grid.appendChild(point);
}

// Clear the grid
function clearGrid() {
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }
}

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
