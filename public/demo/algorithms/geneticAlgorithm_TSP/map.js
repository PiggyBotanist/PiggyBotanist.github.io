class CanvasMap {
    constructor(screenWidth, screenHeight, minDistance = 0){
        this.mapWidth = screenWidth;
        this.mapHeight = screenHeight;
        this.minDistance = minDistance;
    }

    // Generate Nodes
    generateNodes(ctx, number_of_nodes, arrangement) {
        
        let nodes = [];
        // Check if requested arrangement is circular
        if (arrangement === "circular") {
            let centerX = this.mapWidth / 2;
            let centerY = this.mapHeight / 2;
            let radius = Math.min(this.mapWidth, this.mapHeight) / 4;  // Radius of the circle

            // Angle between nodes (equally spaced along the circle)
            let angleStep = 2 * Math.PI / number_of_nodes;

            for (let i = 0; i < number_of_nodes; i++) {
                let angle = angleStep * i;  // Each node has a unique angle

                // Calculate the x, y position of the node
                let x = centerX + radius * Math.cos(angle);
                let y = centerY + radius * Math.sin(angle);

                // Add the node with its position
                nodes.push({ "id": i, "x": x, "y": y });
            }
        } else {
            // Random arrangement (existing code for random nodes placement)
            for (let i = 0; i < number_of_nodes; i++) {
                let x, y;
                let valid = false;
                // Try to find a valid position for the new node
                while (!valid) {
                    x = Math.floor(Math.random() * (this.mapWidth - 50) + 25);
                    y = Math.floor(Math.random() * (this.mapHeight - 50) + 25);
                    valid = true;
                    // Check the distance to all other nodes
                    for (let j = 0; j < nodes.length; j++) {
                        let node = nodes[j];
                        let distance = Math.sqrt(Math.pow(x - node.x, 2) + Math.pow(y - node.y, 2));
                        // If the distance is less than the minimum, break and try again
                        if (distance < this.minDistance) {
                            valid = false;
                            break;
                        }
                    }
                }
                // Once a valid position is found, add the node
                nodes.push({ "id": i, "x": x, "y": y });
            }
        }

        // Continue the animation loop
        this.draw_nodes(ctx, nodes);

        return nodes;
    }


    // Draw the nodes on the canvas with labels
    draw_nodes(ctx, nodes) {
        // Clear the canvas before drawing (to prevent overlapping)
        ctx.clearRect(0, 0, this.mapWidth, this.mapHeight);
        for (let i = 0; i < nodes.length; i++) {
            // Draw the nodes circle
            ctx.strokeStyle = "black";
            ctx.beginPath();
            ctx.arc(nodes[i].x, nodes[i].y, 5, 0, 2 * Math.PI);
            ctx.stroke();

            // Draw the nodes label (ID)
            ctx.fillStyle = "black";  // Text color
            ctx.font = "12px Arial";  // Font size and family
            ctx.fillText(nodes[i].id, nodes[i].x + 7, nodes[i].y);  // Positioning the label a bit to the right
        }

        ctx.strokeStyle = "white";  // Reset stroke color if needed
    }
}