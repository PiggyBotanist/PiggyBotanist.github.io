
// Generate Cities
function intialize_cities(canvas, number_of_cities, minDistance){
    let cities = [];

    for (let i = 0; i < number_of_cities; i++) {
        let x, y;
        let valid = false;

        // Try to find a valid position for the new city
        while (!valid) {
            x = Math.floor(Math.random() * (canvas.width - 50) + 25);
            y = Math.floor(Math.random() * (canvas.height - 50) + 25);
            valid = true;

            // Check the distance to all other cities
            for (let j = 0; j < cities.length; j++) {
                let city = cities[j];
                let distance = Math.sqrt(Math.pow(x - city.x, 2) + Math.pow(y - city.y, 2));

                // If the distance is less than the minimum, break and try again
                if (distance < minDistance) {
                    valid = false;
                    break;
                }
            }
        }

        // Once a valid position is found, add the city
        cities.push({ "city": i, "x": x, "y": y });
    }
    return cities;
}

// Fisher-Yates Shuffle (Durstenfeld version)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // Generate a random index between 0 and i (inclusive)
        const j = Math.floor(Math.random() * (i + 1));
        
        // Swap elements at indices i and j
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Generate a Population
function initialize_population(population_size, cities){
    let population = [];

    for(let i = 0; i < population_size; i++){
        let newShuffle = shuffle(cities);
        let path = [newShuffle[0]];
        let distance = 0;
        for(let j = 0; j < cities.length - 1; j++){
            distance += Math.sqrt((newShuffle[j].x - newShuffle[j+1].x)**2 + (newShuffle[j].y - newShuffle[j+1].y)**2)
            path.push(newShuffle[j+1]);
        }
        population.push({"path": path, "distance": distance});
    }
    return population;
}

function natural_selection(sorted_population, survive_ratio, mutation_rate) {
    // Calculate how many individuals should survive
    let num_survived = Math.floor(survive_ratio * sorted_population.length);
    
    // Step 1: Select the survivors from the sorted population
    let survived_population = sorted_population.slice(0, num_survived);
    
    // Step 2: Create the next generation (offspring)
    let new_population = [];

    // Generate new individuals (offspring) through crossover
    for (let i = 0; i < sorted_population.length - num_survived; i++) {
        // Select two random parents from the survivors
        let parent_1 = survived_population[Math.floor(Math.random() * survived_population.length)];
        let parent_2 = survived_population[Math.floor(Math.random() * survived_population.length)];
        
        // Perform crossover to create a child
        let child = crossover(parent_1, parent_2);

        // Apply mutation to the child with a given mutation rate
        if (Math.random() < mutation_rate) {
            child = mutate(child);
        }

        // Add the child to the new population
        new_population.push(child);
    }

    // Step 3: Combine the survivors and the new population to form the next generation
    let next_generation = survived_population.concat(new_population);

    return next_generation;
}

// Example crossover function (Order Crossover - OX)
function crossover(parent_1, parent_2) {
    // Get the paths from both parents
    let parent_1_path = parent_1.path;
    let parent_2_path = parent_2.path;
    
    // Step 1: Select two random crossover points
    let crossover_point_1 = Math.floor(Math.random() * parent_1_path.length);
    let crossover_point_2 = Math.floor(Math.random() * (parent_1_path.length - crossover_point_1)) + crossover_point_1;
    
    // Step 2: Create the child path with null values initially
    let child_path = new Array(parent_1_path.length).fill(null);
    
    // Step 3: Copy the portion of parent_1's path between the crossover points
    for (let i = crossover_point_1; i <= crossover_point_2; i++) {
        child_path[i] = parent_1_path[i];
    }
    
    // Step 4: Fill the remaining positions in the child path with cities from parent_2 while maintaining the order
    let parent_2_index = 0;
    for (let i = 0; i < parent_2_path.length; i++) {
        if (!child_path.includes(parent_2_path[i])) {
            // Find the next available position in the child path
            while (child_path[parent_2_index] !== null) {
                parent_2_index++;
            }
            child_path[parent_2_index] = parent_2_path[i];
        }
    }

    // Step 5: Calculate the total distance of the child path
    let distance = genetic_calculate_distance(child_path);

    // Return the child object with its path and distance
    return { path: child_path, distance: distance };
}


// Example mutate function (mutation swaps two cities)
function mutate(child) {
    let mutation_point_1 = Math.floor(Math.random() * child.path.length);
    let mutation_point_2 = Math.floor(Math.random() * child.path.length);

    // Swap two cities in the path
    [child.path[mutation_point_1], child.path[mutation_point_2]] = 
        [child.path[mutation_point_2], child.path[mutation_point_1]];

    // Recalculate the distance after mutation
    child.distance = genetic_calculate_distance(child.path);
    
    return child;
}

// Example calculate_distance function (using Euclidean distance)
function genetic_calculate_distance(path) {
    let total_distance = 0;

    // Compute total distance of the path
    for (let i = 0; i < path.length - 1; i++) {
        let city1 = path[i];
        let city2 = path[i + 1];
        total_distance += Math.sqrt(Math.pow(city2.x - city1.x, 2) + Math.pow(city2.y - city1.y, 2));
    }

    // Optionally, add the distance to return to the starting city (round-trip TSP)
    let last_city = path[path.length - 1];
    let first_city = path[0];
    total_distance += Math.sqrt(Math.pow(first_city.x - last_city.x, 2) + Math.pow(first_city.y - last_city.y, 2));

    return total_distance;
}
