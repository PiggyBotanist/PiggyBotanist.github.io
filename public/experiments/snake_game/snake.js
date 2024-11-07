class Snake{
    constructor(snakeMap, startDirection = "up", initialLength = 3, speed = 4, controlType = "Manual", layer = []){
        // Store basic parameters in snake
        this.indent = 3;
        this.startX = Math.floor(snakeMap.mapWidth/2);
        this.startY = Math.floor(snakeMap.mapHeight/2);
        this.startDirection = startDirection;
        this.initialLength = initialLength;
        this.controlType = controlType;

        // Define basic functionalities of snake
        this.delay = 400/speed;
        this.timeToEat = 0;
        this.eat = false;
        this.collide = false;
        this.body = [];
        this.directions = [true, false, false, false];     //up, down, left, right
        this.#initialize(snakeMap);

        // values for fitness function
        this.score = 0;
        this.survivalTime = 0;
        this.maxHungerTime = 200*this.delay;


        // Attach objects for more functionalities
        switch(this.controlType){
            case "Manual":
                this.controls = new Controls(this);
                break;
            case "AI":
                //neural network parameter
                this.input = layer[0]
                this.hidden = layer.slice(1, layer.length - 1)
                this.output = layer[layer.length - 1]

                this.sensor = new Sensor();
                this.network = new MLP(this.input, this.hidden, this.output);

                break;
        }

        this.proximityToApple = 0;
    }

    // Function called in animation loop to update the snake
    update(ctx, snakeMap, fruit){
        if(!this.collide){
            this.survivalTime +=1;
            switch(this.controlType){
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

    // When the game first starts, initialize the snake on the map
    #initialize(snakeMap){
        // Define the snake positions
        for(let i = 0; i < this.initialLength; i++){
            let bodyPosition = {x: this.startX, y: this.startY + i};
            snakeMap.position[((this.startY + i)*snakeMap.mapWidth + this.startX)].occupancy = "snake";
            this.body.push(bodyPosition);
        }
    }

    reInitialize(){
        // Reset values
        this.eat = false;
        this.collide = false;
        this.body = [];
        this.timeToEat = 0;
        this.#initialize(snakeMap);
        this.directions = [true, false, false, false];     //up, down, left, right

        // Attach objects for more functionalities
        switch(this.controlType){
            case "Manual":
                this.controls = new Controls(this);
                break;
            case "AI":
                this.sensor = new Sensor();
                //this.network = new MLP(this.input, this.hidden, this.output);
                break;
                }
        
        // values for fitness function
        this.score = 0;
        this.survivalTime = 0;
    }

    #eatDetection(fruit){
        let x = this.body[0].x;
        let y = this.body[0].y;
 
        if(fruit.x == x && fruit.y == y){
            this.eat = true;
            this.score += 1;
            console.log(this.score);
            fruit.eaten = true;
            this.timeToEat = 0;
        }
    }  

    #move(snakeMap){
        // For the purpose of 
        // Update the snake after certain delay
        if (this.survivalTime%this.delay == 0){
            this.timeToEat += 1;
            let x = this.body[0].x;
            let y = this.body[0].y;
            let nextPos;
    
            // Determine new position according to move direction
            if(this.directions[0]){
                nextPos = {x: x, y: y - 1};
            }
            if(this.directions[1]){
                nextPos = {x: x, y: y + 1};
            }
            if(this.directions[2]){
                nextPos = {x: x - 1, y: y};
            }
            if(this.directions[3]){
                nextPos = {x: x + 1, y: y};
            }

            this.#detectCollision(snakeMap, nextPos);

            if(!this.collide){
                //Update snakeMap
                snakeMap.position[(nextPos.y*snakeMap.mapWidth + nextPos.x)].occupancy = "snake";            

                // Add the next position
                this.body.unshift(nextPos);
                // remove the last array if nothing was eaten
                if(this.eat){
                    this.eat = false;
                } else {
                    snakeMap.position[(this.body[this.body.length -1].y*snakeMap.mapWidth + this.body[this.body.length -1].x)].occupancy = "none"; 
                    this.body.pop();
                }
            } else {
                this.score -= 5;
            }
        }
    }

    #detectCollision(snakeMap, nextPos){
        let head = nextPos;

        let maxX = snakeMap.mapWidth -1;
        let maxY = snakeMap.mapHeight -1;

        // collision with wall
        if(head.x < 0 || head.x > maxX || head.y < 0 || head.y > maxY){
            this.collide = true;
        }

        // collision with itself
        for(let i = 1; i < this.body.length; i++){
            if(head.x == this.body[i].x && head.y == this.body[i].y){
                this.collide = true;
            }
        }

        // die of hunger
        if((this.score + 1) * this.maxHungerTime < this.survivalTime){
            this.collide = true;
        }

    }

    // Function that draws the snake
    #draw(ctx, pixelSize){
        for(let i = 0; i < this.body.length; i++){
            ctx.strokeStyle = (i == 0) ? "Green" : "White";
            ctx.fillStyle = (i == 0) ? "Green" : "White";

            let x = this.body[i].x;
            let y = this.body[i].y;
            let p = pixelSize;

            ctx.beginPath();
            //ctx.globalAlpha = 0.3;
            ctx.fillRect(x*p + 3, y*p + 3, p - 6,p - 6);
            ctx.globalAlpha = 1.0;
            ctx.stroke();
        }
    }
}