const express = require('express'); //import express

const morgan = require('morgan'); // import morgan

const fs = require('fs'); //import built-in fs and path
const path = require('path');

const app = express(); //turns into a instance of express
// const http = require('http'); //http built-in module
// const url = require('url'); //url built-in module

// eslint-disable-next-line no-undef
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags:'a'});


let top10Movies = [ //adicionar FILMES aqui
    {
        title: 'A Trip to the Moon',
        author: 'Georges Melies',
        year: '1902'
    },
    {
        title:'Meshes of the Afternoon',
        author: 'Maya Deren Alexandr Hackenschmied',
        year: '1943'
    },
    {
        title: 'The Great Train Robbery',
        author: 'Edwin S. Porter',
        year: '1903'
    },
    {
        title: 'Un Chien Andalou',
        author: 'Luis Bunuel',
        year: '1929'
    },
    {
        title: 'Night and Fog',
        author: 'Alain Resnais',
        year: '1956'
    },
    {
        title: 'Scorpio Rising',
        author: 'Kenneth Anger',
        year: '1963'
    },
    {
        title: 'Wavelength',
        author: 'Michael Snow',
        year: '1967'
    },
    {
        title: 'The House Is Black',
        author: 'Forough Farrokhzad',
        year: '1963'
    },
    {
        title: 'A Day in the Country',
        author: 'Jean Renoir',
        year: '1946'
    },
    {
        title: 'La Jetee',
        author: 'Chris Marker',
        year: '1962'
    }
];

/* The console log the URL of every request that comes into 
the server function myLogger below) and also request a new function
 to print responses including timestamp of the request.
let myLogger = (req, res, next) => {
    console.log(red.url);
    next();
};
let requestTime = (req, res, next) => {
    req.requestTime = Date.now();
    next()
}
app.use(myLogger);
app.use(requestTime);
app.get('/', (req, res) => {
    let responseText = 'Welcome to my app!';
    responseText += '<small>Requested at: ' + req.requestTime + '</small>';
    res.send(responseText);
  });
  app.get('/secreturl', (req, res) => {
    let responseText = 'This is a secret url with super top-secret content.';
    responseText += '<small>Requested at: ' + req.requestTime + '</small>';
    res.send(responseText);
  }); */

// Morgan setup the logger
// Static automatically routes all requests for static files to their corresponding files within a certain folder 
app.use(morgan('common', {stream: accessLogStream}));
app.use(express.static('public'));

//GET Requests - structure: app.method(path, handler)
// app is the express instance, Method refer to HTTP request method, request - path oh the server(endpoint)
app.get('/', (req, res) => {
    res.send('Welcome to my short movies club - SMClub!'); //logic goes here to send response in each get
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', {root: __dirname});
});

app.get('/movies', (req, res) => {
res.json(top10Movies);
});

//Error-handling middleware should always be defined last in a chain of middleware, 
//after all other instances of app.use() and route calls (e.g., after app.get(), app.post(), etc.) but before app.listen()

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

//Listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port8080.');
});


// http.createServer((request, response) => {
//   let requestURL = url.parse(request.url, true);
//   if ( requestURL.pathname == '/documentation.html') {
//     response.writeHead(200, {'Content-Type': 'text/plain'});
//     response.end('Documentation on the bookclub API.\n');
//   } else {
//     response.writeHead(200, {'Content-Type': 'text/plain'});
//     response.end('Welcome to my book club!\n');
//   }

// }).listen(8080);

// console.log('My first Node test server is running on Port 8080.');