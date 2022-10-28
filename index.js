const express = require('express'),
app = express(),
bodyParser = require('body-parser'),
uuid = require('uuid');

const morgan = require('morgan');
fs = require('fs'),
path = require('path');

app.use(bodyParser.json());
app.use(morgan('common'));

let users = [
    {
      id: 1,
      name: "Silvio",
      favoriteMovies: []
    },
    {
      id: 2,
      name: "Jaque",
      favoriteMovies: ["Nome Filme"]
    },
  ];

let movies = [
    {
        "Title": "Nome Filme", //Add TITLE
        "Description": "DESCRICAO DO FILME", //Add DESCRIPTION
        "Genre": {
          "Name": "Drama", //Add GENRE NAME
          "Description":"é um filme dratamtico" //Add Description
        },
        "Director":{
          "Name":"Luiz Pelegrin", //Add NAME
          "Bio":"", //Add BIO
          "Birth":1970, //Add BIRTH?
        },
        "ImageURL":"", //Add IMG
        "Featured": false
      },
      {
        "Title": "The Fountain",
        "Description": "",
        "Genre": {
          "Name": "Drama",
          "Description":"."
        },
        "Director":{
          "Name":"",
          "Bio":"",
          "Birth":1970,
        },
        "ImageURL":"",
        "Featured": false
      },
      {
        "Title": "Filmezim",
        "Description": "",
        "Genre": {
          "Name": "Drama",
          "Description":"."
        },
        "Director":{
          "Name":"",
          "Bio":"",
          "Birth":1970,
        },
        "ImageURL":"",
        "Featured": false
      },
      {
        "Title": "xxx",
        "Description": "",
        "Genre": {
          "Name": "Drama",
          "Description":"."
        },
        "Director":{
          "Name":"",
          "Bio":"",
          "Birth":1970,
        },
        "ImageURL":"",
        "Featured": false
      },
      {
        "Title": "xxx",
        "Description": "",
        "Genre": {
          "Name": "Drama",
          "Description":"."
        },
        "Director":{
          "Name":"",
          "Bio":"",
          "Birth":1970,
        },
        "ImageURL":"",
        "Featured": false
      },
      {
        "Title": "xxx",
        "Description": "",
        "Genre": {
          "Name": "Drama",
          "Description":"."
        },
        "Director":{
          "Name":"",
          "Bio":"",
          "Birth":1970,
        },
        "ImageURL":"",
        "Featured": false
      },
      {
        "Title": "xxx",
        "Description": "",
        "Genre": {
          "Name": "Drama",
          "Description":"."
        },
        "Director":{
          "Name":"",
          "Bio":"",
          "Birth":1970,
        },
        "ImageURL":"",
        "Featured": false
      },
      {
        "Title": "xxx",
        "Description": "",
        "Genre": {
          "Name": "Drama",
          "Description":"."
        },
        "Director":{
          "Name":"",
          "Bio":"",
          "Birth":1970,
        },
        "ImageURL":"",
        "Featured": false
      },
      {
        "Title": "xxx",
        "Description": "",
        "Genre": {
          "Name": "Drama",
          "Description":"."
        },
        "Director":{
          "Name":"",
          "Bio":"",
          "Birth":1970,
        },
        "ImageURL":"",
        "Featured": false
      },
      {
        "Title": "xxx",
        "Description": "",
        "Genre": {
          "Name": "Drama",
          "Description":"."
        },
        "Director":{
          "Name":"",
          "Bio":"",
          "Birth":1970,
        },
        "ImageURL":"",
        "Featured": false
      },

];

//GET movie list
app.get('/movies', (req, res) => {
    res.status(200).json(movies)
});

//Read title
app.get('/movies/:title', (req, res) => {
  const { title } = req.params;
  const movie = movies.find(movie => movie.Title === title );

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('no such movie');
  }
});

//Read Genre
app.get('/movies/genre/:genreName', (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find( movie => movie.Genre.Name === genreName ).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send('no such genre');
  }
});

//Read Directors
app.get('/movies/directors/:directorName', (req, res) => {
  const { directorName } = req.params;
  const director = movies.find( movie => movie.Director.Name === directorName ).Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send('no such director');
  }
});

//Create User
app.post('/users', (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
      newUser.id = uuid.v4();
      users.push(newUser);
      res.status(201).json(newUser)
    } else {
      res.status(400).send('User need names')
    }
})

//Update User name
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find( user => user.id == id );

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send('no such user')
  }
})

//Update/add movie to fav list
app.post('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find( user => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);;
  } else {
    res.status(400).send('no such user')
  }
})

//Delete a movie
app.delete('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find( user => user.id == id );

  if (user){
    user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
    res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);;
  } else {
    res.status(400).send ('no such user')
  }

})

//Delete User
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  let user = users.find( user => user.id == id );

  if (user) {
    res.status(200).send(`user ${id} has been deleted`);;
  } else {
    res.status(400).send('no such user')
  }
})

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', {root: __dirname});
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.listen(8080, () => console.log("listening on 8080"))