// Find and define canvas and define its context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Define the size of canvas in pixels
canvas.height = 1500;
canvas.width = 1500;

const button_genetic = document.getElementById("genetic-algorithm");
const button_ant_colony = document.getElementById("ant-colony-algorithm");

/*
const city_coords = [
    [1, 334.5909245845, 161.7809319139],
    [2, 397.6446634067, 262.8165330708],
    [3, 503.8741827107, 172.8741151168],
    [4, 444.0479403502, 384.6491809647],
    [5, 311.6137146746, 2.0091699828],
    [6, 662.8551011379, 549.2301263653],
    [7, 40.0979030612, 187.2375430791],
    [8, 526.8941409181, 215.7079092185],
    [9, 209.1887938487, 691.0262291948],
    [10, 683.2674131973, 414.2096286906],
    [11, 280.7494438748, 5.9206392047],
    [12, 252.7493090080, 535.7430385019],
    [13, 698.7850451923, 348.4413729766],
    [14, 678.7574678104, 410.7256424438],
    [15, 220.0041131179, 409.1225812873],
    [16, 355.1528556851, 76.3912076444],
    [17, 296.9724227786, 313.1312792361],
    [18, 504.5154071733, 240.8866564499],
    [19, 224.1079496785, 358.4872228907],
    [20, 470.6801296968, 309.6259188406],
    [21, 554.2530513223, 279.4242466521],
    [22, 567.6332684419, 352.7162027273],
    [23, 599.0532671093, 361.0948690386],
    [24, 240.5232959211, 430.6036007844],
    [25, 32.0825972787, 345.8551009775],
    [26, 91.0538736891, 148.7213270256],
    [27, 248.2179894723, 343.9528017384],
    [28, 488.8909044347, 3.6122311393],
    [29, 206.0467939820, 437.7639406167],
    [30, 575.8409415632, 141.9670960195],
    [31, 282.6089948164, 329.4183805862],
    [32, 27.6581484868, 424.7684581747],
    [33, 568.5737309870, 287.0975660546],
    [34, 269.4638933331, 295.9464636385],
    [35, 417.8004856811, 341.2596589955],
    [36, 32.1680938737, 448.8998721172],
    [37, 561.4775136009, 357.3543930067],
    [38, 342.9482167470, 492.3321423839],
    [39, 399.6752075383, 156.8435035519],
    [40, 571.7371050025, 375.7575350833],
    [41, 370.7559842751, 151.9060751898],
    [42, 509.7093253204, 435.7975189314],
    [43, 177.0206999750, 295.6044772584],
    [44, 526.1674198605, 409.4859418161],
    [45, 316.5725171854, 65.6400108214],
    [46, 469.2908100279, 281.9891445025],
    [47, 572.7630641427, 373.3208821255],
    [48, 29.5176994283, 330.0382309000],
    [49, 454.0082936692, 537.2178547659],
    [50, 416.1546762271, 227.6133100741],
    [51, 535.2514330806, 471.0648643744],
    [52, 265.4455533675, 684.9987192464],
    [53, 478.0542110167, 509.6452028741],
    [54, 370.4781203413, 332.5390063041],
    [55, 598.3479202004, 446.8693279856],
    [56, 201.1521139175, 649.0260268945],
    [57, 193.6925360026, 680.2322840744],
    [58, 448.5792598859, 532.7934059740],
    [59, 603.2853485624, 134.4006473609],
    [60, 543.0102490781, 481.5168231148],
    [61, 214.5750793346, 43.6460117543],
    [62, 426.3501451825, 61.7285415996],
    [63, 89.0447037063, 277.1158385868],
    [64, 84.4920100219, 31.8474816424],
    [65, 220.0468614154, 623.0778103080],
    [66, 688.4613313444, 0.4702312726],
    [67, 687.2857531630, 373.5346236130],
    [68, 75.4934933967, 312.9175377486],
    [69, 63.4170993511, 23.7039309674],
    [70, 97.9363495877, 211.0910930878],
    [71, 399.5255884970, 170.8221968365],
    [72, 456.3167017346, 597.1937161677],
    [73, 319.8855102422, 626.8396604886],
    [74, 295.9250894897, 664.6291554845],
    [75, 288.4868857235, 667.7284070537],
    [76, 268.3951858954, 52.9010181645],
    [77, 140.4709056068, 513.5566720960],
    [78, 689.8079027159, 167.5947003748],
    [79, 280.5784506848, 458.7533546925],
    [80, 453.3884433554, 282.9082328989],
    [81, 213.5704943432, 525.8681817779],
    [82, 133.6953004520, 677.1757808026],
    [83, 521.1658690522, 132.8617086506],
    [84, 30.2657946347, 450.0754502986],
    [85, 657.0199585283, 39.7772908299],
    [86, 6.9252241961, 23.8749241575],
    [87, 252.4286967767, 535.1659364856],
    [88, 42.8551682504, 63.8232081774],
    [89, 145.8999393902, 399.5255884970],
    [90, 638.4885715591, 62.6262558472],
    [91, 489.2756391122, 665.3131282446],
    [92, 361.2231139311, 564.2347787901],
    [93, 519.9475425732, 347.9711417040],
    [94, 129.3349741063, 435.6692740389],
    [95, 259.7172815016, 454.6495181318],
    [96, 676.3421890013, 371.0979706551],
    [97, 84.5133841706, 183.3260738572],
    [98, 77.7164048671, 354.3833863300],
    [99, 335.9802442534, 660.6321896676],
    [100, 264.3554717810, 377.5743377274],
    [101, 51.6826916855, 676.0429509187],
    [102, 692.1376849300, 543.8010925819],
    [103, 169.2191356800, 547.8194325476],
    [104, 194.0131482339, 263.4791316822],
    [105, 415.1928395332, 78.9133571973],
    [106, 415.0432204919, 479.0801701569],
    [107, 169.8389859939, 245.6103433244],
    [108, 525.0987124228, 213.5063718969],
    [109, 238.6851191283, 33.4932910965],
    [110, 116.2112467718, 363.5742702940],
    [111, 16.9283258126, 656.5711014044],
    [112, 434.3440768162, 92.6996831431],
    [113, 40.5253860363, 424.6829615797],
    [114, 530.4849979086, 183.8390534273],
    [115, 484.3595848990, 49.2460387276],
    [116, 263.6501248722, 426.5852608187],
    [117, 450.2891917862, 126.3853415784],
    [118, 441.7822805823, 299.7724362653],
    [119, 24.2169105375, 500.3474481664],
    [120, 503.7886861157, 514.6895019799],
    [121, 635.5389390312, 200.9811207275],
    [122, 614.5922732529, 418.8691931188],
    [123, 21.7161351334, 660.9741760476],
    [124, 143.8266469611, 92.6996831431],
    [125, 637.7191022040, 54.2048412384],
    [126, 566.5645610042, 199.9551615873],
    [127, 196.6849168280, 221.8209157619],
    [128, 384.9270448985, 87.4630166986],
    [129, 178.1107815614, 104.6905805938],
    [130, 403.2874386776, 205.8971749407]
];

const city_coords = [
    [1, 600, 400], 
    [2, 590.164, 477.163], 
    [3, 570.711, 551.658], 
    [4, 542.128, 613.034], 
    [5, 504.639, 659.225], 
    [6, 459.297, 690.983], 
    [7, 407.582, 707.052], 
    [8, 351.171, 707.052], 
    [9, 295.829, 690.983], 
    [10, 260.487, 659.225], 
    [11, 222.998, 613.034], 
    [12, 194.415, 551.658], 
    [13, 174.962, 477.163], 
    [14, 164.126, 400], 
    [15, 174.962, 322.837], 
    [16, 194.415, 248.342], 
    [17, 222.998, 186.966], 
    [18, 260.487, 140.775], 
    [19, 295.829, 109.017], 
    [20, 351.171, 92.948], 
    [21, 407.582, 92.948], 
    [22, 459.297, 109.017], 
    [23, 504.639, 140.775], 
    [24, 542.128, 186.966], 
    [25, 570.711, 248.342], 
    [26, 590.164, 322.837], 
    [27, 600, 400], 
    [28, 590.164, 477.163], 
    [29, 570.711, 551.658], 
    [30, 542.128, 613.034], 
    [31, 504.639, 659.225], 
    [32, 459.297, 690.983], 
    [33, 407.582, 707.052], 
    [34, 351.171, 707.052], 
    [35, 295.829, 690.983], 
    [36, 260.487, 659.225], 
    [37, 222.998, 613.034], 
    [38, 194.415, 551.658], 
    [39, 174.962, 477.163], 
    [40, 164.126, 400], 
    [41, 174.962, 322.837], 
    [42, 194.415, 248.342], 
    [43, 222.998, 186.966], 
    [44, 260.487, 140.775], 
    [45, 295.829, 109.017], 
    [46, 351.171, 92.948], 
    [47, 407.582, 92.948], 
    [48, 459.297, 109.017], 
    [49, 504.639, 140.775], 
    [50, 542.128, 186.966]
];
*/

