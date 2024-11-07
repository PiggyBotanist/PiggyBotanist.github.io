---
date: '2024-10-30T15:23:24-04:00'
draft: false
title: 'Snake Game'
bookCollapseSection: false
weight: 20
---

# The Classic Snake Game:

---

# Instructions

To start the game, click on the **Play** button. You can switch between **Manual Mode** and **AI Mode** by clicking the **Switch to AI** button. In **Manual Mode**, use the arrow keys to control the snake. In **AI Mode**, the snake's behavior is determined by the algorithm, and it will evolve over time.

After the game ends, you can restart by clicking the **Restart** button.

Enjoy the game and have fun playing the **Hungry Snake** game!

### **How to Play**:
1. **Start the Game**: Click on the "Play" button to begin the game. 
2. **Switch Play Method**: Click on the "Switch to AI" button to toggle between **Manual Mode** and **AI Mode**.
3. **Controls for Manual Mode**:
- **Arrow Keys**: Use the **W**, **A**, **S**, and **D** keys to move the snake.
4. **Game Over**: If the snake collides with itself or the walls, the game will end, and you can restart by clicking the "Restart" button.
5. **Information**: The score, generation (in AI mode), and survival time are displayed on the screen.
---

<div style="text-align: center;">
    <link rel="stylesheet" href="/experiments/snake_game/style.css">
    <!-- Menu Section -->
    <div id="menu" style="text-align: center;">
        <h1>Hungry Snake</h1>
        <button id="playButton">Play</button>
        <button id="playMethodButton">Switch to AI</button>
    </div>
    <!-- Game Over Section -->
    <div id="gameOverMenu" style="text-align: center; display: none;">
        <h1>Game Over</h1>
        <button id="restartButton">Restart</button>
    </div>
    <!-- Game Canvas -->
    <canvas id="snakeCanvas"></canvas>
    <!-- Information Box (Optional) -->
    <div id="textBox"></div>
    <script src="/experiments/snake_game/map.js"></script>
    <script src="/experiments/snake_game/fruit.js"></script>
    <script src="/experiments/snake_game/snake.js"></script>
    <script src="/experiments/snake_game/controls.js"></script>
    <script src="/experiments/snake_game/mlp.js"></script>
    <script src="/experiments/snake_game/sensor.js"></script>
    <script src="/experiments/snake_game/genetic_algorithm.js"></script>
    <script src="/experiments/snake_game/main.js"></script>
</div>

Welcome to **Hungry Snake**! In this game, you control a snake that eats fruit to grow longer. However, there are some exciting features and variations that make this game unique:

### **Game Modes**:
- **Manual Mode**: Control the snake directly using your keyboard. 
- **AI Mode**: The snake is controlled by a genetic algorithm that evolves through generations.

### **AI Mode**:
In **AI Mode**, the snake is controlled by a simple **genetic algorithm** that evolves over time. The goal is to evolve a population of snakes, selecting the best performers from each generation and mutating their behavior to improve performance. This will continue until a specified number of generations have passed.

### **Game Features**:
- **Customizable Speed**: You can change the snake's speed for a different challenge.
- **Snake Growth**: Each time the snake eats a fruit, it grows longer.
- **Game Over Screen**: When the snake collides with itself or the walls, a "Game Over" screen will appear, with an option to restart the game.
- **Generations in AI Mode**: In AI Mode, the snake evolves over multiple generations using a genetic algorithm. The best performing snakes are selected to create the next generation.

### **Key Elements**:
- **Canvas**: The game is rendered on an HTML5 canvas where the snake and fruits are drawn.
- **AI Logic**: The genetic algorithm (not fully implemented yet) will drive the evolution of snakes in AI Mode.
- **Manual Control**: Players can control the snake directly in Manual Mode using keyboard input.

### **Note**:
Currently, the genetic algorithm is still a work in progress, so some features may not be fully implemented.

**Note**: The **Genetic Algorithm** feature is currently under development, so you may encounter unfinished or non-optimal behavior in the AI Mode. Stay tuned for future updates!