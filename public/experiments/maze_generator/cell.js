// Cell Class:
// Each class contains:
// Position: (x, y) denoted (i, j).
// Walls (boolean): [Top, Right, Bottom, Left] - True = wall, false = no wall.
// Visited (boolean): For maze generation (shows whether the cell has been generated or not).
// Explored (boolean): For path finding algorithm (shows whether the cell has been explored or not).

// Written by: Jeremy Chang
// Date: July 11, 2023

function Cell(i, j){
    this.i = i; // i-coordinate of the cell
    this.j = j; // j-coordinate of the cell
    
    // Array to represent the presence of walls: [top, right, bottom, left]
    this.walls = [true, true, true, true];
    
    this.visited = false; // Flag to track if the cell has been visited
    this.explored = false; // Flag to track if the cell has been explored
    
    // Function to check neighboring cells that haven't been visited
    this.checkNeighbors = function() {
        var neighbors = [];
    
        // Get the neighboring cells (top, right, bottom, left) using their indices
        var top = grid[index(i, j - 1)];
        var right = grid[index(i + 1, j)];
        var bottom = grid[index(i, j + 1)];
        var left = grid[index(i - 1, j)];
    
        // Add the unvisited neighbors to the 'neighbors' array
        if (top && !top.visited) {
          neighbors.push(top);
        }
        if (right && !right.visited) {
          neighbors.push(right);
        }
        if (bottom && !bottom.visited) {
          neighbors.push(bottom);
        }
        if (left && !left.visited) {
          neighbors.push(left);
        }
    
        if (neighbors.length > 0) {
          // Randomly select and return one of the unvisited neighbors
          var r = floor(random(0, neighbors.length));
          return neighbors[r];
        } else {
          return undefined;
        } 
    }

    // Function to highlight the cell
    this.highlight = function(){
        var x = this.i * w; // x-coordinate of the top-left corner of the cell
        var y = this.j * w; // y-coordinate of the top-left corner of the cell
        noStroke();
        fill(0, 0, 255, 100); // Set fill color with transparency
        rect(x, y, w, w); // Draw a rectangle to highlight the cell
    }

    // Function to display the cell
    this.show = function() {
        var x = this.i * w; // x-coordinate of the top-left corner of the cell
        var y = this.j * w; // y-coordinate of the top-left corner of the cell
        stroke(255); // Set stroke color to white

        // Draw the walls of the cell based on their presence in the 'walls' array
        if (this.walls[0]) {
            line(x, y, x + w, y); // Top wall
        }
        if (this.walls[1]) {
            line(x + w, y, x + w, y + w); // Right wall
        }
        if (this.walls[2]) {
            line(x + w, y + w, x, y + w); // Bottom wall
        }
        if (this.walls[3]) {
            line(x, y + w, x, y); // Left wall
        }

        if (this.visited) {
            // If the cell has been visited, fill it with a semi-transparent pink color
            noStroke();
            fill(255, 0, 255, 100);
            rect(x, y, w, w);
        }
    }

    // Function to display the explored cells
    this.show_explored = function(){
        var x = this.i * w; // x-coordinate of the top-left corner of the cell
        var y = this.j * w; // y-coordinate of the top-left corner of the cell
        
        if (this.explored) {
            // If the cell has been explored, fill it with a semi-transparent orange color
            noStroke();
            fill(255, 128, 0, 100);
            rect(x, y, w, w);    
        }
    }

    // Function to find paths from the current cell
    this.findPaths = function(){
        var paths = [];

        // Get the neighboring cells (top, right, bottom, left) using their indices
        var top = grid[index(i, j - 1)];
        var right = grid[index(i + 1, j)];
        var bottom = grid[index(i, j + 1)];
        var left = grid[index(i - 1, j)];

        // Add the unexplored neighbors without walls to the 'paths' array
        if (top && !this.walls[0] && !top.explored){
            paths.push(top);
        }
        if (right && !this.walls[1] && !right.explored){
            paths.push(right);
        }
        if (bottom && !this.walls[2] && !bottom.explored){
            paths.push(bottom);
        }
        if (left && !this.walls[3] && !left.explored){
            paths.push(left);
        }
        
        if (paths.length > 0) {
            // Randomly select and return one of the unexplored paths
            var r = floor(random(0, paths.length));
            return paths[r];
        } else {
            return undefined;
        } 
    }
}
