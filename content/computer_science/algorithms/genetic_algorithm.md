+++
title = "Genetic Algorithm"
date = "2024-12-19T12:41:04-05:00"
weight = 1
draft = false
+++
{{< math align="center" >}}{{< /math >}}

<link rel="stylesheet" href="/demo/algorithms/geneticAlgorithm_TSP/style.css">
<div class="form-container">
    <div class="form-group">
        <label for="node-arrangement">Node Arrangement:</label>
        <select id="node-arrangement" class="select">
            <option value="random">Random Nodes</option>
            <option value="circular">Circular Nodes</option>
        </select>
    </div>
    <div class="form-group">
        <label for="node-count">Number of Nodes (Recommended: 2 - 1000):</label>
        <input id="node-count" class="input" type="number" value="100" min="2" max="500">
    </div>
    <div class="form-group">
        <label for="population-size">Population Size (Recommend: 10 - 500):</label>
        <input id="population-size" class="input" type="number" value="100" min="10" max="500">
    </div>
    <div class="form-group">
        <label for="generations">Generations (Recommend: 100 - 5,000):</label>
        <input id="generations" class="input" type="number" value="20" min="1" max="5000">
    </div>
    <div class="form-group">
        <label for="mutation-rate">Mutation Rate (Recommend: 0.01 - 0.5):</label>
        <input id="mutation-rate" class="input" type="number" value="0.05" min="0.01" max="0.5" step="0.01">
    </div>
    <div class="button-group">
        <button id="run-geneticAlgorithm" class="button">Run</button>
        <button id="pause" class="button">Pause</button>
        <button id="reset" class="button">Restart</button>
    </div>
    <canvas id="canvas"></canvas>
</div>
<script src="/demo/algorithms/geneticAlgorithm_TSP/map.js"></script>
<script src="/demo/algorithms/geneticAlgorithm_TSP/main.js"></script>
<script src="/demo/algorithms/geneticAlgorithm_TSP/input_listener.js"></script>
<script src="/demo/algorithms/geneticAlgorithm_TSP/genetic_algorithm.js"></script>
    
### Introduction to Genetic Algorithm

