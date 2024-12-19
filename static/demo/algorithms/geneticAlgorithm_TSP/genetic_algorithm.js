class GeneticAlgorithm {
    constructor(population_size, survive_ratio, mutation_rate, max_iteration) {
        this.population_size = population_size;
        this.survive_ratio = survive_ratio;
        this.mutation_rate = mutation_rate;
        this.max_iteration = max_iteration;
        this.best_path = null;
        this.populations = [];
    }

    // Fisher-Yates Shuffle
    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Initialize the population of paths
    init_population(nodes) {
        this.populations = [];

        for (let i = 0; i < this.population_size; i++) {
            let newShuffle = this.shuffle([...nodes]); // Copy nodes and shuffle
            let path = [newShuffle[0]];
            let distance = 0;
            
            // Create a path from the shuffled nodes and calculate its distance
            for (let j = 0; j < newShuffle.length - 1; j++) {
                distance += this.calculate_distance(newShuffle[j], newShuffle[j + 1]);
                path.push(newShuffle[j + 1]);
            }

            this.populations.push({ path, distance });
        }
    }

    // Calculate Euclidean distance between two points
    calculate_distance(node1, node2) {
        return Math.sqrt(Math.pow(node2.x - node1.x, 2) + Math.pow(node2.y - node1.y, 2));
    }

    // Run the Genetic Algorithm to evolve the population
    run_one_iteration() {
        // Sort the population by distance
        this.populations.sort((a, b) => a.distance - b.distance);
        
        // Save the best path found so far
        if (!this.best_path || this.populations[0].distance < this.best_path.distance) {
            this.best_path = this.populations[0];
        }
        // Perform natural selection to generate the next generation
        this.populations = this.natural_selection(this.populations, this.survive_ratio, this.mutation_rate);

        return this.best_path;
    }

    // Natural selection step: survival of the fittest
    natural_selection(sorted_population, survive_ratio, mutation_rate) {
        let num_survived = Math.floor(survive_ratio * sorted_population.length);
        let survived_population = sorted_population.slice(0, num_survived); // Survivors

        let new_population = [];

        // Create new individuals (offspring) through crossover and mutation
        for (let i = 0; i < sorted_population.length - num_survived; i++) {
            let parent_1 = survived_population[Math.floor(Math.random() * survived_population.length)];
            let parent_2 = survived_population[Math.floor(Math.random() * survived_population.length)];
            
            let child = this.crossover(parent_1, parent_2);

            // Apply mutation to the child with a given mutation rate
            if (Math.random() < mutation_rate) {
                child = this.mutate(child);
            }

            new_population.push(child);
        }

        // Combine survivors and new population to form the next generation
        return survived_population.concat(new_population);
    }

    // Crossover function (Order Crossover - OX)
    crossover(parent_1, parent_2) {
        let parent_1_path = parent_1.path;
        let parent_2_path = parent_2.path;
        
        let crossover_point_1 = Math.floor(Math.random() * parent_1_path.length);
        let crossover_point_2 = Math.floor(Math.random() * (parent_1_path.length - crossover_point_1)) + crossover_point_1;
        
        let child_path = new Array(parent_1_path.length).fill(null);

        // Copy the portion of parent_1's path between the crossover points
        for (let i = crossover_point_1; i <= crossover_point_2; i++) {
            child_path[i] = parent_1_path[i];
        }
        
        // Fill the remaining positions in the child path with nodes from parent_2
        let parent_2_index = 0;
        for (let i = 0; i < parent_2_path.length; i++) {
            if (!child_path.includes(parent_2_path[i])) {
                while (child_path[parent_2_index] !== null) {
                    parent_2_index++;
                }
                child_path[parent_2_index] = parent_2_path[i];
            }
        }

        let distance = this.calculate_path_distance(child_path);
        return { path: child_path, distance };
    }

    // Mutate function (mutation swaps two nodes)
    mutate(child) {
        let mutation_point_1 = Math.floor(Math.random() * child.path.length);
        let mutation_point_2 = Math.floor(Math.random() * child.path.length);

        // Swap two nodes in the path
        [child.path[mutation_point_1], child.path[mutation_point_2]] = 
            [child.path[mutation_point_2], child.path[mutation_point_1]];

        // Recalculate the distance after mutation
        child.distance = this.calculate_path_distance(child.path);
        return child;
    }

    // Calculate total distance of a given path
    calculate_path_distance(path) {
        let total_distance = 0;
        for (let i = 0; i < path.length - 1; i++) {
            total_distance += this.calculate_distance(path[i], path[i + 1]);
        }
        // Optionally add distance to return to the starting city (round-trip TSP)
        total_distance += this.calculate_distance(path[path.length - 1], path[0]);
        return total_distance;
    }

    draw_bestPath(ctx) {
        if (this.best_path === null || this.best_path.path.length === 0) return;

        // Set the stroke color for the best path
        ctx.strokeStyle = "green";
        ctx.lineWidth = 2;  // Set the line width for the path

        ctx.beginPath();
        // Draw the path
        ctx.moveTo(this.best_path.path[0].x, this.best_path.path[0].y);

        for (let i = 1; i < this.best_path.path.length; i++) {
            ctx.lineTo(this.best_path.path[i].x, this.best_path.path[i].y);
        }

        // Optionally, close the loop if it's a round-trip path
        ctx.lineTo(this.best_path.path[0].x, this.best_path.path[0].y);

        // Actually draw the path
        ctx.stroke();

        // Reset the stroke style
        ctx.strokeStyle = "black"; // Set the stroke color to the default (black) or any other desired color
    }
}
