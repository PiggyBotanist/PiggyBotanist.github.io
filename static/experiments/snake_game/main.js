// Project Title: Hungry Snake Clone
// Start Date: August 1st, 2023
// End Date:
// Written by: Jeremy Chang

// Find and define canvas and define its context
const snakeCanvas = document.getElementById("snakeCanvas");
const snakeCtx = snakeCanvas.getContext("2d");

// Define how many pixels for each block on the map
const mapPixelSize = 20;

// Define the size of canvas in pixels
snakeCanvas.height = 700;
snakeCanvas.width = 700;

// Define variables for genetic algorithm
var generation = 1;
var population = 150; 
var survived_population = 0.08;
var selection_pool = 0.25;        // selection from top %
var mutation_rate = 0.05;        // mutation rate

// Set game mode: Can be "AI" or "manual"
var play_method = "Manual";  

// Game state variables
var gameRunning = false;  // Track whether the game is running

// Create a snake game map object
var snakeMap = new Map(mapPixelSize, snakeCanvas.width, snakeCanvas.height);

// Initialize game elements
var snake, fruit;

function initializeGame() {
    if (play_method == "AI") {
        // Create a population of snakes and fruits for AI
        snake = initializeSnake(snakeMap, population, [6, 10, 10, 4]);
        fruit = initializeFruit(snakeMap, snake, population);
    } else {
        // Create a snake and a fruit for manual play
        snake = new Snake(snakeMap, startDirection = "up", initialLength = 3, speed = 50);
        fruit = new Fruit(snakeMap, snake);
    }
}

// Start the game when the Play button is clicked
document.getElementById("playButton").addEventListener("click", function() {
    gameRunning = true;
    generation = 1;
    initializeGame(); // Initialize game elements
    requestAnimationFrame(animate);  // Start animation loop
    //document.getElementById("menu").style.display = "none"; // Hide menu
});

// animate loop
function animate(time) {
    // If the game is not running, stop the animation loop
    if (!gameRunning) return;

    // Clear the canvas before drawing (to prevent overlapping)
    snakeCtx.clearRect(0, 0, snakeCanvas.width, snakeCanvas.height);

    if (play_method == "AI") {
        snakeMap.draw(snakeCtx);
        let allSnakesCollided = snake.every(s => s.collide);
        if (allSnakesCollided) {
            generation += 1;
            snake = nextGeneration(snake, survived_population, selection_pool, mutation_rate, population)
            snakeMap.reInitialize();
            for(let i = 0; i < population; i++){
                snake[i].reInitialize();
                fruit = initializeFruit(snakeMap, snake, population)
            }
        } else {
            for (let i = 0; i < population; i++) {
                fruit[i].update(snakeMap, snake[i]);
                if(!snake[i].collide){
                    snake[i].update(snakeCtx, snakeMap, fruit[i]);
                    fruit[i].draw(snakeCtx, mapPixelSize);
                }
            }
            snakeMap.draw(snakeCtx);
        }

        // Calculate highest score
        let highestScore = Math.max(...snake.map(s => s.score));
        
        // Draw the information on the canvas
        drawText(snakeCtx, highestScore, time, generation, snake[0].survivalTime);
    } else {   
        if (snake.collide) {
            gameOver();
        } else {
            // Update objects on the map for manual play
            fruit.update(snakeMap, snake);
            snake.update(snakeCtx, snakeMap, fruit);
            snakeMap.draw(snakeCtx);
            fruit.draw(snakeCtx, mapPixelSize);
        }

        // Draw the information on the canvas for manual play
        drawText(snakeCtx, snake.score, time, generation, snake.survivalTime);
    }

    requestAnimationFrame(animate);
}

// Function to draw text on the canvas
function drawText(ctx, score, time, generation, survivalTime) {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    // Draw the information
    ctx.fillText("Time: " + Math.floor(time) / 1000 + "s", 10, 10);
    ctx.fillText("Current Score: " + score, 10, 30);
    ctx.fillText("Generation: " + generation, 10, 50);
    ctx.fillText("Survival Time: " + Math.floor(survivalTime) / 1000 + "s", 10, 70);
}

// Function to handle the game over state
function gameOver() {
    gameRunning = false;  // Stop the game loop
    document.getElementById("menu").style.display = "block"; // Show game over screen
}

// Restart the game when the "Restart" button is clicked
document.getElementById("restartButton").addEventListener("click", function() {
    document.getElementById("gameOverMenu").style.display = "none";  // Hide game over menu
    generation = 1;  // Reset generation
    population = 100;
    survived_population = 0.02;
    selection_pool = 0.10;
    mutation_rate = 0.05;
    play_method = "Manual";  // or "AI" based on preference
    gameRunning = true;  // Start the game
    initializeGame();  // Initialize the game elements
    requestAnimationFrame(animate);  // Restart animation loop
});

// Optional: Button to change play method (Manual vs AI)
document.getElementById("playMethodButton").addEventListener("click", function() {
    this.innerHTML = "Switch to " + play_method;
    play_method = (play_method === "Manual") ? "AI" : "Manual";
});
