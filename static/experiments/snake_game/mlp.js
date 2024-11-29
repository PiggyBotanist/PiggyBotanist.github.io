class MLP {
    constructor(input, hidden, output) {
        this.input = input;
        this.hidden = hidden;
        this.output = output;
        this.layers = this.#initialize();
    }

    #initialize() {
        let prev_layer = this.input; // The previous layer is the input layer initially
        let layers = [];

        // Loop through the hidden layers and generate each one
        for (let i = 0; i < this.hidden.length; i++) {
            // Generate a hidden layer with prev_layer as the input and hidden[i] as output
            layers.push(this.#generate_layer(prev_layer, this.hidden[i]));
            // Update prev_layer to be the current hidden layer's output size
            prev_layer = this.hidden[i];
        }

        // Generate the output layer with the last hidden layer size as input
        layers.push(this.#generate_layer(prev_layer, this.output));

        return layers;
    }

    #generate_layer(input_node, output_node) {
        let layer = {};
        
        // Initialize weights randomly between -1 and 1
        layer.weights = [];
        for (let i = 0; i < input_node; i++) {
            let weightRow = [];
            for (let j = 0; j < output_node; j++) {
                // Random weight between -1 and 1
                weightRow.push(Math.random() * 2 - 1);
            }
            layer.weights.push(weightRow);
        }

        // Initialize biases as zeros for each output node
        layer.biases = new Array(output_node).fill(0);

        return layer;
    }

    // Forward pass to compute output
    forward(inputs) {
        let current_inputs = inputs;

        // Loop through each layer in the MLP
        for (let i = 0; i < this.layers.length; i++) {
            let layer = this.layers[i];
            let next_inputs = [];

            // Calculate the output of the layer (1st loop through all output_nodes)
            // i = layer; j = output_node; k = input_node
            for (let j = 0; j < layer.weights[0].length; j++) {
                let weighted_sum = 0;

                // Calculate weighted sum of inputs + bias (loop through each input_nodes)
                for (let k = 0; k < current_inputs.length; k++) {
                    weighted_sum += current_inputs[k] * layer.weights[k][j];
                }
                weighted_sum += layer.biases[j];

                // Apply activation function (e.g., ReLU for hidden layers)
                if (i < this.layers.length - 1) {
                    // Apply ReLU activation for hidden layers
                    next_inputs.push(this.#relu(weighted_sum));
                } else {
                    // For the final layer, we'll not apply any activation here,
                    // because we will apply Softmax outside the loop
                    next_inputs.push(weighted_sum);
                }
            }

            // Set the output of this layer as the input for the next layer
            current_inputs = next_inputs;
        }

        // Apply Softmax on the final layer output
        return this.#softmax(current_inputs);  // Apply softmax to the last layer's raw outputs
    }

    // ReLU Activation Function
    #relu(x) {
        return Math.max(0, x);
    }

    // Softmax Activation Function for the final output layer
    #softmax(outputs) {
        const expValues = outputs.map(value => Math.exp(value));
        const sumExpValues = expValues.reduce((acc, value) => acc + value, 0);
        return expValues.map(value => value / sumExpValues); // Normalize
    }

    // Cloning function to create a new network with the same architecture and weights
    clone_network() {
        // Deep clone each layer's weights and biases
        let clonedLayers = this.layers.map(layer => {
            return {
                weights: layer.weights.map(weightRow => weightRow.slice()), // Clone each weight row
                biases: layer.biases.slice() // Clone biases
            };
        });

        // Create a new MLP with the same structure and cloned layers
        let clonedNetwork = new MLP(this.input, this.hidden, this.output);
        clonedNetwork.layers = clonedLayers; // Set the cloned layers to the new MLP
        return clonedNetwork;
    }
}
