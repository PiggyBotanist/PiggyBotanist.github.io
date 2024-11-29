// Function to calculate the Euclidean distance between two cities
function calculate_distance(city1, city2) {
    return Math.sqrt(Math.pow(city2.x - city1.x, 2) + Math.pow(city2.y - city1.y, 2));
}

// Initialize the pheromone matrix (same for all edges initially)
function initialize_pheromones(cities, pheromone_concentration) {
    let pheromones = [];
    for (let i = 0; i < cities.length; i++) {
        pheromones[i] = [];
        for (let j = 0; j < cities.length; j++) {
            pheromones[i][j] = {"distance": calculate_distance(cities[i], cities[j]), "pheromone": pheromone_concentration};
        }
    }
    return pheromones;
}

// Initialize ant positions
function initialize_ant_position(cities, ant_population) {
    let positions = [];
    for (let i = 0; i < ant_population; i++) {
        let random = Math.floor(Math.random() * cities.length);
        positions.push({"city": random});
    }
    return positions;
}

// Function to simulate pheromone evaporation
function evaporation(pheromones, pheromone_evaporation_rate) {
    for (let i = 0; i < pheromones.length; i++) {
        for (let j = 0; j < pheromones[i].length; j++) {
            pheromones[i][j].pheromone *= (1 - pheromone_evaporation_rate);

            if(pheromones[i][j].pheromone < 0.05){
                pheromones[i][j].pheromone = 0.05;
            }
            //console.log("heromones[i][j].pheromone", pheromones[i][j].pheromone);
        }
    }
    return pheromones;
}

// Function to select the next city to visit based on pheromone levels and distance
function select_path(ant_position, pheromones) {
    let current_city = ant_position.city;
    let probabilities = [];
    let total_pheromone = 0;

    // Calculate total pheromone for all possible cities
    for (let i = 0; i < pheromones[current_city].length; i++) {
        if (i !== current_city) {
            total_pheromone += pheromones[current_city][i].pheromone;
        }
    }

    // Calculate the probability for each city
    for (let i = 0; i < pheromones[current_city].length; i++) {
        if (i !== current_city) {
            let prob = pheromones[current_city][i].pheromone / total_pheromone;
            probabilities.push({city: i, prob: prob});
        }
    }

    // Choose the next city based on the probabilities
    let random = Math.random();
    let cumulative_probability = 0;

    for (let i = 0; i < probabilities.length; i++) {
        cumulative_probability += probabilities[i].prob;
        if (random < cumulative_probability) {
            return probabilities[i].city;
        }
    }
    return probabilities[probabilities.length - 1].city;  // default to last city if no match
}

// Function to add pheromone based on the path taken by the ants
function add_pheromone_by_path(paths, pheromones, pheromone_concentration) {
    for (let path of paths) {
        let current_city = path.start;
        for (let next_city of path.visited) {
            pheromones[current_city][next_city].pheromone += pheromone_concentration;
            current_city = next_city;
        }
    }
    return pheromones;
}

// Function to run a single iteration of the ACO
function run_iteration(ant_position, pheromones, pheromone_concentration, pheromone_evaporation_rate) {
    pheromones = evaporation(pheromones, pheromone_evaporation_rate);

    let paths = [];
    for (let i = 0; i < ant_position.length; i++) {
        let path = {start: ant_position[i].city, visited: []};
        let next_city = select_path(ant_position[i], pheromones);
        path.visited.push(next_city);
        paths.push(path);
    
        ant_position[i].city = next_city;
    }

    pheromones = add_pheromone_by_path(paths, pheromones, pheromone_concentration);
}
