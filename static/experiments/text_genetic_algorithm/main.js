// Get references to HTML elements
const textbox = document.getElementById("textBox");
const textbox_generations = document.getElementById("generations");
const targetTextInput = document.getElementById("targetText");
const startButton = document.getElementById("startButton");

// Set up the initial default values for parameters
let gene_pool = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!?@#$%^&*()_+.,;: ";
let generation = 0;
let population_size = 100;
let mating_pool = 0.1;
let mutation_rate = 0.05;
let text = "";  // The target text input by the user

// Function to generate a random population (random strings of the same length as the target text)
function generate_population(population_size, gene_pool, chromosome_length) {
    let newGeneration = [];
    for (let i = 0; i < population_size; i++) {
        let newIndividual = "";
        for (let j = 0; j < chromosome_length; j++) {
            let random_number = Math.floor(Math.random() * gene_pool.length);
            newIndividual += gene_pool.charAt(random_number);
        }
        newGeneration.push(newIndividual);
    }
    return newGeneration;
}

// Function to evaluate the fitness of each individual in the population
function get_top_population(generation, text, mating_pool) {
    let generation_fitness = [];
    for (let i = 0; i < generation.length; i++) {
        let score = 0;
        // Compare each character of the individual with the target text
        for (let j = 0; j < text.length; j++) {
            if (generation[i].charAt(j) == text.charAt(j)) {
                score += 1;  // Increment score for each correct character
            }
        }
        generation_fitness.push({"score": score, "chromosome": generation[i]});
    }
    // Sort individuals by their fitness score (higher score is better)
    generation_fitness.sort((a, b) => b.score - a.score);

    // Keep only the top individuals based on the mating_pool percentage
    generation_fitness = generation_fitness.slice(0, Math.floor(mating_pool * generation.length));
    return generation_fitness;
}

// Function to mate the top individuals and create new individuals for the next generation
function mating(survived_population, population_size, mutation_rate, gene_pool) {
    let newIndividuals = population_size - survived_population.length;
    let newGeneration = survived_population.map(item => item.chromosome);  // Start with the top individuals
    
    // Generate new individuals by mating pairs of top individuals
    for (let i = 0; i < newIndividuals; i++) {
        let parent1 = survived_population[Math.floor(Math.random() * survived_population.length)].chromosome;
        let parent2 = survived_population[Math.floor(Math.random() * survived_population.length)].chromosome;
        let child = "";
        
        // Perform crossover and mutation
        for (let j = 0; j < parent1.length; j++) {
            let random_int = Math.random() * (1 + mutation_rate);
            if (random_int <= 0.5) {
                child += parent1.charAt(j);  // Take from parent1
            } else if (random_int > 0.5 && random_int <= 1) {
                child += parent2.charAt(j);  // Take from parent2
            } else {
                child += gene_pool.charAt(Math.floor(Math.random() * gene_pool.length));  // Mutation
            }
        }
        newGeneration.push(child);
    }
    return newGeneration;
}

// Function to update the UI with the best match and generation info
function updateUI(generation, best_string, score) {
    // Update the textbox with the current generation and best match
    textbox.innerHTML = `Generation: ${generation}<br>Best Match: ${best_string}<br>Score: ${score}`;

    // Update the canvas with the best match for visual feedback
    const canvas = textbox_generations;
    const ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 50;
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas before redrawing
    ctx.font = "20px Arial";
    ctx.fillText(`Best Match: ${best_string}`, 10, 30);
}

// Function to start the genetic algorithm evolution
function startEvolution() {
    text = targetTextInput.value;  // Get the target text from the input field

    if (!text) {
        alert("Please enter a target sentence.");
        return;
    }

    generation = 0;  // Reset generation count
    let newGeneration = generate_population(population_size, gene_pool, text.length);
    let best_string = "";

    // Function to run the evolution with delay for real-time updates
    function runGeneration() {
        generation += 1;
        let top_population = get_top_population(newGeneration, text, mating_pool);
        best_string = top_population[0].chromosome;
        let score = top_population[0].score;

        // Update the UI with the current generation and best match
        updateUI(generation, best_string, score);

        // Stop the loop if the target text has been matched
        if (best_string === text) {
            return;
        }

        // Evolve the next generation
        newGeneration = mating(top_population, population_size, mutation_rate, gene_pool);

        // Introduce a delay for real-time updates (using setTimeout to simulate delay)
        setTimeout(runGeneration, 100);  // Adjust the delay (100ms) as needed for real-time feedback
    }

    // Start the evolution process
    runGeneration();
}

// Set up the event listener for the "Start Evolution" button
startButton.addEventListener("click", startEvolution);

// Optionally, you can trigger the startEvolution function by pressing "Enter" in the input field
targetTextInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        startEvolution();
    }
});
