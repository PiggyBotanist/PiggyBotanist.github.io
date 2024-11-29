class Map {
    constructor(screenWidth, screenHeight){
        this.mapWidth = screenWidth;
        this.mapHeight = screenHeight;
        this.minDistance = 30;

    }

    // Draw the cities on the canvas with labels
    draw_cities(ctx, cities) {
        for (let i = 0; i < cities.length; i++) {
            // Draw the city circle
            ctx.strokeStyle = "black";
            ctx.beginPath();
            ctx.arc(cities[i].x, cities[i].y, 5, 0, 2 * Math.PI);
            ctx.stroke();

            // Draw the city label (ID)
            ctx.fillStyle = "black";  // Text color
            ctx.font = "12px Arial";  // Font size and family
            ctx.fillText(cities[i].city, cities[i].x + 7, cities[i].y);  // Positioning the label a bit to the right
        }

        ctx.strokeStyle = "white";  // Reset stroke color if needed
    }

    draw_genetic_path(ctx, best_path){
        for (let i = 0; i < best_path.path.length - 1; i++) {
            ctx.strokeStyle = "green";
            ctx.beginPath();
            ctx.moveTo(best_path.path[i].x, best_path.path[i].y);
            ctx.lineTo(best_path.path[i+1].x, best_path.path[i+1].y);
            ctx.stroke();    
        }
        ctx.strokeStyle = "white";
    }

    // Function to draw pheromones with varying intensity
    draw_pheromones(pheromones) {
        for (let i = 0; i < pheromones.length; i++) {
            for (let j = i + 1; j < pheromones[i].length; j++) {
                const pheromoneLevel = pheromones[i][j].pheromone;
                const strength = Math.min(1, pheromoneLevel); // Max pheromone strength is 1 (can adjust this as needed)
    
                // Map pheromone strength to line thickness (or opacity)
                ctx.lineWidth = strength * 10;  // Line width proportional to pheromone level
                ctx.strokeStyle = `rgba(0, 0, 255, ${strength})`;  // Blue color, opacity based on pheromone strength
    
                // Draw the line between the two cities
                ctx.beginPath();
                ctx.moveTo(cities[i].x, cities[i].y);
                ctx.lineTo(cities[j].x, cities[j].y);
                ctx.stroke();
            }
        }
        // Reset to default after drawing
        ctx.lineWidth = 1;  // Reset lineWidth to default value
        ctx.strokeStyle = "#000000";  // Reset strokeStyle to default (black)
    }
}