**Genetic Algorithms (GA)** is first proposed by **John Holland** in 1975, is a metaheuristic inspired by the process of **natural selection** in biology and belongs to a large class of algorithms known as **evolutionary algorithms (EA)** [(Holland, 1975)](https://doi.org/10.7551/mitpress/1090.001.0001).

The algorithm mimics the process of nature selection, fitness, offspring production, and mutation. With repetition in these process over many generations, we will eventually arrive at a solution that is better and better overtime.

The Key concepts in the algorithm involves:
1. **Natural Selection**: given a definition of fitness, only a certain proportion of population will be able to survive.
2. **Offspring Production / Cross Over**: for those who survived, they have the opportunity to breed and carry their genetic material. The offspring will have genes randomly assigned for one of its parents.
3. **Mutation**: after the offspring is produce, it will be subject to potential mutations where it will get a gene randomly assigned. 
4. **Repetition**: usually step 1-3 are repeated over and over again until a specific threshold is met. 

The parameters involved in this algorithm includes:
- **Population Size**: which represents how many individuals are present in each generation.
- **Max Iteration**: max number of generations we allow (e.g: run 100 generations total).
- **Survive Ratio**: proportion of top individuals that can survive (e.g: 0.1 means top 10% survives each iteration).
- **Mutation Rate**: the probability for one gene to be mutated for each individual.

### Traveling Salesman Problem as an Example
The **Traveling Salesman Problem (TSP)** is a classic optimization problem defined by a set of $n$ cities, each represented by a pair of Cartesian coordinates $(x_i, y_i)$, where ${i = 1, 2, \dots, n}$. The goal of the problem is to find the shortest possible route that visits each node exactly once and returns to the starting node. The challenge is to explore the vast solution space efficiently to minimize the total distance traveled. If we were to calculate the result for all possibilities we will have **$n!n!$** may possibilities, hence will take a long time to get the optimal solution even with only a few hundred cities. Hence, we can use **genetic algorithm** to find a relatively optimal solution in a short amount of time. *NOTE: it is only a relative optimal, because this method can never guarentee finding the best solution*. 

In this problem lets assume we have a solution P where $ P = (p_1, p_2, \dots, p_n)$. $p_1$ is the first city we visit, followed by $p_2$, $p_3$ ... until the last p which is $p_n$. The total distance can then be calculated by adding the distance between the two points together like this:

$$
D(P) = \sum_{i=1}^{n-1} \text{dist}(p_i, p_{i+1})
$$

where $\text{dist}(p_i, p_j)$ is the Euclidean distance between nodes $p_i$ and $p_j$, calculated as:

$$
\text{dist}(p_i, p_j) = \sqrt{(x_i - x_j)^2 + (y_i - y_j)^2}
$$

We can then define the **fitness** of a specific solution to be:

$$
F(P) = \frac{1}{D(P)}
$$

## Solving the Problem
Now we have the definition we can go about optimizing the solution.

Here the permutation of cities is its entire genome where each city at position i is one gene, all we need to do is find the fitness of a group of population with different sets of city, get offspring (city of permutation from two parents) with some mutation.

### Example source code using python:

```python
class GeneticAlgorithm:
    def __init__(self, population_size, survive_ratio, mutation_rate, max_iteration):
        self.population_size = population_size
        self.survive_ratio = survive_ratio
        self.mutation_rate = mutation_rate
        self.max_iteration = max_iteration
        self.best_path = None
        self.populations = []

    # Fisher-Yates Shuffle (The shuffle is unique here because we cannot have repeat, but also need all to be included)
    def shuffle(self, array):
        for i in range(len(array) - 1, 0, -1):
            j = random.randint(0, i)
            array[i], array[j] = array[j], array[i]
        return array

    # Initialize the population of paths
    def init_population(self, nodes):
        self.populations = []

        for _ in range(self.population_size):
            new_shuffle = self.shuffle(nodes[:])  # Copy nodes and shuffle
            path = [new_shuffle[0]]
            distance = 0

            # Create a path from the shuffled nodes and calculate its distance
            for i in range(len(new_shuffle) - 1):
                distance += self.calculate_distance(new_shuffle[i], new_shuffle[i + 1])
                path.append(new_shuffle[i + 1])

            self.populations.append({'path': path, 'distance': distance})

    # Calculate Euclidean distance between two points
    def calculate_distance(self, node1, node2):
        return math.sqrt((node2['x'] - node1['x']) ** 2 + (node2['y'] - node1['y']) ** 2)

    # Run the Genetic Algorithm to evolve the population
    def run_one_iteration(self):
        # Sort the population by distance
        self.populations.sort(key=lambda x: x['distance'])

        # Save the best path found so far
        if self.best_path is None or self.populations[0]['distance'] < self.best_path['distance']:
            self.best_path = self.populations[0]

        # Perform natural selection to generate the next generation
        self.populations = self.natural_selection(self.populations, self.survive_ratio, self.mutation_rate)

        return self.best_path

    # Natural selection step: survival of the fittest
    def natural_selection(self, sorted_population, survive_ratio, mutation_rate):
        num_survived = int(survive_ratio * len(sorted_population))
        survived_population = sorted_population[:num_survived]  # Survivors

        new_population = []

        # Create new individuals (offspring) through crossover and mutation
        for _ in range(len(sorted_population) - num_survived):
            parent_1 = random.choice(survived_population)
            parent_2 = random.choice(survived_population)

            child = self.crossover(parent_1, parent_2)

            # Apply mutation to the child with a given mutation rate
            if random.random() < mutation_rate:
                child = self.mutate(child)

            new_population.append(child)

        # Combine survivors and new population to form the next generation
        return survived_population + new_population

    # Crossover function (Order Crossover - OX)
    def crossover(self, parent_1, parent_2):
        parent_1_path = parent_1['path']
        parent_2_path = parent_2['path']

        crossover_point_1 = random.randint(0, len(parent_1_path) - 1)
        crossover_point_2 = random.randint(crossover_point_1, len(parent_1_path) - 1)

        child_path = [None] * len(parent_1_path)

        # Copy the portion of parent_1's path between the crossover points
        for i in range(crossover_point_1, crossover_point_2 + 1):
            child_path[i] = parent_1_path[i]

        # Fill the remaining positions in the child path with nodes from parent_2
        parent_2_index = 0
        for i in range(len(parent_2_path)):
            if parent_2_path[i] not in child_path:
                while child_path[parent_2_index] is not None:
                    parent_2_index += 1
                child_path[parent_2_index] = parent_2_path[i]

        distance = self.calculate_path_distance(child_path)
        return {'path': child_path, 'distance': distance}

    # Mutate function (mutation swaps two nodes)
    def mutate(self, child):
        mutation_point_1 = random.randint(0, len(child['path']) - 1)
        mutation_point_2 = random.randint(0, len(child['path']) - 1)

        # Swap two nodes in the path
        child['path'][mutation_point_1], child['path'][mutation_point_2] = child['path'][mutation_point_2], child['path'][mutation_point_1]

        # Recalculate the distance after mutation
        child['distance'] = self.calculate_path_distance(child['path'])
        return child

    # Calculate total distance of a given path
    def calculate_path_distance(self, path):
        total_distance = 0
        for i in range(len(path) - 1):
            total_distance += self.calculate_distance(path[i], path[i + 1])

        # Optionally add distance to return to the starting city (round-trip TSP)
        total_distance += self.calculate_distance(path[-1], path[0])
        return total_distance
```



Reference:
- [Holland, J. H. (1975). Adaptation in natural and artificial systems](https://doi.org/10.7551/mitpress/1090.001.0001)