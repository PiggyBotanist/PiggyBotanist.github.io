// Title: Maze Generator Using Back-track Recursion
// Written by: Jeremy Chang
// Date: July 10, 2023

// Note: This javascript also uses p5.js functions.
// Source: https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/p5.min.js
//         https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/addons/p5.dom.min.js

var cols, rows;
var w = 10; // Width and height of each cell
var grid = []; // Array to store the cells

var current; // Current cell being visited
var stack = []; // Stack to keep track of visited cells

var current_explore; // Current cell being explored
var path_explored; // Flag to track if a path has been explored
var path = []; // Array to store the explored path

function setup(){
    var canvas = createCanvas(300, 300); // Create a canvas for visualization
    canvas.parent('canvas');
    cols = floor(width/w); // Calculate the number of columns based on canvas width and cell width
    rows = floor(height/w); // Calculate the number of rows based on canvas height and cell height

    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
          var cell = new Cell(i, j); // Create a new cell object
          grid.push(cell); // Add the cell to the grid array
        }
    }

    current = grid[0]; // Set the initial current cell as the first cell in the grid
    current_explore = grid[0]; // Set the initial current_explore cell as the first cell in the grid
}

function draw(){
    background(51); // Set the background color

    for(var i = 0; i < grid.length; i++){
      grid[i].show(); // Display each cell in the grid
    }
    
    for(var i = 0; i < path.length; i++){
      path[i].show_explored(); // Display each explored cell in the path
    }

    current.visited = true; // Mark the current cell as visited
    current.highlight(); // Highlight the current cell
    var next = current.checkNeighbors(); // Get the next unvisited neighbor of the current cell

    if (next){
      next.visited = true; // Mark the next cell as visited

      stack.push(current); // Add the current cell to the stack

      removeWalls(current, next); // Remove the walls between the current cell and the next cell

      current = next; // Update the current cell to be the next cell
    } else if (stack.length > 0){
      current = stack.pop(); // If there are no unvisited neighbors, backtrack by popping the cell from the stack
    } else {
      current_explore.explored = true; // Mark the current_explore cell as explored
      current_explore.highlight(); // Highlight the current_explore cell
      var next_to_explore = current_explore.findPaths(); // Get the next unexplored path from the current_explore cell

      if(next_to_explore && !(current_explore.i + current_explore.j == rows + cols -2) ){
        next_to_explore.explored = true; // Mark the next_to_explore cell as explored
        path.push(current_explore); // Add the current_explore cell to the path
        current_explore = next_to_explore; // Update the current_explore cell to be the next_to_explore cell
      } else if (current_explore.i + current_explore.j == rows + cols -2 ){
        console.log("done!"); // Output "done!" in the console when the exploration is complete
      } else {
        current_explore = path.pop(); // If there are no unexplored paths, backtrack by popping the cell from the path
      }
    }
}

function index(i, j) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
      return -1; // Return -1 if the indices are out of bounds
    }
    return i + j * cols; // Calculate the index based on the row and column
}

function removeWalls(a, b) {
    var x = a.i - b.i;
    if (x === 1) {
      a.walls[3] = false; // Remove the bottom wall of cell a
      b.walls[1] = false; // Remove the right wall of cell b
    } else if (x === -1) {
      a.walls[1] = false; // Remove the right wall of cell a
      b.walls[3] = false; // Remove the bottom wall of cell b
    }
    var y = a.j - b.j;
    if (y === 1) {
      a.walls[0] = false; // Remove the top wall of cell a
      b.walls[2] = false; // Remove the right wall of cell b
    } else if (y === -1) {
      a.walls[2] = false; // Remove the right wall of cell a
      b.walls[0] = false; // Remove the top wall of cell b
    }
}