let map = new Map(canvas.width, canvas.height);
let cities = intialize_cities(canvas, 100, 30);
//let cities = city_coords.map(coord => ({city: coord[0],x: coord[1],y: coord[2]}));
var genetic_bool = false;
var colony_bool = false;

// Parameters for genetic algorithm:
let max_iterations = 250;
let generation = 0;
let population_size = 200;
let survive_ratio = 0.02;
let mutation_rate = 0.10;
let population = initialize_population(population_size, cities);
let best_path = population[0];

// Parameters for ant colony algorithm:
let ant_population = 100;
let pheromone_evaporation_rate = 0.1;
let pheromone_concentration = 0.2;
let pheromones = initialize_pheromones(cities, pheromone_concentration);
let ant_position = initialize_ant_position(cities, ant_population);

// Add event listener for the button click
button_genetic.addEventListener("click", (e) => {
    genetic_bool = true;  // Change genetic_bool to true when the button is clicked
    colony_bool = false;
    population = initialize_population(population_size, cities);
    best_path = population[0];
    generation = 0;
});

button_ant_colony.addEventListener("click", (e) => { 
    genetic_bool = false; 
    colony_bool = true; 
    pheromones = initialize_pheromones(cities, pheromone_concentration);
    generation = 0;
});

// Variable to track the last generation update time
let lastGenerationTime = 0;
let generationDelay = 100; // Delay in milliseconds (e.g., 100 ms between generations)

