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
          "Birth":"1970", //Add BIRTH?
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
        "Title":"A Trip to the Moon",
        "Description":"At a meeting of the Astronomy Club, its president, Professor Barbenfouillis,[b][c] proposes an expedition to the Moon. After addressing some dissent, five other brave astronomers—Nostradamus,[d] Alcofrisbas,[e] Omega, Micromegas,[f] and Parafaragaramus—agree to the plan. A space capsule in the shape of a bullet is built, along with a huge cannon to shoot it into space. ",
        "Genre": {
          "Name": "Adventure",
          "Description":"An adventure film is a form of adventure fiction, and is a genre of film. Subgenres of adventure films include swashbuckler films, pirate films, and survival films. Adventure films may also be combined with other film genres such as action, animation, comedy, drama, fantasy, science fiction, family, horror, or war."
        },
        "Director":{
          "Name":"Georges Méliès",
          "Bio":"Méliès was well known for the use of special effects, popularizing such techniques as substitution splices, multiple exposures, time-lapse photography, dissolves, and hand-painted colour. He was also one of the first filmmakers to use storyboards.[2] His films include A Trip to the Moon (1902) and The Impossible Voyage (1904), both involving strange, surreal journeys somewhat in the style of Jules Verne, and are considered among the most important early science fiction films, though their approach is closer to fantasy.",
          "Birth":"1970",
        },
        "ImageURL":"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTTUhAK-uV_OUXBusvfvF7zmpINSpEMasC1sKVdnXXDqy8NFFd5",
        "Featured": false
      },
      {
        "Title": "The House is Black",
        "Description":"The film is a look at life and suffering in a leper colony and focuses on the human condition and the beauty of creation.[1][2] It is spliced with Farrokhzad's narration of quotes from the Old Testament, the Koran and her own poetry. The film features footage from the Bababaghi Hospice leper colony.[3] It was the only film she directed before her death in 1967. After shooting this film she adopted a child from the colony.[4][5]",
        "Genre": {
          "Name": "Documentary",
          "Description":" documentary is a film or video examining an event or person based on facts. The word can also refer to anything involving documents."
        },
        "Director":{
          "Name":"Forugh Farrokhzad",
          "Bio":"Forugh Farrokhzad (Persian: فروغ فرخزاد;[2] 28 December 1934 – 13 February 1967) was an influential Iranian poet and film director.[3] She was a controversial modernist poet and an iconoclast,[4] writing from a female point of view.[5][6]Forugh Farrokhzad died at the age of 32 due to a car overturn.",
          "Birth":"1934",
        },
        "ImageURL":"https://upload.wikimedia.org/wikipedia/en/5/5f/The_house_is_black.jpg",
        "Featured": false
      },
      {
        "Title":"The Windshield Wiper",
        "Description":"Inside a cafe while smoking a whole pack of cigarettes, a man poses an ambitious question: What is Love?. A collection of vignettes and situations will lead the man to the desired conclusion.",
        "Genre": {
          "Name":"Adult Animation",
          "Description":"Adult animation, also known as mature animation, and infrequently as adult-oriented animation, is any type of animated motion work that is catered specifically to adult interests, and is mainly targeted and marketed towards adults and adolescents, as opposed to children or all-ages audiences."
        },
        "Director":{
          "Name":"Alberto Mielgo",
          "Bio":"is a Spanish director, artist, and animator. His accolades include an Academy Award, four Emmy Awards[1] and two Annie Awards.",
          "Birth":"1979",
        },
        "ImageURL":"https://upload.wikimedia.org/wikipedia/en/4/40/TheWindshieldWiperShort.jpg",
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

//Register User
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