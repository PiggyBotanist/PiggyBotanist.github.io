class Controls{
    constructor(snake){
        this.#addKeyboardListeners(snake);
    }


    #addKeyboardListeners(snake){
        document.onkeydown = (event) => {
            switch (event.key) {
                case "w": // Move Up
                    snake.directions = [true, false, false, false];
                    break;
                case "s": // Move Down
                    snake.directions = [false, true, false, false];
                    break;
                case "a": // Move Left
                    snake.directions = [false, false, true, false];
                    break;
                case "d": // Move Right
                    snake.directions = [false, false, false, true];
                    break;
            }
            // Optionally log the directions for debugging
            // console.log(snake.directions);
        };
    }
}