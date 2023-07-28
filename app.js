/* eslint-disable indent */
'use strict';

// Load the product data from localStorage or initialize it with default products
const products = load();

// Get elements from the DOM
const image1Element = document.getElementById('image1');
const image2Element = document.getElementById('image2');
const image3Element = document.getElementById('image3');
const productContainer = document.getElementById('product-container');
const chartCanvas = document.getElementById('myChart');
const chartButton = document.getElementById('view-results');
const chartContainer = document.getElementById('chart-container');

// Variables to keep track of state and counts
let randomIndex = [];
let roundCount = 0;
const maxRounds = 25;
let buttonClicked = false;

// Product Constructor Function
function Product(name, src) {
    this.name = name;
    this.src = src;
    this.timesClicked = 0;
    this.timesSeen = 0;
}

// Function to display random products in the DOM
displayRandomProducts();
function displayRandomProducts() {
    roundCount++;

    // Generate three random non-repeating product indices
    let randomProductIndex1 = Math.floor(Math.random() * products.length);
    let randomProductIndex2 = Math.floor(Math.random() * products.length);
    let randomProductIndex3 = Math.floor(Math.random() * products.length);

    while (randomIndex.includes(randomProductIndex1)) {
        randomProductIndex1 = Math.floor(Math.random() * products.length);
    }

    while (randomIndex.includes(randomProductIndex2) || randomProductIndex2 === randomProductIndex1) {
        randomProductIndex2 = Math.floor(Math.random() * products.length);
    }

    while (randomIndex.includes(randomProductIndex3) || randomProductIndex3 === randomProductIndex1 || randomProductIndex3 === randomProductIndex2) {
        randomProductIndex3 = Math.floor(Math.random() * products.length);
    }

    // Update the randomIndex array to avoid duplicates in the same round
    randomIndex[0] = randomProductIndex1;
    randomIndex[1] = randomProductIndex2;
    randomIndex[2] = randomProductIndex3;

    // Display the randomly selected products
    image1Element.src = products[randomProductIndex1].src;
    image1Element.alt = products[randomProductIndex1].name;
    image2Element.src = products[randomProductIndex2].src;
    image2Element.alt = products[randomProductIndex2].name;
    image3Element.src = products[randomProductIndex3].src;
    image3Element.alt = products[randomProductIndex3].name;

    // Update the timesSeen count for the displayed products
    products[randomProductIndex1].timesSeen++;
    products[randomProductIndex2].timesSeen++;
    products[randomProductIndex3].timesSeen++;
}

// Event handler for when a product is clicked
function handleProductClicks(event) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].name === event.target.alt) {
            products[i].timesClicked++;
        }
    }
    console.log(products);

    // Check if the maximum number of rounds is reached
    if (roundCount >= maxRounds) {
        alert('The session is over. Click the button to view the results.');
        // Remove the click event listener and add a new one for the results button
        productContainer.removeEventListener('click', handleProductClicks);
        chartButton.addEventListener('click', viewResults);
    } else {
        // Continue to the next round
        displayRandomProducts();
        save(); // Save the click tracking data into localStorage
    }
}

// Event handler to view the results
function viewResults() {
    if (!buttonClicked) {
        chartContainer.classList.add('chart-with-border');
        createProductChart();
    }
    buttonClicked = true;
}

// Function to create and display the product click chart using Chart.js
function createProductChart() {
    const totalProductClicks = [];
    const totalProductViews = [];
    const productNames = [];

    // Prepare data for the chart
    for (let i = 0; i < products.length; i++) {
        let currentProduct = products[i];
        productNames.push(currentProduct.name);
        totalProductClicks.push(currentProduct.timesClicked);
        totalProductViews.push(currentProduct.timesSeen);
    }

    // Create the chart using Chart.js
    return new Chart(chartCanvas, {
        type: 'bar',
        data: {
            labels: productNames,
            datasets: [{
                label: 'Times Seen',
                data: totalProductViews,
                borderWidth: 1,
                backgroundColor: '#898121', // Change this color as needed
            }, {
                label: 'Times Clicked',
                data: totalProductClicks,
                borderWidth: 1,
                backgroundColor: '#E7B10A', // Change this color as needed
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: 10
                }
            }
        }
    });
}

// Event listener for product clicks
productContainer.addEventListener('click', handleProductClicks);

// Function to save the click tracking data into localStorage
function save() {
    let valuesToStore = JSON.stringify(products);
    localStorage.setItem('chartData', valuesToStore);
    console.log(localStorage.chartData);
}

// Function to load product data from localStorage or use default data
function load() {
    let rawData = localStorage.getItem('chartData');
    let chartObject = JSON.parse(rawData);
    // If no data is available, return default product data
    if (!chartObject) {
        return [
          new Product('bag', 'img/bag.jpg'),
          new Product('banana', 'img/banana.jpg'),
          new Product('bathroom', 'img/bathroom.jpg'),
          new Product('boots', 'img/boots.jpg'),
          new Product('breakfast', 'img/breakfast.jpg'),
          new Product('bubblegum', 'img/bubblegum.jpg'),
          new Product('chair', 'img/chair.jpg'),
          new Product('cthulhu', 'img/cthulhu.jpg'),
          new Product('dog-duck', 'img/dog-duck.jpg'),
          new Product('dragon', 'img/dragon.jpg'),
          new Product('pen', 'img/pen.jpg'),
          new Product('pet-sweep', 'img/pet-sweep.jpg'),
          new Product('scissors', 'img/scissors.jpg'),
          new Product('shark', 'img/shark.jpg'),
          new Product('sweep', 'img/sweep.png'),
          new Product('tauntaun', 'img/tauntaun.jpg'),
          new Product('unicorn', 'img/unicorn.jpg'),
          new Product('water-can', 'img/water-can.jpg'),
          new Product('wine-glass', 'img/wine-glass.jpg')
        ];
    }
    return chartObject;
}
