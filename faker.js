const {faker} = require('@faker-js/faker');
const axios = require('axios');

faker.seed(123);

// Generate fake data for an author
function generateAuthor() {
    return {
        name: faker.person.fullName(),
        country: faker.location.country(),
    };
}

// Generate fake data for a book
function generateBook() {
    return {
        title: faker.lorem.words(),
        authors:Array(random(1,5)).fill().map(generateAuthor), // Example of generating a random number of authors
        publishingYear: random(1900, 2021),
        genres: [faker.music.genre(), faker.music.genre(), faker.music.genre()], // Example of generating three random genres
        quantity:random(1,100),
        price: faker.commerce.price({ min: 10, max: 1000 }) // Example price range between $10 and $1000
        
    };
}

// Example usage:
console.log("Generated Author:", generateAuthor());
console.log("Generated Book:", generateBook());

function createAuthor() {
    return axios({
        method: 'post',
        url: 'http://localhost:3000/api/authors',
        data: generateAuthor(),
    });
}
function createBook() {
    return axios({
        method: 'post',
        url: 'http://localhost:3000/api/books',
        data: generateBook(),
    });
}

function random(min,max){
    return Math.floor(Math.random() * (max - min)) + min;
}
