// Initialize number of snakes based on population
function initializeSnake(snakeMap, population_size, network_layer){
    let snake = [];
    for(let i = 0; i < population_size; i++){
        // Create a snake
        let newSnake = new Snake(
            snakeMap,
            startDirection = "up", 
            initialLength = 3, 
            speed = 400, 
            controlType = "AI",
            layer = network_layer
        );
        
        snake.push(newSnake);
    }
    return snake;
}

// Initialize number of fruits based on population
function initializeFruit(snakeMap, snake, population_size){
    let fruit = [];
    for(let i = 0; i < population_size; i++){
        let newFruit = new Fruit(snakeMap, snake[i]);
        fruit.push(newFruit);
    }
    return fruit;
}

function nextGeneration(snakes, survived_population, top_percentage, mutationRate, population) {
    // Step 1: Select the top snakes based on their score
    let selectedSnakes = select_top(snakes, top_percentage);

    // Step 2: Create a new population of snakes through crossover and mutation
    let newGeneration = [];

    // Step 3: Add the top snakes to the new generation without mutation or crossover
    for (let i = 0; i < Math.ceil(snakes.length * survived_population) && newGeneration.length < population; i++) {
        let topSnake = selectedSnakes[i];

        // Directly clone the top snake’s network (avoid reference issues)
        let newSnake = new Snake(snakeMap, "up", 3, 400, "AI", [topSnake.input, topSnake.hidden, topSnake.output]);
        newSnake.network = new MLP(topSnake.network.input, topSnake.network.hidden, topSnake.network.output);
        newGeneration.push(newSnake);
    }

    // Step 4: Fill up the rest of the population with children from crossover and mutation
    while (newGeneration.length < population) {
        // Select two random parents from the selected snakes (with replacement)
        let parent1 = selectedSnakes[Math.floor(Math.random() * selectedSnakes.length)];
        let parent2 = selectedSnakes[Math.floor(Math.random() * selectedSnakes.length)];

        // Step 5: Perform crossover to create a child network
        let childNetwork = crossover(parent1, parent2);

        // Step 6: Mutate the child network
        mutate(childNetwork, mutationRate, 10);

        // Create a new snake with the mutated child network and add it to the new generation
        let newSnake = new Snake(snakeMap, "up", 3, 400, "AI", [parent1.input, parent1.hidden, parent1.output]);
        newSnake.network = childNetwork;  // Assign the child network to the new snake
        newGeneration.push(newSnake);

        // Ensure the new generation size doesn't exceed the population size
        if (newGeneration.length >= population) {
            break;
        }
    }

    // Return the new generation of snakes
    return newGeneration;
}

function select_top(snakes, top_percentage) {
    // Sort snakes by score in descending order
    snakes.sort((a, b) => b.score - a.score);

    // Calculate the number of snakes to keep (top percentage)
    const topPercentCount = Math.ceil(snakes.length * top_percentage);

    // Select only the top snakes based on the percentage
    const selectedSnakes = snakes.slice(0, topPercentCount);

    return selectedSnakes;
}

function crossover(parent1, parent2) {
    // Assuming MLP is a neural network class and we need to create a new network for the child
    let childNetwork = new MLP(parent1.network.input, parent1.network.hidden, parent1.network.output);

    // Loop through each layer of the networks and perform crossover on weights and biases
    for (let i = 0; i < parent1.network.layers.length; i++) {
        let parent1Layer = parent1.network.layers[i];
        let parent2Layer = parent2.network.layers[i];
        let childLayer = childNetwork.layers[i];

        // Crossover for weights
        for (let j = 0; j < parent1Layer.weights.length; j++) {
            for (let k = 0; k < parent1Layer.weights[j].length; k++) {
                // Randomly choose between parent1's or parent2's weight at position [j][k]
                childLayer.weights[j][k] = Math.random() < 0.5 ? parent1Layer.weights[j][k] : parent2Layer.weights[j][k];
            }
        }

        // Crossover for biases
        for (let j = 0; j < parent1Layer.biases.length; j++) {
            // Randomly choose between parent1's or parent2's bias at position [j]
            childLayer.biases[j] = Math.random() < 0.5 ? parent1Layer.biases[j] : parent2Layer.biases[j];
        }
    }

    return childNetwork;
}

function mutate(childNetwork, mutationRate, learningRate) {
    // Loop through each layer of the network
    for (let i = 0; i < childNetwork.layers.length; i++) {
        let layer = childNetwork.layers[i];

        // Mutate weights with the given mutation rate and learning rate
        for (let j = 0; j < layer.weights.length; j++) {
            for (let k = 0; k < layer.weights[j].length; k++) {
                if (Math.random() < mutationRate) {
                    // Mutate the weight by adding a small random value scaled by the learning rate
                    let mutation = Math.random() * 0.1 - 0.05;  // Random value between -0.05 and 0.05
                    layer.weights[j][k] += mutation * learningRate;  // Scale by the learning rate
                }
            }
        }

        // Mutate biases with the given mutation rate and learning rate
        for (let j = 0; j < layer.biases.length; j++) {
            if (Math.random() < mutationRate) {
                // Mutate the bias by adding a small random value scaled by the learning rate
                let mutation = Math.random() * 0.1 - 0.05;  // Random value between -0.05 and 0.05
                layer.biases[j] += mutation * learningRate;  // Scale by the learning rate
            }
        }
    }
}

