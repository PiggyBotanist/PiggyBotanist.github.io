run_button.addEventListener("click", (e) => {
    lockInput = true;
});

pause_button.addEventListener("click", (e) => {
    lockInput = false;
});

reset_button.addEventListener("click", (e) => {
    lockInput = false;
    ctx.clearRect(0, 0, this.mapWidth, this.mapHeight);
    generation = 0;
    map.draw_nodes(ctx, nodes);
});

input_arrangement.addEventListener('change', function(event) {
    if(!lockInput){
        arrangement = event.target.value;
        nodes = map.generateNodes(ctx, nodes_count, arrangement);
    }
});

input_nodes.addEventListener('input', function(event) {
    if(!lockInput){
        nodes_count = parseInt(event.target.value);
        nodes = map.generateNodes(ctx, nodes_count, arrangement);
    }
});
input_populationSize.addEventListener('input', function(event) {
    if(!lockInput){
        population_size = parseInt(event.target.value);
    }
});
input_generations.addEventListener('input', function(event) {
    if(!lockInput){
        max_iteration = parseInt(event.target.value);
    }
});
input_mutationRate.addEventListener('input', function(event) {
    if(!lockInput){
        mutation_rate = parseFloat(event.target.value, 10);
    }
});

/*
input_nodes.addEventListener('input', function(event) {
    let input = parseInt(event.target.value, 10);
    let max = parseInt(event.target.max, 10);
    let min = parseInt(event.target.min, 10);
    if(input > max){
        nodes_count = max;
    } else if (input < min){
        nodes_count = min;
    } else{
        nodes_count = input;
    }
    event.target.value = nodes_count;
    nodes = map.generateNodes(ctx, nodes_count, arrangement);
});
input_populationSize.addEventListener('input', function(event) {
    let input = parseInt(event.target.value, 10);
    let max = parseInt(event.target.max, 10);
    let min = parseInt(event.target.min, 10);
    if(input > max){
        population_size = max;
    } else if (input < min || ){
        population_size = min;
    } else{
        population_size = input;
    }
    event.target.value = population_size;
});
input_generations.addEventListener('input', function(event) {
    let input = parseInt(event.target.value, 10);
    let max = parseInt(event.target.max, 10);
    let min = parseInt(event.target.min, 10);
    if(input > max){
        generations = max;
    } else if (input < min){
        generations = min;
    } else{
        generations = input;
    }
    event.target.value = generations;
});
input_mutationRate.addEventListener('input', function(event) {
    let input = parseFloat(event.target.value, 10);
    let max = parseFloat(event.target.max, 10);
    let min = parseFloat(event.target.min, 10);
    if(input > max){
        mutation_rate = max;
    } else if (input < min){
        mutation_rate = min;
    } else{
        mutation_rate = input;
    }
    event.target.value = mutation_rate;

    mutation_rate = parseFloat(event.target.value, 10);
});
*/