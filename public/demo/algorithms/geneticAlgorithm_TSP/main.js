// Find and define canvas and define its context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Define the size of canvas in pixels
canvas.height = 1000;
canvas.width = 1000;

// Define the size of canvas in pixels
const run_button = document.getElementById("run-geneticAlgorithm");
const pause_button = document.getElementById("pause");
const reset_button = document.getElementById("reset");
// Inputs to listen to
const input_arrangement = document.getElementById('node-arrangement');
const input_nodes = document.getElementById('node-count');
const input_populationSize = document.getElementById('population-size');
const input_generations = document.getElementById('generations');
const input_mutationRate = document.getElementById('mutation-rate');

// Variables
let arrangement = input_arrangement.value
let nodes_count = parseInt(input_nodes.value, 10);
let population_size = parseInt(input_populationSize.value, 10);
let max_iteration = parseInt(input_generations.value, 10);
let mutation_rate = parseFloat(input_mutationRate.value);
let generation = 0;
let lockInput = false;

// Initialize nodes
let map = new CanvasMap(canvas.width, canvas.height, 10);
let nodes = map.generateNodes(ctx, nodes_count, arrangement);
let GA;

function animate(time) {

    if (lockInput){
        // Perform Genetic Algorithm
        if(generation == 0){
            GA = new GeneticAlgorithm(population_size, 0.1, mutation_rate, max_iteration);
            GA.init_population(nodes);
        }
        GA.run_one_iteration();

        ctx.clearRect(0, 0, this.mapWidth, this.mapHeight);
        generation += 1;

        map.draw_nodes(ctx, nodes);
        GA.draw_bestPath(ctx);

        // Display generation and distance on canvas
        ctx.fillStyle = 'black'; // Set the text color
        ctx.font = '20px Arial'; // Set the font size and family
        ctx.fillText(`Generation: ${generation}`, 10, 30); // Draw generation at (10, 30)
        //ctx.fillText(`Distance: ${best_path.distance.toFixed(2)}`, 10, 60); // Draw distance at (10, 60)

        if(generation >= max_iteration){
            generation = 0;
            lockInput = false;
        }
    }

    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);  // Start animation loop
