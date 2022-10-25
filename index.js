const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags:'a'});

let top10Movies = [
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

app.use(morgan('common', {stream: accessLogStream}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Welcome to my short movies club - SMClub!'); 
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', {root: __dirname});
});

app.get('/movies', (req, res) => {
res.json(top10Movies);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

app.listen(8080, () => {
    console.log('Your app is listening on port8080.');
});