function animate(time) {
    // Calculate time difference since last generation update
    const timeDifference = time - lastGenerationTime;

    // Clear the canvas before drawing (to prevent overlapping)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the map and best path
    map.draw_cities(ctx, cities);

    if (genetic_bool){
        map.draw_genetic_path(ctx, best_path);

        // Update the generation only if the delay has passed
        if (timeDifference > generationDelay && generation < max_iterations) {
            // Sort population based on their performance (lowest distance to highest distance)
            for (let i = 0; i < 5; i++) {
                sorted_population = population.sort((a, b) => a.distance - b.distance);
                best_path = sorted_population[0];
                population = natural_selection(sorted_population, survive_ratio, mutation_rate);
            }
            
            generation += 1; // Increment the generation
            lastGenerationTime = time; // Update the last update time
        }
    // Display generation and distance on canvas
    ctx.fillStyle = 'black'; // Set the text color
    ctx.font = '20px Arial'; // Set the font size and family
    ctx.fillText(`Generation: ${generation}`, 10, 30); // Draw generation at (10, 30)
    ctx.fillText(`Distance: ${best_path.distance.toFixed(2)}`, 10, 60); // Draw distance at (10, 60)
    }

    if (colony_bool) {
        // Update the pheromones and draw paths based on pheromone strength
        map.draw_pheromones(pheromones);
    
        // Update pheromone levels for ants' paths (ACO)
        if (timeDifference > generationDelay && generation < max_iterations) {
            run_iteration(ant_position, pheromones, pheromone_concentration, pheromone_evaporation_rate, cities);

            // Sort the solutions and get the best path
            //let best_solution = solutions.reduce((best, current) => {
            //    return current.distance < best.distance ? current : best;
            //}, solutions[0]);
    
            //best_path = best_solution;
            generation += 1;
            lastGenerationTime = time;
        }
    
        // Display generation and distance on canvas
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText(`Generation: ${generation}`, 10, 30);
        //ctx.fillText(`Distance: ${best_path.distance.toFixed(2)}`, 10, 60);
    }

    // Continue the animation loop
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);  // Start animation loop
