/* eslint-disable indent */
'use strict';

const products = [];
const image1Element = document.getElementById('image1');
const image2Element = document.getElementById('image2');
const image3Element = document.getElementById('image3');
const productContainer = document.getElementById('product-container');
const resultsElement = document.getElementById('results');

let roundCount = 0;
const maxRounds = 3;
let buttonClicked = false;

function Product(name, src) {
    this.name = name;
    this.src = src;
    this.timesClicked = 0;
    this.timesSeen = 0;
    products.push(this);
  }

new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/pet-sweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.png');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');

displayRandomProducts();
console.log(products);



function displayRandomProducts() {
    roundCount++;

    let randomProductIndex1 = Math.floor(Math.random() * products.length);
    let randomProductIndex2 = Math.floor(Math.random() * products.length);
    let randomProductIndex3 = Math.floor(Math.random() * products.length);

    // function uniqueProduct(productImage) {
    //     while (productImage === products[randomProductIndex1].name || productImage === products[randomProductIndex2].name || productImage === products[randomProductIndex3].name){
    //     let randomIndex = 0;
    //     randomIndex = Math.floor(Math.random() * products.length);
    //     return randomIndex;
    //     }
    // }

    // randomProductIndex1 = uniqueProduct(image1Element.alt);
    // randomProductIndex2 = uniqueProduct(image2Element.alt);
    // randomProductIndex3 = uniqueProduct(image3Element.alt);


    while (image1Element.alt === products[randomProductIndex1].name || image1Element.alt === products[randomProductIndex2].name || image1Element.alt === products[randomProductIndex3].name) {
        randomProductIndex1 = Math.floor(Math.random() * products.length);
    }

    while (image2Element.alt === products[randomProductIndex1].name || image2Element.alt === products[randomProductIndex2].name || image2Element.alt === products[randomProductIndex3].name) {
        randomProductIndex1 = Math.floor(Math.random() * products.length);
    }

    while (image3Element.alt === products[randomProductIndex1].name || image3Element.alt === products[randomProductIndex2].name || image3Element.alt === products[randomProductIndex3].name) {
        randomProductIndex1 = Math.floor(Math.random() * products.length);
    }

    while(randomProductIndex1 === randomProductIndex2 || randomProductIndex1 === randomProductIndex3 || randomProductIndex2 === randomProductIndex3) {
        randomProductIndex2 = Math.floor(Math.random() * products.length);
        randomProductIndex3 = Math.floor(Math.random() * products.length);
    }

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
        resultsElement.addEventListener('click', viewResults);
    } else {
    displayRandomProducts();
    }
}

function viewResults() {
    if (!buttonClicked) {
        let listElement = document.createElement('ul');

        for (let i = 0; i < products.length; i++) {
            createHTML('li', products[i].name + ' had ' + products[i].timesClicked + ' votes, and was seen ' + products[i].timesSeen + ' times', listElement);
        }
        resultsElement.appendChild(listElement);
    }

    buttonClicked = true;
}

function createHTML(elementToCreate, contentToAdd, elementToAddTo) {
    let element = document.createElement(elementToCreate);
    element.textContent += contentToAdd;
    elementToAddTo.appendChild(element);
}

productContainer.addEventListener('click', handleProductClicks);




