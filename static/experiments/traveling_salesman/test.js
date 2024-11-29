var genetic_bool = false; // Initial value of the variable
const button_genetic = document.getElementById("genetic-algorithm"); // Assume you have a button with this id

// Add event listener for the button click
button_genetic.addEventListener("click", (e) => {
    genetic_bool = true;  // Change genetic_bool to true when the button is clicked
    console.log("Button clicked! genetic_bool:", genetic_bool); // Log when the button is clicked
});

// Animation loop using requestAnimationFrame
function animate() {
    // Example of what happens during each animation frame
    if (genetic_bool) {
        console.log("Animation frame: genetic_bool is true");
    } else {
        console.log("Animation frame: genetic_bool is false");
    }
    
    // Request the next frame
    requestAnimationFrame(animate);
}

// Start the animation loop
requestAnimationFrame(animate);
