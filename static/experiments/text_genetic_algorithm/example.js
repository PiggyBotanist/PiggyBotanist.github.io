// Define the target string
const target = "This is the correct sentence";

// Population settings
const populationSize = 10;
const mutationRate = 0.01;  // Chance of mutation in each generation
const maxGenerations = 10000;

// Define the possible characters
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz .";

// Helper function to generate a random string of the same length as the target
function generateRandomString(length) {
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomChar = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    result += randomChar;
  }
  return result;
}

// Function to calculate the fitness of a string
function calculateFitness(str) {
  let score = 0;
  for (let i = 0; i < target.length; i++) {
    if (str[i] === target[i]) {
      score++;
    }
  }
  return score / target.length; // Fitness is a value between 0 and 1
}

// Function to perform crossover between two parent strings
function crossover(parent1, parent2) {
  const crossoverPoint = Math.floor(Math.random() * parent1.length);
  const child = parent1.substring(0, crossoverPoint) + parent2.substring(crossoverPoint);
  return child;
}

// Function to mutate a string with a small chance
function mutate(str) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    if (Math.random() < mutationRate) {
      const randomChar = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
      result += randomChar;
    } else {
      result += str[i];
    }
  }
  return result;
}

// Create an initial population of random strings
let population = [];
for (let i = 0; i < populationSize; i++) {
  population.push(generateRandomString(target.length));
}

// Main loop for the genetic algorithm
let generation = 0;
let found = false;

while (!found && generation < maxGenerations) {
  generation++;

  // Calculate fitness for each individual in the population
  const fitnessScores = population.map(calculateFitness);

  // Check if we found the target string
  const bestFitness = Math.max(...fitnessScores);
  if (bestFitness === 1) {
    found = true;
    const bestIndex = fitnessScores.indexOf(bestFitness);
    console.log(`Target found in generation ${generation}:`);
    console.log(population[bestIndex]);
    break;
  }

  // Create a new generation based on the current population
  const newPopulation = [];
  
  // Select parents and perform crossover
  while (newPopulation.length < populationSize) {
    // Select two parents (using a simple roulette wheel selection method)
    const parent1 = population[selectParent(fitnessScores)];
    const parent2 = population[selectParent(fitnessScores)];
    
    // Perform crossover and mutation to create a child
    let child = crossover(parent1, parent2);
    child = mutate(child);
    
    newPopulation.push(child);
  }
  
  // Replace the old population with the new one
  population = newPopulation;

  // Log the best string of the current generation
  const bestIndex = fitnessScores.indexOf(bestFitness);
  console.log(`Generation ${generation}: ${population[bestIndex]}`);
}

function selectParent(fitnessScores) {
  // Roulette wheel selection: select an index based on fitness
  const totalFitness = fitnessScores.reduce((sum, score) => sum + score, 0);
  const randomValue = Math.random() * totalFitness;
  let runningTotal = 0;
  
  for (let i = 0; i < fitnessScores.length; i++) {
    runningTotal += fitnessScores[i];
    if (runningTotal >= randomValue) {
      return i;
    }
  }
  return fitnessScores.length - 1; // Return the last index if something goes wrong
}

