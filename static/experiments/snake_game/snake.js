class Snake {
    constructor(snakeMap, startDirection = "up", initialLength = 3, speed = 4, controlType = "Manual", layer = []) {
        // Store basic parameters in snake
        this.indent = 3;
        this.startX = Math.floor(snakeMap.mapWidth / 2);
        this.startY = Math.floor(snakeMap.mapHeight / 2);
        this.startDirection = startDirection;
        this.initialLength = initialLength;
        this.controlType = controlType;

        // Define basic functionalities of snake
        this.delay = 400 / speed;
        this.timeToEat = 0;
        this.eat = false;
        this.collide = false;
        this.body = [];
        this.directions = [true, false, false, false]; // up, down, left, right
        this.#initialize(snakeMap);

        // Values for fitness function
        this.score = 0;
        this.survivalTime = 0;
        this.maxHungerTime = 200 * this.delay;

        // Attach objects for more functionalities
        switch (this.controlType) {
            case "Manual":
                this.controls = new Controls(this);
                break;
            case "AI":
                this.sensor = new Sensor();
                // Check if layers were passed (i.e., we are cloning an existing snake or creating a new one)
                if (layer.input) {
                    this.network = layer.clone_network();
                } else {
                    this.input = layer[0];
                    this.hidden = layer.slice(1, layer.length - 1);
                    this.output = layer[layer.length - 1];

                    this.network = new MLP(this.input, this.hidden, this.output);
                }
                break;
        }

        this.proximityToApple = 0;
    }

    // Fitness function to track both score and survival time, applying decay for time without eating
    get fitness() {
        // The fitness function is a combination of:
        // - Score (points from eating food)
        // - Survival time (how long it survived)
        // - Penalty for long periods without eating (decay factor)
        // - Penalty for collisions (self-collision or wall)
        // - Penalty for inefficient movements (wasting time without progress)
    
        let timeDecay = Math.max(0, this.survivalTime - this.timeToEat); // Penalize time spent without eating
        let decayFactor = 0.1; // A small penalty for time decay
    
        let fitnessScore = this.score * 10; // Reward for eating (multiplied for emphasis)
        fitnessScore += this.survivalTime - timeDecay * decayFactor; // Add survival time, but penalize long periods without eating
        
        if (this.collide) {
            fitnessScore -= 50; // Heavy penalty for collision (self or wall)
        }
    
        // **New Penalty for inefficient movement (no meaningful progress)**
        let movementPenalty = 0;
        if (this.timeToEat > 200) { // If no fruit has been eaten for a long period
            movementPenalty = 0.5 * (this.survivalTime - this.timeToEat); // Penalize based on how long it's been without eating
        }
    
        fitnessScore -= movementPenalty;
    
        // **Encourage goal-directed movement**: If the snake hasn't eaten in a while, it's penalized more
        if (this.timeToEat > 400) { // After 400 ticks without eating, impose a higher penalty
            fitnessScore -= 10;
        }
    
        // Ensure we don't give negative fitness (we can clamp it if needed)
        fitnessScore = Math.max(fitnessScore, 0);
    
        return fitnessScore;
    }
    

    // Function called in animation loop to update the snake
    update(ctx, snakeMap, fruit) {
        if (!this.collide) {
            this.survivalTime += 1;
            switch (this.controlType) {
                case "Manual":
                    break;
                case "AI":
                    this.sensor.update(snakeMap, this, fruit);
                    let output = this.network.forward(this.sensor.rays);
                    // Find the index of the largest value in the output array
                    let maxIndex = output.indexOf(Math.max(...output));
                    // Convert to True/False array where True is at the maxIndex, and all other values are False
                    this.directions = output.map((value, index) => index === maxIndex);
                    break;
            }
            this.#move(snakeMap);
            this.#eatDetection(fruit);
        }
        this.#draw(ctx, snakeMap.pixelSize);
    }

    // Eat detection logic
    #eatDetection(fruit) {
        let x = this.body[0].x;
        let y = this.body[0].y;

        if (fruit.x == x && fruit.y == y) {
            this.eat = true;
            this.score += 1; // Increase score when eating
            fruit.eaten = true;
            this.timeToEat = 0; // Reset the hunger timer after eating
        }
    }

    // Function to move the snake
    #move(snakeMap) {
        // Only move after the delay (simulating the snake's speed)
        if (this.survivalTime % this.delay == 0) {
            this.timeToEat += 1;
            let x = this.body[0].x;
            let y = this.body[0].y;
            let nextPos;

            // Determine new position according to the move direction
            if (this.directions[0]) {
                nextPos = { x: x, y: y - 1 };
            }
            if (this.directions[1]) {
                nextPos = { x: x, y: y + 1 };
            }
            if (this.directions[2]) {
                nextPos = { x: x - 1, y: y };
            }
            if (this.directions[3]) {
                nextPos = { x: x + 1, y: y };
            }

            this.#detectCollision(snakeMap, nextPos);

            if (!this.collide) {
                // Update snakeMap
                snakeMap.position[(nextPos.y * snakeMap.mapWidth + nextPos.x)].occupancy = "snake";            

                // Add the next position
                this.body.unshift(nextPos);
                // Remove the last array element if nothing was eaten
                if (this.eat) {
                    this.eat = false;
                } else {
                    snakeMap.position[(this.body[this.body.length - 1].y * snakeMap.mapWidth + this.body[this.body.length - 1].x)].occupancy = "none"; 
                    this.body.pop();
                }
            } else {
                this.score -= 5; // Heavy penalty for collision
            }
        }
    }

    // Detect collision with walls or itself
    #detectCollision(snakeMap, nextPos) {
        let head = nextPos;

        let maxX = snakeMap.mapWidth - 1;
        let maxY = snakeMap.mapHeight - 1;

        // Collision with wall
        if (head.x < 0 || head.x > maxX || head.y < 0 || head.y > maxY) {
            this.collide = true;
        }

        // Collision with itself
        for (let i = 1; i < this.body.length; i++) {
            if (head.x == this.body[i].x && head.y == this.body[i].y) {
                this.collide = true;
            }
        }

        // Die of hunger (penalty for not eating for a while)
        if ((this.score + 1) * this.maxHungerTime < this.survivalTime) {
            this.collide = true;
        }
    }

    // Function that draws the snake
    #draw(ctx, pixelSize) {
        for (let i = 0; i < this.body.length; i++) {
            ctx.strokeStyle = (i == 0) ? "Green" : "White";
            ctx.fillStyle = (i == 0) ? "Green" : "White";

            let x = this.body[i].x;
            let y = this.body[i].y;
            let p = pixelSize;

            ctx.beginPath();
            ctx.globalAlpha = 0.3;
            ctx.fillRect(x * p + 3, y * p + 3, p - 6, p - 6);
            ctx.globalAlpha = 1.0;
            ctx.stroke();
        }
    }

    // When the game first starts, initialize the snake on the map
    #initialize(snakeMap) {
        // Define the snake positions
        for (let i = 0; i < this.initialLength; i++) {
            let bodyPosition = { x: this.startX, y: this.startY + i };
            snakeMap.position[((this.startY + i) * snakeMap.mapWidth + this.startX)].occupancy = "snake";
            this.body.push(bodyPosition);
        }
    }

    // Reset snake to its initial state
    reInitialize() {
        // Reset values
        this.eat = false;
        this.collide = false;
        this.body = [];
        this.timeToEat = 0;
        this.#initialize(snakeMap);
        this.directions = [true, false, false, false]; // up, down, left, right

        // Attach objects for more functionalities
        switch (this.controlType) {
            case "Manual":
                this.controls = new Controls(this);
                break;
            case "AI":
                this.sensor = new Sensor();
                //this.network = new MLP(this.input, this.hidden, this.output);
                break;
        }

        // Values for fitness function
        this.score = 0;
        this.survivalTime = 0;
    }
}
