// Generate Nodes
function generateNodes(canvas, number_of_nodes, arrangement, minDistance = 30) {
    let nodes = [];
    // Check if requested arrangement is circular
    if (arrangement === "circular") {
        let centerX = canvas.width / 2;
        let centerY = canvas.height / 2;
        let radius = Math.min(canvas.width, canvas.height) / 4;  // Radius of the circle

        // Angle between nodes (equally spaced along the circle)
        let angleStep = 2 * Math.PI / number_of_nodes;

        for (let i = 0; i < number_of_nodes; i++) {
            let angle = angleStep * i;  // Each node has a unique angle

            // Calculate the x, y position of the node
            let x = centerX + radius * Math.cos(angle);
            let y = centerY + radius * Math.sin(angle);

            // Add the node with its position
            nodes.push({ "city": i, "x": x, "y": y });
        }
    } else {
        // Random arrangement (existing code for random nodes placement)
        for (let i = 0; i < number_of_nodes; i++) {
            let x, y;
            let valid = false;
            // Try to find a valid position for the new node
            while (!valid) {
                x = Math.floor(Math.random() * (canvas.width - 50) + 25);
                y = Math.floor(Math.random() * (canvas.height - 50) + 25);
                valid = true;
                // Check the distance to all other nodes
                for (let j = 0; j < nodes.length; j++) {
                    let node = nodes[j];
                    let distance = Math.sqrt(Math.pow(x - node.x, 2) + Math.pow(y - node.y, 2));
                    // If the distance is less than the minimum, break and try again
                    if (distance < minDistance) {
                        valid = false;
                        break;
                    }
                }
            }
            // Once a valid position is found, add the node
            nodes.push({ "city": i, "x": x, "y": y });
        }
    }
    return nodes;
}
