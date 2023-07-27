/* eslint-disable indent */
'use strict';

const products = load();
const image1Element = document.getElementById('image1');
const image2Element = document.getElementById('image2');
const image3Element = document.getElementById('image3');
const productContainer = document.getElementById('product-container');
const chartCanvas = document.getElementById('myChart');
const chartButton = document.getElementById('view-results');
const chartContainer = document.getElementById('chart-container');

let randomIndex = [];
let roundCount = 0;
const maxRounds = 25;
let buttonClicked = false;

function Product(name, src) {
    this.name = name;
    this.src = src;
    this.timesClicked = 0;
    this.timesSeen = 0;
    // products.push(this);
  }


displayRandomProducts();
// console.log(products);
function displayRandomProducts() {
    roundCount++;

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

    randomIndex[0] = randomProductIndex1;
    randomIndex[1] = randomProductIndex2;
    randomIndex[2] = randomProductIndex3;

    // console.log(randomIndex);

    image1Element.src = products[randomProductIndex1].src;
    image1Element.alt = products[randomProductIndex1].name;
    image2Element.src = products[randomProductIndex2].src;
    image2Element.alt = products[randomProductIndex2].name;
    image3Element.src = products[randomProductIndex3].src;
    image3Element.alt = products[randomProductIndex3].name;
    products[randomProductIndex1].timesSeen++;
    products[randomProductIndex2].timesSeen++;
    products[randomProductIndex3].timesSeen++;
}

function handleProductClicks(event) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].name === event.target.alt) {
            products[i].timesClicked++;
        }
    }
    console.log(products);

    if (roundCount >= maxRounds) {
        alert('The session is over. Click the button to view the results.');
        productContainer.removeEventListener('click', handleProductClicks);
        chartButton.addEventListener('click', viewResults);
    } else {
    displayRandomProducts();
    save();
    }
}

function viewResults() {
    if (!buttonClicked) {
        chartContainer.classList.add('chart-with-border');
        createProductChart();
    }
    buttonClicked = true;
}

function createProductChart() {
    const totalProductClicks = [];
    const totalProductViews = [];
    const productNames = [];

    for (let i = 0; i < products.length; i++) {
      let currentProduct = products[i];
      productNames.push(currentProduct.name);
      totalProductClicks.push(currentProduct.timesClicked);
      totalProductViews.push(currentProduct.timesSeen);
    }
    // console.log(totalProductViews);
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

productContainer.addEventListener('click', handleProductClicks);

// set all click tracking data into localStorage
function save() {
    let valuesToStore = JSON.stringify(products);
    localStorage.setItem('chartData', valuesToStore);
    console.log(localStorage.chartData);
}

function load() {
    let rawData = localStorage.getItem('chartData');
    let chartObject = JSON.parse(rawData);
    // if we need Contructor functionality -> loop and recreate our Goat Objects;
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
